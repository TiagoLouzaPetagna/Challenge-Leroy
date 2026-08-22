import { useId, type CSSProperties, type SVGProps } from "react";

import {
  DEFAULT_MASTER_AVATAR_PALETTE,
  MASTER_AVATAR_VIEWBOX,
  type MasterAvatarPalette,
} from "./avatar-master";

export type MasterAvatarSize = "small" | "medium" | "large";

export type MasterAvatarProps = Omit<
  SVGProps<SVGSVGElement>,
  "color" | "height" | "width"
> & {
  palette?: Partial<MasterAvatarPalette>;
  size?: MasterAvatarSize | number;
  title?: string;
};

const AVATAR_SIZES: Record<MasterAvatarSize, number> = {
  small: 48,
  medium: 112,
  large: 220,
};

type AvatarCssProperties = CSSProperties & {
  "--avatar-skin": string;
  "--avatar-skin-detail": string;
  "--avatar-eyes": string;
  "--avatar-eyebrows": string;
  "--avatar-mouth": string;
  "--avatar-shirt": string;
  "--avatar-shirt-detail": string;
  "--avatar-pants": string;
  "--avatar-shoes": string;
  "--avatar-shoe-sole": string;
};

export function MasterAvatar({
  className,
  palette,
  size = "medium",
  style,
  title,
  ...svgProps
}: MasterAvatarProps) {
  const titleId = useId();
  const width = typeof size === "number" ? size : AVATAR_SIZES[size];
  const colors = { ...DEFAULT_MASTER_AVATAR_PALETTE, ...palette };
  const avatarStyle = {
    "--avatar-skin": colors.skin,
    "--avatar-skin-detail": colors.skinDetail,
    "--avatar-eyes": colors.eyes,
    "--avatar-eyebrows": colors.eyebrows,
    "--avatar-mouth": colors.mouth,
    "--avatar-shirt": colors.shirt,
    "--avatar-shirt-detail": colors.shirtDetail,
    "--avatar-pants": colors.pants,
    "--avatar-shoes": colors.shoes,
    "--avatar-shoe-sole": colors.shoeSole,
    ...style,
  } as AvatarCssProperties;

  return (
    <svg
      {...svgProps}
      className={className}
      data-avatar-master="true"
      viewBox={MASTER_AVATAR_VIEWBOX}
      width={width}
      height={(width * 520) / 320}
      preserveAspectRatio="xMidYMid meet"
      role={title ? "img" : undefined}
      aria-labelledby={title ? titleId : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      style={avatarStyle}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title id={titleId}>{title}</title> : null}

      <g data-avatar-layer="hair-back" />

      <g data-avatar-layer="body" fill="var(--avatar-skin)">
        <rect x="82" y="101" width="30" height="43" rx="15" />
        <rect x="208" y="101" width="30" height="43" rx="15" />
        <ellipse cx="96" cy="122" rx="7" ry="12" fill="var(--avatar-skin-detail)" />
        <ellipse cx="224" cy="122" rx="7" ry="12" fill="var(--avatar-skin-detail)" />
        <rect x="135" y="172" width="50" height="60" rx="20" />
        <rect x="70" y="216" width="38" height="174" rx="19" />
        <rect x="212" y="216" width="38" height="174" rx="19" />
        <circle cx="89" cy="389" r="25" />
        <circle cx="231" cy="389" r="25" />
      </g>

      <g data-avatar-layer="lower-clothing" fill="var(--avatar-pants)">
        <path d="M112 333h96v38h-96z" />
        <path d="M112 360h43v105h-43zM165 360h43v105h-43z" />
        <path d="M154 354h12v111h-12z" fill="#2A3F39" />
      </g>

      <g data-avatar-layer="shoes">
        <rect x="96" y="451" width="60" height="37" rx="18.5" fill="var(--avatar-shoes)" />
        <rect x="164" y="451" width="60" height="37" rx="18.5" fill="var(--avatar-shoes)" />
        <path d="M96 476h60v12H108c-6.6 0-12-5.4-12-12Z" fill="var(--avatar-shoe-sole)" />
        <path d="M164 476h60c0 6.6-5.4 12-12 12h-48v-12Z" fill="var(--avatar-shoe-sole)" />
      </g>

      <g data-avatar-layer="upper-clothing">
        <path
          d="M108 190c14-6 31-10 52-10s38 4 52 10l13 47-20 6v99h-90v-99l-20-6 13-47Z"
          fill="var(--avatar-shirt)"
        />
        <path
          d="M135 184c3 24 47 24 50 0l-11-2c-3 12-25 12-28 0l-11 2Z"
          fill="var(--avatar-shirt-detail)"
        />
        <path d="M115 329h90v13h-90z" fill="var(--avatar-shirt-detail)" opacity="0.55" />
      </g>

      <g data-avatar-layer="head">
        <path
          d="M160 32c-43 0-68 31-68 76 0 46 25 76 68 79 43-3 68-33 68-79 0-45-25-76-68-76Z"
          fill="var(--avatar-skin)"
        />
      </g>

      <g data-avatar-layer="eyes" fill="var(--avatar-eyes)">
        <circle cx="136" cy="111" r="8" />
        <circle cx="184" cy="111" r="8" />
      </g>

      <g
        data-avatar-layer="eyebrows"
        fill="none"
        stroke="var(--avatar-eyebrows)"
        strokeWidth="5"
        strokeLinecap="round"
      >
        <path d="M124 93c7-5 15-5 24 0" />
        <path d="M172 93c9-5 17-5 24 0" />
      </g>

      <g data-avatar-layer="mouth">
        <path
          d="M136 137h48c-2 21-12 34-24 34s-22-13-24-34Z"
          fill="var(--avatar-mouth)"
        />
      </g>

      <g data-avatar-layer="hair-front" />
      <g data-avatar-layer="glasses" />
      <g data-avatar-layer="head-accessory" />
      <g data-avatar-layer="special-accessory" />
    </svg>
  );
}
