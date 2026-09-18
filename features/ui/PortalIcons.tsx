import {
  ArrowLeft,
  Box,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  FlaskConical,
  Focus,
  Gamepad2,
  House,
  MailSearch,
  Menu,
  Palette,
  Pencil,
  Radar,
  ScanSearch,
  SlidersHorizontal,
  Sparkles,
  Target,
  Undo2,
  UserRound,
  UsersRound,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

export type PortalIconName =
  | "arrow-left"
  | "arcade"
  | "box"
  | "check"
  | "chevron-down"
  | "chevron-up"
  | "edit"
  | "eye"
  | "focus"
  | "home"
  | "laboratory"
  | "menu"
  | "missions"
  | "palette"
  | "profile"
  | "radar"
  | "settings"
  | "simulations"
  | "sparkles"
  | "undo"
  | "zoom-in"
  | "zoom-out"
  | "teams";

const ICONS: Record<PortalIconName, LucideIcon> = {
  "arrow-left": ArrowLeft,
  arcade: Gamepad2,
  box: Box,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-up": ChevronUp,
  edit: Pencil,
  eye: Eye,
  focus: Focus,
  home: House,
  laboratory: FlaskConical,
  menu: Menu,
  missions: Target,
  palette: Palette,
  profile: UserRound,
  radar: Radar,
  settings: SlidersHorizontal,
  simulations: MailSearch,
  sparkles: Sparkles,
  teams: UsersRound,
  undo: Undo2,
  "zoom-in": ZoomIn,
  "zoom-out": ZoomOut,
};

type PortalIconProps = Omit<LucideProps, "ref"> & {
  name: PortalIconName;
  size?: number;
};

export function PortalIcon({
  name,
  size = 20,
  strokeWidth = 1.9,
  ...props
}: PortalIconProps) {
  const Icon = ICONS[name] ?? ScanSearch;
  return (
    <Icon
      aria-hidden="true"
      focusable="false"
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}
