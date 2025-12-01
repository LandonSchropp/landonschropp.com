import ChessComIcon from "../../images/data/chess-com.svg?react";
import EmailIcon from "../../images/data/email.svg?react";
import GitHubIcon from "../../images/data/github.svg?react";
import LinkedInIcon from "../../images/data/linkedin.svg?react";
import BashIcon from "../../images/icons/bash.svg?react";
import NeovimIcon from "../../images/icons/neovim.svg?react";
import RubyIcon from "../../images/icons/ruby.svg?react";
import { SiGit, SiTypescript } from "@icons-pack/react-simple-icons";
import { Layers, Briefcase, Brain, ExternalLink, Activity, Code } from "lucide-react";

const SVG_ICONS = {
  bash: BashIcon,
  chessCom: ChessComIcon,
  email: EmailIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  neovim: NeovimIcon,
  ruby: RubyIcon,
} as const;

const LUCIDE_ICONS = {
  activity: Activity,
  brain: Brain,
  briefcase: Briefcase,
  code: Code,
  externalLink: ExternalLink,
  layers: Layers,
};

const SIMPLE_ICONS = {
  git: SiGit,
  typescript: SiTypescript,
};

const ICONS = { ...SVG_ICONS, ...LUCIDE_ICONS, ...SIMPLE_ICONS } as const;

type BaseIconProps = {
  name: keyof typeof ICONS;
  className?: string;
};

type HiddenIconProps = BaseIconProps & {
  hidden: true;
  alt?: never;
};

type AltIconProps = BaseIconProps & {
  hidden?: false;
  alt: string;
};

type IconProps = HiddenIconProps | AltIconProps;

export function Icon({ name, hidden, alt, className }: IconProps) {
  const IconComponent = ICONS[name];
  const props = hidden ? { "aria-hidden": true } : {};

  className = `inline-block align-middle ${className}`;

  if (name in LUCIDE_ICONS) {
    return (
      <IconComponent className={className} {...props}>
        {alt && <title>{alt}</title>}
      </IconComponent>
    );
  }

  if (name in SIMPLE_ICONS) {
    return <IconComponent className={className} title={alt} {...props} />;
  }

  return <IconComponent className={`fill-[currentColor] ${className}`} title={alt} {...props} />;
}
