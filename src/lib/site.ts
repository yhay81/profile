export const PROFILE_NAME = "Yusuke Hayashi";
export const PROFILE_EMAIL = "yusuke8h@gmail.com";
export const PROFILE_URL = "https://yusuke-hayashi.com";
export const PROFILE_REPOSITORY = "https://github.com/yhay81/profile";
export const COPYRIGHT_START_YEAR = 2022;
export const MAIN_COLOR = "#04ffaa";

export const PGP_FINGERPRINT_SPACED =
  "B22B 98AB B2D5 0330 7AB6 A316 0718 EFA6 506B B669";
export const PGP_FINGERPRINT_HEX = "b22b98abb2d503307ab6a3160718efa6506bb669";
export const ETH_ADDRESS = "0x1C049D25D368bFD50c74df68c919a12aDc48C079";
export const ENS_NAME = "yhay81.eth";
export const IPFS_IDENTITY_CID =
  "bafybeia7ayng6ol5j2e7uzqub4httj6mqbx2jel7zflwhfn7gaslzetwmu";
export const IPFS_IDENTITY_GATEWAY = `https://ipfs.io/ipfs/${IPFS_IDENTITY_CID}/`;
export const KEYOXIDE_URL = `https://keyoxide.org/${PGP_FINGERPRINT_HEX}`;

export type IconName =
  "github" | "x" | "linkedin" | "zenn" | "key" | "shield" | "mail";

export interface SocialLink {
  readonly id: string;
  readonly name: string;
  readonly icon: IconName;
  readonly url: string;
  readonly description: string;
  readonly external: boolean;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    id: "social-github",
    name: "GitHub",
    icon: "github",
    url: "https://github.com/yhay81",
    description: "Source code and activity",
    external: true,
  },
  {
    id: "social-x",
    name: "X",
    icon: "x",
    url: "https://x.com/yhay81",
    description: "Short updates",
    external: true,
  },
  {
    id: "social-linkedin",
    name: "Linkedin",
    icon: "linkedin",
    url: "https://www.linkedin.com/in/yhay81",
    description: "Professional profile",
    external: true,
  },
  {
    id: "social-zenn",
    name: "Zenn",
    icon: "zenn",
    url: "https://zenn.dev/yhay81",
    description: "Articles and notes",
    external: true,
  },
  {
    id: "social-pgp",
    name: "PGP",
    icon: "key",
    url: "/keys",
    description: "Key policy and fingerprint",
    external: false,
  },
  {
    id: "social-keyoxide",
    name: "Keyoxide",
    icon: "shield",
    url: KEYOXIDE_URL,
    description: "Verified identity proofs",
    external: true,
  },
];

export interface NavLink {
  readonly href: string;
  readonly label: string;
}

// Keys, Proofs, SIWE, and release verification are reachable from /identity.
export const NAV_LINKS: readonly NavLink[] = [
  { href: "/#about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/identity", label: "Identity" },
  { href: "/#contact", label: "Contact" },
];
