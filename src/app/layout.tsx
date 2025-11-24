import type { Metadata } from "next";
import { inter, interDisplay } from "./fonts";
import "./globals.css";
import "../styles/fonts.css";
import "../styles/optimized-icons.css";
import ConsoleEasterEgg from "@/components/console-easter-egg";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import ErrorBoundary from "@/components/error-boundary";
import "@/lib/error-handler";
import LenisProvider from "@/components/lenis-provider";
import IntegratedNavbar from "@/components/integrated-navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.livingtechcreative.com"),
  title: {
    default: "LivingTech Creative - Web Development & Design Agency",
    template: "%s | LivingTech Creative",
  },
  description:
    "We create stunning, high-performance websites that don't ghost you after launch. Your success is our priority, from concept to launch and beyond.",
  keywords: [
    "web development",
    "web design",
    "digital agency",
    "website creation",
    "LivingTech Creative",
    "custom websites",
    "SEO optimization",
  ],
  authors: [{ name: "LivingTech Creative" }],
  creator: "LivingTech Creative",
  publisher: "LivingTech Creative",
  category: "technology",

  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon/apple-icon.png", sizes: "192x192", type: "image/png" },
      {
        url: "/favicon/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/favicon/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
  },

  // Manifest - gunakan manifest.json yang baru
  manifest: "/favicon/manifest.json",

  // Open Graph untuk sharing (card preview)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.livingtechcreative.com",
    siteName: "LivingTech Creative",
    title: "LivingTech Creative - Web Development & Design Agency",
    description:
      "We create stunning, high-performance websites that don't ghost you after launch. Your success is our priority, from concept to launch and beyond.",
    images: [
      {
        url: "/metaicon.svg",
        width: 1200,
        height: 630,
        alt: "LivingTech Creative - Web Development & Design Agency",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "LivingTech Creative - Web Development & Design Agency",
    description:
      "We create stunning, high-performance websites that don't ghost you after launch. Your success is our priority, from concept to launch and beyond.",
    images: ["/metaicon.svg"],
    creator: "@livingtechcreative",
  },

  // Additional meta tags
  other: {
    "theme-color": "#2B35AB",
    "msapplication-TileColor": "#2B35AB",
    "msapplication-config": "/favicon/browserconfig.xml",
  },

  // Verification tags (add when you have them)
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interDisplay.variable} font-sans`}
      style={{ fontFamily: "Trap, sans-serif" }}
    >
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.livingtechcreative.com" />

        {/* Meta tags tambahan untuk compatibility */}
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <meta name="theme-color" content="#2B35AB" />
        <meta name="msapplication-navbutton-color" content="#2B35AB" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#2B35AB" />

        {/* Additional SEO meta tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta httpEquiv="content-language" content="en-us" />

        {/* Favicon - Custom Living Tech Creative favicon (existing generated files) */}
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Apple Touch Icons */}
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link rel="apple-touch-icon" href="/favicon/apple-icon.png" />

        {/* Windows Phone */}
        <meta
          name="msapplication-TileImage"
          content="/favicon/ms-icon-144x144.png"
        />
        <meta name="msapplication-TileColor" content="#2B35AB" />

        {/* Manifest */}
        <link rel="manifest" href="/favicon/manifest.json" />

        {/* Preconnect untuk external resources */}
        <link
          rel="preconnect"
          href="https://dashboard.livingtechcreative.com"
        />
        <link
          rel="dns-prefetch"
          href="https://dashboard.livingtechcreative.com"
        />
      </head>
      <body className="min-h-screen bg-white md:pb-0 pb-24">
        <ErrorBoundary>
          <LenisProvider>
            <ConsoleEasterEgg />
            <IntegratedNavbar />
            {children}
            <FloatingWhatsApp />
            <Footer />
          </LenisProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}