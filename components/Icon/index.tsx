import type { ProfileIconName } from "@lib";

import { IconBook } from "./book";
import { IconGitHub } from "./github";
import { IconLinkedin } from "./linkedin";
import { IconMail } from "./mail";
import { IconTwitter } from "./twitter";

const ICON_COMPONENTS: Readonly<
  Record<ProfileIconName, React.FC<{ readonly ariaId?: string }>>
> = {
  GitHub: IconGitHub,
  Linkedin: IconLinkedin,
  Twitter: IconTwitter,
  Mail: IconMail,
  Zenn: IconBook,
};

const Icon: React.FC<
  Readonly<{ readonly name: ProfileIconName; readonly ariaId?: string }>
> = ({ name, ariaId }) => {
  const IconComponent = ICON_COMPONENTS[name];

  return <IconComponent ariaId={ariaId} />;
};

export { Icon };
