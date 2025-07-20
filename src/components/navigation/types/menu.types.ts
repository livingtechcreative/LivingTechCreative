import { Edit, Users, Github, Figma, Triangle, Zap, Package, HelpCircle, ExternalLink, LucideIcon } from "lucide-react"

export interface MenuItem {
  id?: string
  label: string
  callout?: string
  icon?: keyof typeof iconMap
  IconComponent?: LucideIcon
  badge?: string
  isImage?: boolean
  spanColumns?: boolean
  isRightPanel?: boolean
  url?: string
  target?: string
}

export interface MenuList {
  label?: string
  badge?: string
  list: MenuItem[]
}

export interface MenuChannel {
  label: string
  id: string
  badge?: string
  lists: MenuList[]
}

export const iconMap = {
  "edit-alt": Edit,
  "maas-robot": Users,
  "brand-github": Github,
  "brand-figma": Figma,
  "brand-vue": Triangle,
  "brand-nuxt": Zap,
  "maas-mr": Package,
  "maas-dt": Package,
  "maas-az": Package,
  "maas-ve": Package,
  "maas-of": Package,
  "help-circle": HelpCircle,
  "external-link": ExternalLink,
} as const

export const menuData: MenuChannel[] = [
  {
    label: "About Us",
    id: "about-channel",
    lists: [
      {
        label: "Company",
        list: [
          {
            label: "Who We Are",
            callout: "Get to know our team",
            icon: "maas-robot",
          },
          {
            label: "Our Values",
            callout: "What drives us forward",
            icon: "edit-alt",
          },
          {
            label: "FAQ",
            callout: "Frequently asked questions",
            icon: "help-circle",
          },
        ],
      },
      {
        list: [
          {
            label: "Our Blog",
            callout: "Insights and updates",
            icon: "edit-alt",
            isImage: true,
            isRightPanel: true
          }
        ]
      },
    ],
  },
  {
    label: "Solutions",
    id: "solutions-channel",
    lists: [],
  },
  {
    label: "Product",
    id: "product-channel",
    lists: [
      {
        label: "Development",
        list: [
          {
            label: "Web Development",
            callout: "Make your website",
            icon: "brand-vue",
          },
          {
            label: "Mobile Development",
            callout: "Make your mobile app",
            icon: "brand-nuxt",
          },
        ],
      },
      {
        label: "Data Driven",
        list: [
          {
            label: "Data and BI Analyst",
            callout: "Handle your data",
            icon: "brand-github",
          },
          {
            label: "Data Scientist",
            callout: "Machine learning, SQL etc",
            icon: "brand-figma",
          },
        ],
      },
      {
        label: "Design",
        list: [
          {
            label: "UI UX",
            callout: "User-friendly interfaces",
            icon: "maas-dt",
          },
          {
            label: "Graphic Design",
            callout: "Craft visuals",
            icon: "maas-az",
          },
        ],
      },
      {
        list: [
          {
            label: "Our Education Programs",
            callout: "Explore our learning paths and boost your career",
            icon: "edit-alt",
            isImage: true,
            isRightPanel: true
          }
        ]
      },
    ],
  },
  {
    label: "Resource",
    id: "resource-channel",
    lists: [
      {
        label: "Assets",
        list: [
          {
            label: "GitHub",
            badge: "Soon",
            callout: "What we code",
            icon: "brand-github",
          },
          {
            label: "Figma",
            badge: "Soon",
            callout: "Our design",
            icon: "brand-figma",
          },
        ],
      },
      {
        label: "Our Work",
        list: [
          {
            label: "Portfolio",
            callout: "See our latest projects",
            icon: "maas-mr",
          },
          {
            label: "Case Studies",
            callout: "In-depth project breakdowns",
            icon: "maas-ve",
          },
        ],
      },
    ],
  },
  {
    label: "Contact",
    id: "contact-channel",
    lists: [],
  },
]
