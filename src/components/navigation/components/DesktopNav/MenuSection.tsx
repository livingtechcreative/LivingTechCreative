import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MenuChannel, MenuList as MenuListType, MenuItem } from "../../types/menu.types"
import { MenuCard } from "../shared/MenuCard"
import { useMenuHover } from "../../hooks/useMenuHover"

interface MenuSectionProps {
  menu: MenuChannel[]
}

export const MenuSection = ({ menu }: MenuSectionProps) => {
  const { 
    activeChannel, 
    isOpen, 
    handleMouseEnter, 
    handleMouseLeave, 
    handleContentMouseEnter 
  } = useMenuHover()

  return (
    <div className="relative">
      <div className="flex items-center gap-1 justify-center">
        {menu.map((item) => (
          <Button
            key={item.id}
            variant={activeChannel === item.id ? "secondary" : "ghost"}
            className="relative rounded-xl px-6 py-3 text-base font-medium transition-all duration-200"
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="flex items-center gap-2.5">
              <span>{item.label}</span>
              {item.badge && (
                <Badge variant="outline" className="text-sm px-2.5 py-0.5 h-auto border-blue-200 text-blue-700">
                  {item.badge}
                </Badge>
              )}
            </span>
          </Button>
        ))}
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
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100">
                <div className="bg-white">
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
                                    <span className="text-base font-medium text-gray-500">{entry.label}</span>
                                    {entry.badge && (
                                      <Badge variant="secondary" className="text-sm px-2 py-0.5 h-auto">
                                        {entry.badge}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                                <div className="space-y-0.5">
                                  {entry.list.map((item: MenuItem, k: number) => (
                                    <MenuCard key={`${j}-${k}`} data={item} />
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
                                    <span className="text-base font-medium text-gray-500">{list.label}</span>
                                    {list.badge && (
                                      <Badge variant="secondary" className="text-sm px-2 py-0.5 h-auto">
                                        {list.badge}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                                <div className="space-y-1">
                                  {list.list.map((item: MenuItem, j: number) => (
                                    <MenuCard key={`${i}-${j}`} data={item} />
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
