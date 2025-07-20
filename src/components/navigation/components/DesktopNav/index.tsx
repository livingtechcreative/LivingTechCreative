import { LogoSection } from "./LogoSection"
import { CtaSection } from "./CtaSection"
import { MenuSection } from "./MenuSection"
import { menuData } from "../../types/menu.types"

export const DesktopNav = () => {
  return (
    <div className="hidden 2xl:flex items-center justify-center w-full relative">
      {/* Logo Section */}
      <div className="absolute left-0 h-14 flex items-center gap-3 px-4 group cursor-pointer">
        <div className="group-hover:rotate-180 transition-transform duration-700">
          <LogoSection />
        </div>
      </div>

      {/* Menu Section - Centered */}
      <div className="relative">
        <div className="h-14 border-gray-200 bg-gray-50 rounded-2xl border-[1px] p-1">
          <MenuSection menu={menuData} />
        </div>
      </div>

      {/* Call to Action - Positioned absolutely on the right */}
      <div className="absolute right-0">
        <CtaSection />
      </div>
    </div>
  )
}
