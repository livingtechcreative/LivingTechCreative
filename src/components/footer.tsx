"use client"

export default function Footer() {
  const navigationLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    { name: "Instagram", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Youtube", href: "#" },
    { name: "Dribbble", href: "#" },
    { name: "Behance", href: "#" },
  ]

  return (
    <footer 
      className="relative text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/footerbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
                  Ideas are good.
                  <br />
                  Action is better.
                </h2>
              </div>

              <div className="space-y-6">
                <div className="text-2xl lg:text-3xl font-medium">
                  <a
                    href="mailto:livingtechbusiness@gmail.com?subject=Hello%20Living%20Tech%20Creative&body=Hi%20there,%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0A%0APlease%20let%20me%20know%20when%20we%20can%20schedule%20a%20meeting.%0A%0AThank%20you!"
                    className="bg-gradient-to-r bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #F6F7FD 2%, #7D85EC 33%, #C79CFF 66%, #59F3FA 100%)",
                    }}
                  >
                    livingtechbusiness@gmail.com
                  </a>
                </div>

                <p className="text-gray-200 text-sm">Built by the Talented and Creative Crew</p>
              </div>
            </div>

            {/* Right Content - Navigation & Social */}
            <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
              {/* Navigation */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">Navigation</h3>
                <ul className="space-y-4">
                  {navigationLinks.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-gray-200 hover:text-white transition-colors duration-200">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">Social</h3>
                <ul className="space-y-4">
                  {socialLinks.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-gray-200 hover:text-white transition-colors duration-200">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6">
            <p className="text-gray-200 text-sm text-right">© 2025 Living Tech Creative. All rights reserved.</p>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4">
          {/* Ideas Section */}
          <div className="border border-white/20 rounded-lg p-4 sm:p-6 bg-black/20 backdrop-blur-sm">
            <h2 className="text-3xl font-bold leading-tight text-white">
              Ideas are good.
              <br />
              Action is better.
            </h2>
          </div>

          {/* Email Section */}
          <div className="border border-white/20 rounded-lg p-4 sm:p-6 bg-black/20 backdrop-blur-sm">
            <div className="text-xl font-medium">
              <a
                href="mailto:livingtechbusiness@gmail.com?subject=Hello%20Living%20Tech%20Creative&body=Hi%20there,%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0A%0APlease%20let%20me%20know%20when%20we%20can%20schedule%20a%20meeting.%0A%0AThank%20you!"
                className="bg-gradient-to-r bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                style={{
                  backgroundImage: "linear-gradient(90deg, #F6F7FD 2%, #7D85EC 33%, #C79CFF 66%, #59F3FA 100%)",
                }}
              >
                livingtechbusiness@gmail.com
              </a>
            </div>
          </div>

          {/* Navigation & Social Section */}
          <div className="border border-white/20 rounded-lg p-4 sm:p-6 bg-black/20 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-8">
              {/* Navigation */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Navigation</h3>
                <ul className="space-y-3">
                  {navigationLinks.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-gray-200 hover:text-white transition-colors duration-200">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Social</h3>
                <ul className="space-y-3">
                  {socialLinks.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-gray-200 hover:text-white transition-colors duration-200">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-center space-y-2">
            <p className="text-gray-200 text-sm">Built by the Talented and Creative Crew</p>
            <p className="text-gray-200 text-sm">© 2025 Living Tech Creative. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
