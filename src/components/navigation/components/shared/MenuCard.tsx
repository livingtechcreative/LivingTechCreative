import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { MenuItem, iconMap } from "../../types/menu.types"

interface MenuCardProps {
  data: MenuItem
}

export const MenuCard = ({ data }: MenuCardProps) => {
  if (data.isImage) {
    if (data.isRightPanel) {
      return (
        <div className="group relative h-full min-h-[240px] w-full overflow-hidden rounded-lg cursor-pointer">
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="relative h-full w-full transition-all duration-500 group-hover:scale-105">
              <Image
                src={data.label === "Our Education Programs" ? "/images/education.jpg" : "/images/blog.jpg"}
                alt={data.label}
                fill
                className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
          
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 transition-all duration-500 bg-black/0 group-hover:bg-black/40 rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent h-1/2 rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-lg" />
              <div className="absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500 rounded-lg" />
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

  const IconComponent = data.icon ? iconMap[data.icon as keyof typeof iconMap] : null

  return (
    <div className="group py-2 px-3 -mx-1 rounded-lg hover:bg-gray-100/80 transition-colors cursor-pointer">
      <div className="relative overflow-hidden">
        <div className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-200">
          {IconComponent && (
            <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center flex-shrink-0 transition-colors">
              <IconComponent className="h-3.5 w-3.5 text-gray-500 group-hover:scale-110 transition-transform" />
            </div>
          )}
          <div className="space-y-0.5 group-hover:translate-x-1 transition-transform duration-200">
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
    </div>
  )
}
