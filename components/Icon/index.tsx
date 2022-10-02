import { IconBook } from "./book";
import { IconGitHub } from "./github";
import { IconLinkedin } from "./linkedin";
import { IconMail } from "./mail";
import { IconTwitter } from "./twitter";

const Icon: React.FC<
  Readonly<{ readonly name: string; readonly ariaId?: string }>
> = ({ name, ariaId }) => {
  switch (name) {
    case "GitHub":
      return <IconGitHub ariaId={ariaId} />;
    case "Linkedin":
      return <IconLinkedin ariaId={ariaId} />;
    case "Twitter":
      return <IconTwitter ariaId={ariaId} />;
    case "Mail":
      return <IconMail ariaId={ariaId} />;
    case "Zenn":
    case "Book":
    default:
      return <IconBook ariaId={ariaId} />;
  }
};

export { Icon };
