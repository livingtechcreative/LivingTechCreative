import { useState } from "react"
import { Menu, ChevronLeft, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MenuChannel, MenuList as MenuListType, MenuItem, iconMap } from "../../types/menu.types"

// Main menu view component
interface MainMenuProps {
  menu: MenuChannel[]
  onSelect: (id: string) => void
}

const MainMenu = ({ menu, onSelect }: MainMenuProps) => (
  <div className="space-y-1 px-4 py-2">
    {menu.map((channel) => (
      <Button
        key={channel.id}
        variant="ghost"
        className="w-full justify-between text-base h-14 px-4 hover:bg-gray-50"
        onClick={() => onSelect(channel.id)}
      >
        <span className="font-medium">{channel.label}</span>
        {channel.badge && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {channel.badge}
          </span>
        )}
      </Button>
    ))}
  </div>
)

// Submenu view component
interface SubMenuViewProps {
  lists: MenuListType[]
  onBack: () => void
}

const SubMenuView = ({ lists, onBack }: SubMenuViewProps) => {
  const renderIcon = (iconName?: string) => {
    if (!iconName) return null
    const Icon = iconMap[iconName as keyof typeof iconMap]
    return Icon ? <Icon className="h-6 w-6 text-muted-foreground flex-shrink-0" /> : null
  }

  return (
    <ScrollArea className="h-full w-full">
      <div className="p-4 pb-20">
        {lists.map((list, listIndex) => (
          <div key={`list-${listIndex}`} className="mb-6">
            {list.label && (
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                {list.label}
              </h3>
            )}
            <div className="grid grid-cols-2 gap-3">
              {list.list.map((item: MenuItem, itemIndex) => (
                <Card 
                  key={`${listIndex}-${itemIndex}-${item.label?.replace(/\s+/g, '-').toLowerCase()}`} 
                  className="p-4 flex flex-col items-start gap-2"
                >
                  <div className="flex items-center justify-between w-full">
                    {renderIcon(item.icon)}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                        aria-label={`Open ${item.label} in new tab`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <h4 className="font-medium text-sm">{item.label}</h4>
                  {item.callout && (
                    <p className="text-xs text-muted-foreground">{item.callout}</p>
                  )}
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="mt-1 px-2 py-0.5 text-xs font-normal rounded-full bg-gray-100 text-gray-800"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

interface MenuSheetProps {
  menu: MenuChannel[]
}

type MenuView = 'main' | 'submenu'

interface MenuHistoryItem {
  view: MenuView
  menu: MenuListType[]
  currentChannel: MenuChannel | null
}

interface MenuSheetState {
  isOpen: boolean
  currentView: MenuView
  currentMenu: MenuListType[]
  menuHistory: MenuHistoryItem[]
  currentChannel: MenuChannel | null
}

const MenuSheet = ({ menu }: MenuSheetProps) => {
  const [state, setState] = useState<MenuSheetState>({
    isOpen: false,
    currentView: 'main',
    currentMenu: [],
    menuHistory: [],
    currentChannel: null
  })

  const handleMenuSelect = (menuId: string) => {
    const channel = menu.find(c => c.id === menuId)
    if (channel && channel.lists.length > 0) {
      setState({
        ...state,
        menuHistory: [
          ...state.menuHistory, 
          { 
            view: state.currentView, 
            menu: state.currentMenu, 
            currentChannel: state.currentChannel 
          }
        ],
        currentMenu: channel.lists,
        currentChannel: channel,
        currentView: 'submenu'
      })
    }
  }

  const handleBack = () => {
    if (state.menuHistory.length > 0) {
      const prev = state.menuHistory[state.menuHistory.length - 1]
      setState({
        ...state,
        currentView: prev.view,
        currentMenu: prev.menu,
        menuHistory: state.menuHistory.slice(0, -1),
        currentChannel: prev.currentChannel
      })
    } else {
      setState(prev => ({ ...prev, currentView: 'main', currentChannel: null }))
    }
  }

  const handleOpenChange = (open: boolean) => {
    setState(prev => ({ ...prev, isOpen: open }))
    if (!open) {
      // Reset navigation when closing the menu
      setTimeout(() => {
        setState({
          isOpen: false,
          currentView: 'main',
          currentMenu: [],
          menuHistory: [],
          currentChannel: null
        })
      }, 300)
    }
  }

  return (
    <Sheet open={state.isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="h-[90vh] rounded-t-3xl p-0 overflow-hidden"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>
            {state.currentView === 'main' ? 'Main Menu' : state.currentChannel?.label || 'Menu'}
          </SheetTitle>
        </SheetHeader>
        <AnimatePresence mode="wait">
          {state.currentView === 'main' ? (
            <motion.div
              key="main"
              className="h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  y: { type: 'spring', stiffness: 300, damping: 25 },
                  opacity: { duration: 0.15 }
                }
              }}
              exit={{ 
                opacity: 0, 
                y: -10,
                transition: { 
                  duration: 0.15,
                }
              }}
            >
              <MainMenu 
                menu={menu} 
                onSelect={handleMenuSelect} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="submenu"
              className="h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  y: { type: 'spring', stiffness: 300, damping: 25 },
                  opacity: { duration: 0.15 }
                }
              }}
              exit={{ 
                opacity: 0, 
                y: -10,
                transition: { 
                  duration: 0.15,
                }
              }}
            >
              <SheetHeader className="p-4 border-b border-gray-200 relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  onClick={handleBack}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <SheetTitle className="text-center">
                  {state.currentChannel?.label}
                </SheetTitle>
              </SheetHeader>
              <SubMenuView 
                lists={state.currentMenu} 
                onBack={handleBack} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  )
}

export default MenuSheet
