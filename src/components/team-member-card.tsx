import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface TeamMemberCardProps {
  name: string
  role: string
  image: string
  isLeader?: boolean
  buttonColor?: string
}

export default function TeamMemberCard({
  name,
  role,
  image,
  isLeader = false,
  buttonColor = "bg-teal-500 hover:bg-teal-600"
}: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="aspect-square bg-gray-200 relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
        />
        {isLeader && (
          <div className="absolute top-4 left-4 text-xs text-gray-500">
            Team Leader
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-600 mt-1">{role}</p>
          </div>
          <button 
            className={`w-8 h-8 ${buttonColor} rounded-md flex items-center justify-center transition-colors duration-200`}
            aria-label={`View ${name}'s profile`}
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
