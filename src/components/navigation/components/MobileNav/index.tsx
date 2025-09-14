import MenuSheet from "./MenuSheet"
import { menuData } from "../../types/menu.types"
import { MenuItem } from "../../types/menu.types"

interface MobileNavProps {
  onItemClick?: (item: MenuItem) => void
}

export const MobileNav = ({ onItemClick }: MobileNavProps) => {
  return <MenuSheet menu={menuData} onItemClick={onItemClick} />
}
