/**
 * Android-optimized layout component for better mobile UX
 * Adjusts spacing and stacking based on device type and orientation
 */
import React from "react";
import { cn } from "@/lib/utils";
import { isAndroid, shouldUseVerticalLayout } from "@/lib/android-utils";

interface AndroidLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Main layout container - uses larger spacing on Android
 */
export function AndroidContainer({ children, className }: AndroidLayoutProps) {
  const spacing = isAndroid() ? "p-4" : "p-6";
  return (
    <div className={cn("w-full", spacing, className)}>
      {children}
    </div>
  );
}

/**
 * Responsive section that stacks vertically on Android/mobile
 */
export function AndroidSection({ children, className }: AndroidLayoutProps) {
  const spacing = isAndroid() ? "space-y-4" : "space-y-2";
  return (
    <div className={cn(spacing, className)}>
      {children}
    </div>
  );
}

/**
 * Flex layout that's responsive for Android
 */
interface AndroidFlexProps extends AndroidLayoutProps {
  direction?: "row" | "col";
  gap?: "small" | "medium" | "large";
}

export function AndroidFlex({
  children,
  className,
  direction = "row",
  gap = "medium",
}: AndroidFlexProps) {
  const flexDir = shouldUseVerticalLayout()
    ? "flex-col"
    : direction === "row"
      ? "flex-row"
      : "flex-col";

  const gapSize = {
    small: isAndroid() ? "gap-2" : "gap-1",
    medium: isAndroid() ? "gap-4" : "gap-2",
    large: isAndroid() ? "gap-6" : "gap-4",
  }[gap];

  return (
    <div className={cn("flex", flexDir, gapSize, className)}>
      {children}
    </div>
  );
}

/**
 * Android-optimized button group (responsive flex layout for buttons)
 */
export function AndroidButtonGroup({
  children,
  className,
}: AndroidLayoutProps) {
  const layout = shouldUseVerticalLayout() ? "flex-col" : "flex-row";
  const gap = isAndroid() ? "gap-3" : "gap-2";

  return (
    <div className={cn("flex", layout, gap, "w-full", className)}>
      {children}
    </div>
  );
}

/**
 * Touchable card/panel with proper padding for Android
 */
export function AndroidCard({ children, className }: AndroidLayoutProps) {
  const padding = isAndroid() ? "p-4" : "p-3";
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card",
        padding,
        className,
      )}
    >
      {children}
    </div>
  );
}
