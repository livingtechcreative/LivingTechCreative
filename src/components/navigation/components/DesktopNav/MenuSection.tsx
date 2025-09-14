import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react"
import { MenuChannel, MenuList as MenuListType, MenuItem } from "../../types/menu.types"
import { MenuCard } from "../shared/MenuCard"
import { useMenuHover } from "../../hooks/useMenuHover"
import Image from "next/image"

interface MenuSectionProps {
  menu: MenuChannel[]
  onItemClick?: (item: MenuItem) => void
}

export const MenuSection = ({ menu, onItemClick }: MenuSectionProps) => {
  const {     
    activeChannel,     
    isOpen,     
    handleMouseEnter,     
    handleMouseLeave,     
    handleContentMouseEnter   
  } = useMenuHover()

  return (
    <div className="relative">
      {/* Glassmorphism Container */}
      <div 
        className="px-6 py-2.5 mx-auto w-fit font-sans"
        style={{
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
          borderRadius: '1rem',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/images/livtechlogo.svg"
              alt="LivingTech Creative Logo"
              width={140}
              height={40}
              className="h-9 w-auto"
            />
          </div>

          {/* Spacer between Logo and Menu */}
          <div className="w-8"></div>

          {/* Menu Items */}
          <div className="flex items-center">
            <div className="flex items-center gap-0.5">
              {menu.map((item) => (
                <Button
                  key={item.id}
                  variant={activeChannel === item.id ? "secondary" : "ghost"}
                  className="relative rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:bg-gray-100/80"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-auto border-blue-200 text-blue-700">
                        {item.badge}
                      </Badge>
                    )}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Flex grow spacer to push language and CTA to the right */}
          <div className="flex-grow"></div>

          {/* Spacer between Menu and Language Dropdown */}
          <div className="w-4"></div>

          {/* Language Dropdown */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:bg-gray-100/80 px-3 py-1.5 rounded-lg"
                >
                  EN
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                  English
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                  日本語
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                  Bahasa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Spacer between Language Dropdown and CTA */}
          <div className="w-4"></div>

          {/* CTA Button */}
          <div className="flex items-center group">
            <div className="bg-gray-800 text-white backdrop-blur-sm border border-gray-200/50 flex items-center rounded-lg px-3 py-0.5 transition-all duration-200 hover:bg-gray-500 cursor-pointer">
              <Button 
                variant="ghost" 
                className="rounded-md px-4 py-1 text-sm font-normal transition-colors duration-200 hover:bg-transparent hover:text-white cursor-pointer whitespace-nowrap"
              >
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && activeChannel && (() => {
          const activeMenu = menu.find(item => item.id === activeChannel);
          return activeMenu?.lists && activeMenu.lists.length > 0 ? (
            <motion.div
              key={activeChannel}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50"
              style={{
                width: activeChannel === 'product-channel' ? '900px' :
                        activeChannel === 'about-channel' ? '800px' : '700px',
                minWidth: "400px",
                maxWidth: "90vw"
              }}
              onMouseEnter={handleContentMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Glassmorphism Dropdown */}
              <div className="bg-white/75 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-gray-200/60 ring-1 ring-gray-100/40">
                <div className="bg-gradient-to-b from-gray-50/30 to-white/20">
                  <motion.div
                    key={activeChannel}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="p-6 w-full"
                  >
                    <div className="w-full pt-4 pb-6 px-8">
                      <div className="w-full max-w-5xl mx-auto">
                        {activeChannel === 'about-channel' ? (
                          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 w-full">
                            {activeMenu.lists.map((entry: MenuListType, j: number) => (
                              <div key={j} className={`${entry.list.some(item => item.isRightPanel) ? 'order-2' : 'order-1'}`}>
                                {entry.label && (
                                  <div className="flex items-center gap-2 pb-3 pt-2">
                                    <span className="text-base font-medium text-gray-600">{entry.label}</span>
                                    {entry.badge && (
                                      <Badge variant="secondary" className="text-sm px-2 py-0.5 h-auto bg-gray-50/70 backdrop-blur-sm border border-gray-200/40">
                                        {entry.badge}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                                <div className="space-y-0.5">
                                  {entry.list.map((item: MenuItem, k: number) => (
                                    <MenuCard key={`${j}-${k}`} data={item} onItemClick={onItemClick} />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            {activeMenu.lists.map((list: MenuListType, i: number) => (
                              <div key={i} className="w-full">
                                {list.label && (
                                  <div className="flex items-center gap-2 pb-3 pt-2">
                                    <span className="text-base font-medium text-gray-600">{list.label}</span>
                                    {list.badge && (
                                      <Badge variant="secondary" className="text-sm px-2 py-0.5 h-auto bg-gray-50/70 backdrop-blur-sm border border-gray-200/40">
                                        {list.badge}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                                <div className="space-y-1">
                                  {list.list.map((item: MenuItem, j: number) => (
                                    <MenuCard key={`${i}-${j}`} data={item} onItemClick={onItemClick} />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : null;
        })()}
      </AnimatePresence>
    </div>
  )
}
