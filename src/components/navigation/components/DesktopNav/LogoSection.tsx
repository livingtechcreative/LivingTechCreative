import Image from "next/image"

export const LogoSection = () => (
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
