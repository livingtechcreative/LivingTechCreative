"use client"

import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronLeft, Share2 } from "lucide-react" // Added Share2 icon
import { type MenuChannel, MenuCard } from "@/components/magic-menu" // Reusing interfaces and MenuCard

export default function MobileNavbar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null)
  const [touchStartY, setTouchStartY] = useState(0)

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
              icon: "help-circle",
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
          ],
        },
      ],
    },
    {
      label: "Contact",
      id: "contact-channel",
      lists: [],
    },
  ]

  const currentChannel = menu.find((item) => item.id === activeChannelId)

  return (
    <div className="w-auto">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0 flex flex-col">
          <SheetHeader
            className="p-4 border-b border-gray-200 relative"
            onTouchStart={(e) => setTouchStartY(e.touches[0].clientY)}
            onTouchEnd={(e) => {
              const touchEndY = e.changedTouches[0].clientY
              if (touchEndY - touchStartY > 50) {
                // Deteksi swipe ke bawah jika pergerakan lebih dari 50px
                setIsSheetOpen(false)
                setActiveChannelId(null) // Reset channel saat menutup
              }
            }}
          >
            {/* Swipe down handle */}
            <div
              className="h-2 w-12 bg-gray-300 rounded-full mx-auto mb-2 cursor-pointer"
              aria-label="Close menu"
              role="button"
              tabIndex={0}
            />

            {activeChannelId ? (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2"
                onClick={() => setActiveChannelId(null)}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Back</span>
              </Button>
            ) : null}
            <SheetTitle className="text-center text-lg font-semibold">
              {activeChannelId ? currentChannel?.label : "Menu"}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6">
            {!activeChannelId ? (
              // Main Menu View
              <nav className="grid gap-2">
                {/* Home Button */}
                <Button
                  variant="ghost"
                  className="justify-start text-lg h-auto py-3 px-4"
                  onClick={() => setIsSheetOpen(false)} // Close sheet on Home click
                >
                  Home
                </Button>
                {menu.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="justify-start text-lg h-auto py-3 px-4"
                    onClick={() => setActiveChannelId(item.id)}
                  >
                    {item.label}
                    {item.badge && (
                      <Badge
                        variant="outline"
                        className="ml-2 text-sm px-2 py-0.5 h-auto border-blue-200 text-blue-700"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
                {/* Book a Call Button */}
                <Button variant="ghost" className="justify-start text-lg h-auto py-3 px-4 mt-4">
                  Book a Call
                </Button>
              </nav>
            ) : (
              // Sub-menu View
              <div className="grid gap-6">
                {currentChannel?.lists.map((entry, j) => (
                  <div key={j}>
                    {entry.label && (
                      <div className="flex items-center gap-2 pb-3 pt-2">
                        <span className="text-sm font-medium text-gray-500">{entry.label}</span>
                        {entry.badge && (
                          <Badge variant="secondary" className="text-xs px-2 py-0.5 h-auto">
                            {entry.badge}
                          </Badge>
                        )}
                      </div>
                    )}
                    <div className="grid gap-1">
                      {entry.list.map((data, k) => (
                        <MenuCard key={k} data={data} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-6 border-t border-gray-200 text-center text-xs text-gray-500 relative">
            <p>Designed and Engineered by</p>
            <p className="font-medium">livingTech creative</p>
            <div className="absolute bottom-4 right-4">
              <Share2 className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
