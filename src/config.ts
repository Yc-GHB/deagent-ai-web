// Project metadata
export const metadata = {
  title: "DeAgent AI",
  description: "DeAgent AI - Web3 Trading Platform",
  logo: "/icons/logo.svg",
  favicon: "/favicon.ico",
};

// Navigation item type
export interface NavItem {
  name: string;
  href?: string;
  target?: string;
  dropdown?: NavItem[];
}

// Navigation configuration
export const navigation: NavItem[] = [
  { name: "HOME", href: "/" },
  { name: "AI AGENT", href: "/products" },
  // { name: 'AIRDROP', href: 'https://airdrop.deagent.ai/', target: '_blank' },
  { name: "BUYBACK", href: "/buyback" },
  // { name: 'EVENT', href: '/event' },
  {
    name: "DOCS",
    dropdown: [
      {
        name: "Whitepaper",
        href: "https://deagentai.gitbook.io/deagentai",
        target: "_blank",
      },
      { name: 'Micar_Whitepaper', href: 'https://deagent.ai/micar-whitepaper.pdf', target: '_blank' },
    ],
  },
  { name: "BLOG", href: "https://medium.com/@deagent.ai", target: "_blank" },
];
