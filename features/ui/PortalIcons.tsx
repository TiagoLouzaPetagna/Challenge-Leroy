import type { SVGProps } from "react";

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

type PortalIconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  name: PortalIconName;
  size?: number;
};

export function PortalIcon({
  name,
  size = 20,
  ...props
}: PortalIconProps) {
  const paths = (() => {
    switch (name) {
      case "arrow-left":
        return (
          <>
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </>
        );
      case "arcade":
        return (
          <>
            <path d="M8.5 8h7a5.5 5.5 0 0 1 5.2 7.3l-1 2.8a2 2 0 0 1-3.2.8l-2.1-1.8H9.6l-2.1 1.8a2 2 0 0 1-3.2-.8l-1-2.8A5.5 5.5 0 0 1 8.5 8Z" />
            <path d="M7.5 12v4M5.5 14h4" />
            <path d="M16.5 12.5h.01M18.5 15h.01" />
          </>
        );
      case "box":
        return (
          <>
            <path d="m3 8 9 5 9-5" />
            <path d="m12 13 9-5-9-5-9 5 9 5Z" />
            <path d="M3 8v9l9 5 9-5V8M12 13v9" />
          </>
        );
      case "check":
        return <path d="m4 12 5 5L20 6" />;
      case "chevron-down":
        return <path d="m6 9 6 6 6-6" />;
      case "chevron-up":
        return <path d="m6 15 6-6 6 6" />;
      case "edit":
        return (
          <>
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
          </>
        );
      case "eye":
        return (
          <>
            <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
            <circle cx="12" cy="12" r="3" />
          </>
        );
      case "focus":
        return (
          <>
            <path d="M8 3H4a1 1 0 0 0-1 1v4M16 3h4a1 1 0 0 1 1 1v4M21 16v4a1 1 0 0 1-1 1h-4M8 21H4a1 1 0 0 1-1-1v-4" />
            <circle cx="12" cy="12" r="3" />
          </>
        );
      case "home":
        return (
          <>
            <path d="m3 11 9-8 9 8" />
            <path d="M5 10v10h14V10M9 20v-6h6v6" />
          </>
        );
      case "laboratory":
        return (
          <>
            <path d="M9 3h6M10 3v6l-5.3 8.4A2.3 2.3 0 0 0 6.7 21h10.6a2.3 2.3 0 0 0 2-3.6L14 9V3" />
            <path d="M7.5 15h9" />
            <path d="M10 17.5h.01M14.5 18h.01" />
          </>
        );
      case "missions":
        return (
          <>
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="3" />
            <path d="m15 9 5-5M16 4h4v4" />
          </>
        );
      case "palette":
        return (
          <>
            <path d="M12 3a9 9 0 0 0 0 18h1.4a1.8 1.8 0 0 0 1.1-3.2 1.8 1.8 0 0 1 1.1-3.2H18A3 3 0 0 0 21 12a9 9 0 0 0-9-9Z" />
            <circle cx="7.5" cy="10.5" r=".7" fill="currentColor" stroke="none" />
            <circle cx="10" cy="6.8" r=".7" fill="currentColor" stroke="none" />
            <circle cx="14.5" cy="7.2" r=".7" fill="currentColor" stroke="none" />
          </>
        );
      case "profile":
        return (
          <>
            <circle cx="12" cy="8" r="4" />
            <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
          </>
        );
      case "radar":
        return (
          <>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" />
            <path d="M12 12 18.5 5.5" />
            <circle cx="12" cy="12" r="1" />
          </>
        );
      case "settings":
        return (
          <>
            <path d="M4 6h16M4 12h16M4 18h16" />
            <circle cx="9" cy="6" r="2" />
            <circle cx="15" cy="12" r="2" />
            <circle cx="8" cy="18" r="2" />
          </>
        );
      case "simulations":
        return (
          <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
          </>
        );
      case "sparkles":
        return (
          <>
            <path d="m12 3 1.2 3.3L16.5 8l-3.3 1.7L12 13l-1.2-3.3L7.5 8l3.3-1.7Z" />
            <path d="m18.5 14 .7 1.8 1.8.7-1.8.8-.7 1.7-.7-1.7-1.8-.8 1.8-.7Z" />
            <path d="m5 15 .8 2.1L8 18l-2.2.9L5 21l-.8-2.1L2 18l2.2-.9Z" />
          </>
        );
      case "teams":
        return (
          <>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
          </>
        );
      case "undo":
        return (
          <>
            <path d="m9 14-5-5 5-5" />
            <path d="M4 9h10a6 6 0 0 1 6 6v2" />
          </>
        );
      case "zoom-in":
        return (
          <>
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 4.5 4.5M7.5 10.5h6M10.5 7.5v6" />
          </>
        );
      case "zoom-out":
        return (
          <>
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 4.5 4.5M7.5 10.5h6" />
          </>
        );
    }
  })();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      aria-hidden="true"
      {...props}
    >
      {paths}
    </svg>
  );
}
