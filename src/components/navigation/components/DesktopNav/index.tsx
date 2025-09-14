import { MenuSection } from "./MenuSection"
import { menuData } from "../../types/menu.types"
import { MenuItem } from "../../types/menu.types"

interface DesktopNavProps {
  onItemClick?: (item: MenuItem) => void
}

export const DesktopNav = ({ onItemClick }: DesktopNavProps) => {
  return (
    <div className="hidden 2xl:flex items-center justify-center w-full">
      <div className="w-full max-w-5xl mx-auto px-4">
        <MenuSection menu={menuData} onItemClick={onItemClick} />
      </div>  
    </div>
  )
}