const PROFILE_NAME = "Yusuke Hayashi";
const PROFILE_EMAIL = "yusuke8h@gmail.com";
const PROFILE_URL = "https://yusuke-hayashi.com";
const PROFILE_REPOSITORY = "https://github.com/yhay81/profile";
const COPYRIGHT_START_YEAR = 2022;

const PROFILE_SOCIAL_LINKS = [
  {
    id: "social-github",
    name: "GitHub",
    icon: "GitHub",
    url: "https://github.com/yhay81",
    description: "Source code and activity",
    external: true,
  },
  {
    id: "social-twitter",
    name: "Twitter",
    icon: "Twitter",
    url: "https://twitter.com/yhay81",
    description: "Short updates",
    external: true,
  },
  {
    id: "social-linkedin",
    name: "Linkedin",
    icon: "Linkedin",
    url: "https://www.linkedin.com/in/yhay81",
    description: "Professional profile",
    external: true,
  },
  {
    id: "social-zenn",
    name: "Zenn",
    icon: "Zenn",
    url: "https://zenn.dev/yhay81",
    description: "Articles and notes",
    external: true,
  },
  {
    id: "social-pgp",
    name: "PGP",
    icon: "Key",
    url: "/pgp-key.asc",
    description: "B22B 98AB B2D5 0330 7AB6 A316 0718 EFA6 506B B669",
    external: false,
  },
  {
    id: "social-keyoxide",
    name: "Keyoxide",
    icon: "Key",
    url: "https://keyoxide.org/b22b98abb2d503307ab6a3160718efa6506bb669",
    description: "Verified identity proofs",
    external: true,
  },
] as const;

type ProfileSocialIconName = (typeof PROFILE_SOCIAL_LINKS)[number]["icon"];
type ProfileIconName = ProfileSocialIconName | "Mail";
interface ProfileSocialLink {
  readonly id: string;
  readonly name: string;
  readonly icon: ProfileSocialIconName;
  readonly url: string;
  readonly description: string;
  readonly external: boolean;
}

const HEAD_KEYS = {
  scriptGtag: "gtag",
  scriptGtagConfig: "gtag-config",
} as const;

const GTM_ID = "G-8XGEJZF2J0";
const MAIN_COLOR = "#04ffaa";

export {
  COPYRIGHT_START_YEAR,
  GTM_ID,
  HEAD_KEYS,
  MAIN_COLOR,
  PROFILE_EMAIL,
  PROFILE_NAME,
  PROFILE_REPOSITORY,
  PROFILE_SOCIAL_LINKS,
  PROFILE_URL,
  type ProfileIconName,
  type ProfileSocialIconName,
  type ProfileSocialLink,
};
