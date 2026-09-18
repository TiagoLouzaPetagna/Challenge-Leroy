import type { CSSProperties, HTMLAttributes } from "react";

import {
  DEFAULT_MASTER_AVATAR_LAYERS,
  MASTER_AVATAR_GRID,
  MASTER_AVATAR_LAYER_ORDER,
  type MasterAvatarLayer,
} from "./avatar-master";

export type MasterAvatarSize = "small" | "medium" | "large";

export type MasterAvatarProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children" | "title"
> & {
  layers?: Partial<Record<MasterAvatarLayer, string | null>>;
  size?: MasterAvatarSize | number;
  title?: string;
};

const AVATAR_SIZES: Record<MasterAvatarSize, number> = {
  small: 48,
  medium: 112,
  large: 220,
};

export function MasterAvatar({
  className,
  layers,
  size = "medium",
  style,
  title,
  ...spanProps
}: MasterAvatarProps) {
  const width = typeof size === "number" ? size : AVATAR_SIZES[size];
  const sources = { ...DEFAULT_MASTER_AVATAR_LAYERS, ...layers };
  const avatarStyle = {
    width,
    height: (width * MASTER_AVATAR_GRID.height) / MASTER_AVATAR_GRID.width,
    ...style,
  } as CSSProperties;

  return (
    <span
      {...spanProps}
      className={["master-avatar", className].filter(Boolean).join(" ")}
      data-avatar-master="true"
      data-pixel-grid={`${MASTER_AVATAR_GRID.width}x${MASTER_AVATAR_GRID.height}`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={avatarStyle}
    >
      {MASTER_AVATAR_LAYER_ORDER.map((layer) => {
        const source = sources[layer];
        return (
          <span
            className="master-avatar-layer"
            data-avatar-layer={layer}
            key={layer}
          >
            {source ? (
              // O PNG bruto preserva a grade; otimização de imagem suavizaria os pixels.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt=""
                aria-hidden="true"
                draggable={false}
                src={source}
              />
            ) : null}
          </span>
        );
      })}
    </span>
  );
}
