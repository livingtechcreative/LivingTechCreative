"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Users, Github, Figma, Triangle, Zap, Package, ArrowRight, HelpCircle } from "lucide-react"

// Logo Section Component
export function LogoSection() {
  return (
    <div className="h-14 border-gray-200 bg-gray-50 flex items-center justify-center rounded-2xl px-6 py-3 border-[3px]">
      <Image
        src="/placeholder.svg?height=32&width=150"
        alt="LivingTech Creative Logo"
        width={150}
        height={32}
        className="h-8 w-auto"
      />
    </div>
  )
}

// Book Call Button Component
export function BookCallButton() {
  return (
    <div className="h-14 border-gray-200 bg-gray-50 flex items-center justify-center rounded-2xl p-1 border-[3px]">
      <Button variant="ghost" className="rounded-xl px-6 py-3 text-base font-medium transition-all duration-200">
        Book a Call
      </Button>
    </div>
  )
}

interface MenuItem {
  label: string
  callout: string
  icon?: string
  badge?: string
  isImage?: boolean
  spanColumns?: boolean
  isRightPanel?: boolean
}

interface MenuList {
  label?: string
  badge?: string
  list: MenuItem[]
}

export interface MenuChannel {
  // Export interface for reuse in MobileMenuSheet
  label: string
  id: string
  badge?: string
  lists: MenuList[]
}

const iconMap = {
  "edit-alt": Edit,
  "maas-robot": Users,
  "brand-github": Github,
  "brand-figma": Figma,
  "brand-vue": Triangle,
  "brand-nuxt": Zap,
  "maas-mr": Package,
  "maas-dt": Package,
  "maas-az": Package,
  "maas-ve": Package,
  "maas-of": Package,
  "help-circle": HelpCircle,
}

