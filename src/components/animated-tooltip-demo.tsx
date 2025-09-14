"use client"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip"

const people = [
  {
    id: 1,
    name: "Danisa Rahadian Abimanyu",
    designation: "Team Lead",
    image: "/member/danisa.jpg",
  },
  {
    id: 2,
    name: "Wachid Muslih",
    designation: "UI/UX Designer",
    image: "/member/wachid.jpg",
  },
  {
    id: 3,
    name: "Muhammad Anshori Akbar",
    designation: "Backend Developer",
    image: "/member/anshori.jpg",
  },
  {
    id: 4,
    name: "Satria Wibuana Mahardika",
    designation: "Graphic Designer",
    image: "/member/satria.jpg",
  },
  {
    id: 5,
    name: "Fakhri Abdillah",
    designation: "Fullstack Developer",
    image: "/member/fakri.jpg",
  },
  
]

export default function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center min-h-screen w-full">
      <AnimatedTooltip items={people} />
    </div>
  )
}
