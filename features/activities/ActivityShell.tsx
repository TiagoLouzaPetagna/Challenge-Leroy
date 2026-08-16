import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ActivityShellProps = ComponentPropsWithoutRef<"div"> & {
  activityId?: string;
  children: ReactNode;
};

export function ActivityShell({
  activityId,
  children,
  className,
  ...props
}: ActivityShellProps) {
  return (
    <div
      {...props}
      className={className}
      data-activity-shell="true"
      data-activity-id={activityId}
    >
      {children}
    </div>
  );
}