export const MenuCard = ({ data }: { data: MenuItem }) => {
  if (data.isImage) {
    if (data.isRightPanel) {
      return (
        <div className="group relative h-full min-h-[240px] w-full overflow-hidden rounded-lg cursor-pointer">
          {/* Image with scale effect */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-110">
              <Image
                src={data.label === "Our Education Programs" ? "/images/education.jpg" : "/images/blog.jpg"}
                alt={data.label}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
          
          {/* Overlay with blur effect - FIXED VERSION */}
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <div className="relative h-full w-full">
              {/* Background overlays */}
              <div className="absolute inset-0 transition-all duration-300 bg-black/0 group-hover:bg-black/50 rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent h-1/2 rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-lg" />
              
              {/* Backdrop blur with proper rounded corners */}
              <div className="absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-300 rounded-lg" />
            </div>
          </div>
          <div className="relative h-full flex flex-col justify-end p-5 text-white">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-xs font-medium tracking-wider">See</span>
              <ArrowRight className="h-3 w-3" />
            </div>
            <h3 className="font-semibold text-base leading-tight mb-1">{data.label}</h3>
            <p className="text-xs opacity-90 leading-relaxed line-clamp-2">{data.callout}</p>
          </div>
        </div>
      )
    }
    return (
      <div className={`relative rounded-lg overflow-hidden h-48 w-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center group`}>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
        <div className="relative z-10 text-center p-6 w-full">
          <h3 className="font-bold text-2xl text-white">{data.label}</h3>
          <p className="text-white/90 text-base mt-2">{data.callout}</p>
        </div>
      </div>
    )
  }

  const IconComponent = data.icon ? iconMap[data.icon as keyof typeof iconMap] : Package

  return (
    <div className="group py-2 px-3 -mx-3 rounded-lg hover:bg-gray-100/80 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center flex-shrink-0 transition-colors">
          <IconComponent className="h-3.5 w-3.5 text-gray-500" />
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm text-gray-800 leading-tight">{data.label}</span>
            {data.badge && (
              <Badge variant="outline" className="text-xs px-1.5 py-0 h-5 border-gray-200 text-gray-500">
                {data.badge}
              </Badge>
            )}
          </div>
          {data.callout && (
            <p className="text-xs text-gray-500 leading-relaxed">{data.callout}</p>
          )}
        </div>
      </div>
    </div>
  )
}

const MagicMenu = () => {
  const [activeChannel, setActiveChannel] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  // Removed isClicked state and related logic for hover-only

  const menu: MenuChannel[] = [
    {
      label: "About Us",
      id: "about-channel",
      lists: [
        {
          label: "Company",
          list: [
            {
              label: "Who We Are",
              callout: "Get to know our team",
              icon: "maas-robot",
            },
            {
              label: "Our Values",
              callout: "What drives us forward",
              icon: "edit-alt",
            },
            {
              label: "FAQ",
              callout: "Frequently asked questions",
              icon: "maas-robot",
            },
          ],
        },
        {
          list: [
            {
              label: "Our Blog",
              callout: "Insights and updates",
              icon: "edit-alt",
              isImage: true,
              isRightPanel: true
            }
          ]
        },
      ],
    },
    {
      label: "Solutions",
      id: "solutions-channel",
      // Empty lists array to prevent dropdown
      lists: [],
    },
    {
      label: "Product",
      id: "product-channel",
      lists: [
        {
          label: "Development",
          list: [
            {
              label: "Web Development",
              callout: "Make your website",
              icon: "brand-vue",
            },
            {
              label: "Mobile Development",
              callout: "Make your mobile app",
              icon: "brand-nuxt",
            },
          ],
        },
        {
          label: "Data Driven",
          list: [
            {
              label: "Data and BI Analyst",
              callout: "Handle your data",
              icon: "brand-github",
            },
            {
              label: "Data Scientist",
              callout: "Machine learning, SQL etc",
              icon: "brand-figma",
            },
          ],
        },
        {
          label: "Design",
          list: [
            {
              label: "UI UX",
              callout: "User-friendly interfaces",
              icon: "maas-dt",
            },
            {
              label: "Graphic Design",
              callout: "Craft visuals",
              icon: "maas-az",
            },
          ],
        },
        {
          list: [
            {
              label: "Our Education Programs",
              callout: "Explore our learning paths and boost your career",
              icon: "edit-alt",
              isImage: true,
              isRightPanel: true
            }
          ]
        },
      ],
    },
    {
      label: "Resource",
      id: "resource-channel",
      lists: [
        {
          label: "Assets",
          list: [
            {
              label: "GitHub",
              badge: "Soon",
              callout: "What we code",
              icon: "brand-github",
            },
            {
              label: "Figma",
              badge: "Soon",
              callout: "Our design",
              icon: "brand-figma",
            },
          ],
        },
        {
          label: "Our Work",
          list: [
            {
              label: "Portfolio",
              callout: "See our latest projects",
              icon: "maas-mr",
            },
            {
              label: "Case Studies",
              callout: "In-depth project breakdowns",
              icon: "maas-ve",
            },
          ]
        }
      ],
    }
  ]

  // Removed handleClick function

  // Function to center the dropdown under the menu
  const getDropdownAlignment = (channelId: string) => {
    // Center the dropdown under the menu
    return "left-1/2 -translate-x-1/2";
  }

  const handleMouseEnter = (channelId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveChannel(channelId)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    // Reverted to simple mouse leave logic for hover-only
    timeoutRef.current = setTimeout(() => {
      setActiveChannel(null)
      setIsOpen(false)
    }, 150)
  }

  const handleContentMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  // Removed handleClickOutside function

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

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
              width: activeChannel === 'product-channel' ? '800px' : 'max-content',
              minWidth: "320px",
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
                  <div className="w-full p-4">
                    {activeChannel === 'about-channel' ? (
                      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 w-full">
                        {menu
                          .find((item) => item.id === activeChannel)
                          ?.lists.map((entry, j) => (
                            <div key={j} className={`${entry.list.some(item => item.isRightPanel) ? 'order-2' : 'order-1'}`}>
                              {entry.label && (
                                <div className="flex items-center gap-2 pb-2">
                                  <span className="text-sm font-medium text-gray-500">{entry.label}</span>
                                  {entry.badge && (
                                    <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                                      {entry.badge}
                                    </Badge>
                                  )}
                                </div>
                              )}
                              <div className="space-y-0.5">
                                {entry.list.map((data, k) => (
                                  <MenuCard key={k} data={data} />
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {menu
                          .find((item) => item.id === activeChannel)
                          ?.lists.map((entry, j) => (
                            <div key={j} className="w-full">
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
                              <div className="space-y-1">
                                {entry.list.map((data, k) => (
                                  <MenuCard key={k} data={data} />
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : null})()}
      </AnimatePresence>
      {/* Removed isClicked overlay */}
    </div>
  )
}

export default MagicMenu
