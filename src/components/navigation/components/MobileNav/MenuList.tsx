import { MenuList as MenuListType, MenuItem, iconMap } from "../../types/menu.types"
import { LucideIcon } from "lucide-react"

interface MenuListProps {
  lists: MenuListType[]
  onItemClick?: (item: MenuItem) => void
}

export default function MenuList({ lists, onItemClick }: MenuListProps) {
  const renderIcon = (iconName?: string) => {
    if (!iconName) return null
    const Icon = iconMap[iconName as keyof typeof iconMap] as LucideIcon
    return Icon ? <Icon className="h-4 w-4 text-gray-500" /> : null
  }

  return (
    <div className="space-y-4 p-4">
      {lists.map((list, i) => (
        <div key={i} className="space-y-2">
          {list.label && (
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              {list.label}
            </h3>
          )}
          <div className="space-y-2">
            {list.list.map((item, j) => (
              <button
                key={j}
                onClick={() => onItemClick?.(item)}
                className="w-full text-left p-3 rounded-lg bg-gray-300 hover:bg-gray-200 active:bg-gray-100 transition-colors flex items-center gap-3"
              >
                {item.icon && (
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {renderIcon(item.icon)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 truncate">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.callout && (
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {item.callout}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
