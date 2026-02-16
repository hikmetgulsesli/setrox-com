export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  icon: string;
}

export const socials: SocialLink[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: '/setrox',
    url: 'https://linkedin.com/in/setrox',
    icon: 'linkedin',
  },
  {
    id: 'x',
    name: 'X',
    handle: '@setrox',
    url: 'https://x.com/setrox',
    icon: 'twitter',
  },
  {
    id: 'github',
    name: 'GitHub',
    handle: '@hikmetgulsesli',
    url: 'https://github.com/hikmetgulsesli',
    icon: 'github',
  },
];

// Dynamic counts - never hardcoded
export const socialCount = socials.length;
