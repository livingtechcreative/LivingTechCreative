import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, Menu } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatePresence, motion, useMotionValue, animate, type PanInfo } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MenuChannel, MenuList as MenuListType, MenuItem, iconMap } from "../../types/menu.types"

type MenuView = 'main' | 'submenu'

interface MenuHistoryItem {
  view: MenuView
  menu: MenuListType[]
  currentChannel: MenuChannel | null
}

// Extend the icon map with additional icons needed for this component
const extendedIconMap = {
  ...iconMap,
  menu: Menu,
  arrow: ChevronLeft
}

// Default empty menu
const defaultMenu: MenuChannel[] = [];

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
        className="w-full justify-between text-base h-14 px-4 hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={() => onSelect(channel.id)}
      >
        <span className="font-medium">{channel.label}</span>
        {channel.badge && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
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
  onItemClick?: (item: MenuItem) => void
}

const SubMenuView = ({ lists, onBack, onItemClick }: SubMenuViewProps) => {
  const renderIcon = (iconName?: string, isSpecialItem = false) => {
    if (!iconName) return null
    const Icon = extendedIconMap[iconName as keyof typeof extendedIconMap]
    return Icon ? <Icon className={`h-4 w-4 ${isSpecialItem ? 'text-white' : 'text-muted-foreground'}`} /> : null
  }

  return (
    <div className="p-4">
      {lists.map((list, listIndex) => (
        <div key={`list-${listIndex}`} className="mb-6 last:mb-2">
          {list.label && (
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              {list.label}
            </h3>
          )}
          <div className="grid grid-cols-2 gap-4">
            {list.list.map((item, itemIndex) => {
              const isBlog = item.label === "Our Blog";
              const isEducation = item.label === "Our Education Programs";
              const isSpecialItem = isBlog || isEducation;
              
              return (
                <Card
                  key={`${listIndex}-${itemIndex}-${item.label?.replace(/\s+/g, '-').toLowerCase()}`}
                  className={`${isSpecialItem ? "col-span-2 relative overflow-hidden" : ""} ${isBlog ? "bg-[url('/images/blog.jpg')]" : isEducation ? "bg-[url('/images/education.jpg')]" : "bg-gray-100 dark:bg-gray-800"} bg-cover bg-center text-gray-900 dark:text-gray-100 flex flex-col gap-4 rounded-[1.25rem] p-3 pb-4 cursor-pointer transition-all hover:bg-opacity-90`}
                  onClick={() => onItemClick?.(item)}
                >
                  {isSpecialItem && (
                    <div className="absolute inset-0 bg-black/40 z-0" />
                  )}
                  {item.icon && (
                    <div className={`w-10 h-10 rounded-lg ${isSpecialItem ? 'bg-white/30' : 'bg-white/20'} flex items-center justify-center z-10`}>
                      {renderIcon(item.icon, isSpecialItem)}
                    </div>
                  )}
                  <div className="flex flex-col gap-0.5 px-1 z-10">
                    <span className={`${isSpecialItem ? 'text-white' : 'text-gray-900 dark:text-gray-100'} flex items-center gap-2`}>
                      <span className="font-medium text-sm">{item.label}</span>
                      {item.badge && (
                        <Badge className={`${isSpecialItem ? 'bg-white/30 text-white' : 'bg-white/20 text-white'} border-0 text-[10px] font-normal px-1.5 py-0.5`}>
                          {item.badge}
                        </Badge>
                      )}
                    </span>
                    {item.callout && (
                      <span className={`${isSpecialItem ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'} text-xs opacity-80`}>
                        {item.callout}
                      </span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

interface MenuSheetProps {
  menu?: MenuChannel[]
  onItemClick?: (item: MenuItem) => void
}

const MenuSheet = ({ menu = defaultMenu, onItemClick }: MenuSheetProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentView, setCurrentView] = useState<MenuView>('main')
  const [currentMenu, setCurrentMenu] = useState<MenuListType[]>([])
  const [menuHistory, setMenuHistory] = useState<MenuHistoryItem[]>([])
  const [currentChannel, setCurrentChannel] = useState<MenuChannel | null>(null)
  const [sheetHeight, setSheetHeight] = useState('auto')
  const y = useMotionValue(0)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Calculate optimal sheet height based on content
  const calculateSheetHeight = useCallback(() => {
    if (!isOpen) return 'auto'
    
    const windowHeight = window.innerHeight
    
    // Simulate content height based on current view
    let estimatedContentHeight = 0
    const headerHeight = 80 // Handle + header space
    const itemHeight = 56 // Height per menu item
    const padding = 32 // Top/bottom padding
    
    if (currentView === 'main') {
      estimatedContentHeight = (menu.length * itemHeight) + padding
    } else {
      // Calculate submenu content height
      const totalItems = currentMenu.reduce((acc, list) => {
        const listHeaderHeight = list.label ? 24 : 0
        const itemsHeight = list.list.length * 120 // Card height approximately 120px
        const listPadding = 24
        return acc + listHeaderHeight + itemsHeight + listPadding
      }, 0)
      estimatedContentHeight = totalItems + padding
    }
    
    const totalContentHeight = estimatedContentHeight + headerHeight
    
    // Minimum height: 35% of screen for main menu, 40% for submenu
    const minHeight = currentView === 'main' 
      ? windowHeight * 0.35 
      : windowHeight * 0.4
    // Maximum height: 85% of screen
    const maxHeight = windowHeight * 0.85
    
    // Calculate ideal height but clamp between min and max
    const idealHeight = Math.min(Math.max(totalContentHeight, minHeight), maxHeight)
    
    return idealHeight
  }, [currentView, currentMenu, menu.length, isOpen])

  // Update sheet height when content or view changes with delay for content rendering
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow content to render
      const timeoutId = setTimeout(() => {
        const height = calculateSheetHeight()
        setSheetHeight(typeof height === 'number' ? `${height}px` : 'auto')
      }, 50)
      
      return () => clearTimeout(timeoutId)
    }
  }, [currentView, currentMenu, isOpen, calculateSheetHeight])

  const handleMenuSelect = (menuId: string) => {
    const channel = menu.find(c => c.id === menuId)
    if (channel && channel.lists.length > 0) {
      setMenuHistory(prev => [
        ...prev, 
        { 
          view: currentView, 
          menu: currentMenu, 
          currentChannel: currentChannel 
        }
      ])
      
      setCurrentMenu(channel.lists)
      setCurrentChannel(channel)
      setCurrentView('submenu')
    }
  }

  const handleBack = () => {
    if (menuHistory.length > 0) {
      const prev = menuHistory[menuHistory.length - 1]
      setCurrentView(prev.view)
      setCurrentMenu(prev.menu)
      setCurrentChannel(prev.currentChannel)
      setMenuHistory(prev => prev.slice(0, -1))
    } else {
      setCurrentView('main')
      setCurrentChannel(null)
      setCurrentMenu([])
    }
  }

  const handleOpen = () => {
    const startY = typeof window !== 'undefined' ? window.innerHeight : 1000
    y.set(startY)
    
    // Reset state
    setCurrentView('main')
    setCurrentMenu([])
    setMenuHistory([])
    setCurrentChannel(null)
    
    setIsOpen(true)
    setIsVisible(true)
    
    // Animate in
    const animation = animate(y, 0, {
      type: "spring",
      damping: 30,
      stiffness: 300
    })
    
    document.body.style.overflow = "hidden"
    
    return () => animation.stop()
  }

  const handleClose = useCallback(() => {
    setIsVisible(false)
    
    const animation = animate(y, typeof window !== 'undefined' ? window.innerHeight : 1000, {
      type: "spring",
      damping: 30,
      stiffness: 300,
      onComplete: () => {
        setIsOpen(false)
        setCurrentView('main')
        setCurrentMenu([])
        setMenuHistory([])
        setCurrentChannel(null)
        setSheetHeight('auto')
      }
    })
    
    return () => animation.stop()
  }, [y])

  // Cleanup effect
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  // Handle cleanup when isOpen changes
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "unset"
    }
    
    return () => {
      if (isOpen) {
        handleClose()
      }
    }
  }, [isOpen, handleClose])

  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // If dragged down more than 50px or velocity is high enough, close the sheet
    if (info.offset.y > 50 || info.velocity.y > 500) {
      handleClose()
    } else {
      animate(y, 0, {
        type: "spring",
        damping: 30,
        stiffness: 400,
        velocity: info.velocity.y
      })
    }
  }, [handleClose, y])

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden"
        onClick={handleOpen}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isVisible ? "bg-black/50 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none pointer-events-none"
        }`}
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        {isOpen && (
          <div className="absolute inset-0 flex items-end">
            <motion.div
              ref={constraintsRef}
              className="w-full"
              animate={{
                height: sheetHeight
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.3
              }}
            >
              <motion.div
                className="relative h-full bg-background rounded-t-3xl shadow-2xl flex flex-col touch-none"
                style={{
                  y,
                  touchAction: 'none',
                  willChange: 'transform',
                  cursor: 'grab'
                }}
                drag="y"
                dragConstraints={{ top: 0 }}
                dragElastic={{ top: 0, bottom: 0.5 }}
                onDragEnd={handleDragEnd}
                dragMomentum={true}
                dragTransition={{ power: 0.2, timeConstant: 200 }}
                whileTap={{ cursor: 'grabbing' }}
              >
                {/* Handle */}
                <div className="flex justify-center pt-4 pb-2 flex-shrink-0">
                  <div className="w-12 h-1 bg-muted-foreground/30 rounded-full cursor-grab active:cursor-grabbing" />
                </div>

                {/* Header */}
                <div className="px-4 py-2 border-b border-border/50 flex-shrink-0">
                  {currentView === 'submenu' && (
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleBack}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <h2 className="font-semibold">
                        {currentChannel?.label}
                      </h2>
                      <div className="w-10" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div 
                  ref={contentRef}
                  className="flex-1 overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {currentView === 'main' ? (
                      <motion.div
                        key="main"
                        className="h-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: {
                            y: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          y: -10,
                          transition: { 
                            duration: 0.15
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
                        className="h-full overflow-y-auto"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: {
                            y: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          y: -10,
                          transition: { 
                            duration: 0.15
                          }
                        }}
                      >
                        <SubMenuView 
                          lists={currentMenu} 
                          onBack={handleBack}
                          onItemClick={(item) => {
                            onItemClick?.(item);
                            if (!item.url) {
                              handleClose();
                            }
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  )
}

export default MenuSheet