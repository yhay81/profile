import { IconBook } from "./book";
import { IconGitHub } from "./github";
import { IconLinkedin } from "./linkedin";
import { IconMail } from "./mail";
import { IconTwitter } from "./twitter";

const Icon: React.FC<Readonly<{ readonly name: string }>> = ({ name }) => {
  switch (name) {
    case "GitHub":
      return <IconGitHub />;
    case "Linkedin":
      return <IconLinkedin />;
    case "Twitter":
      return <IconTwitter />;
    case "Mail":
      return <IconMail />;
    case "Book":
    default:
      return <IconBook />;
  }
};

export { Icon };
