/**
 * Android-specific UI utilities for touch-friendly interactions
 */

export function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false;
  return /android/i.test(navigator.userAgent);
}

export function isMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /android|webos|iphone|ipad|ipod|opera mini/i.test(
    navigator.userAgent,
  );
}

/**
 * Get responsive touch-friendly button size classes
 * Android buttons should be larger (minimum 48x48dp recommended by Material Design)
 */
export function getTouchButtonClasses(): string {
  if (isAndroid()) {
    // Android: Larger buttons with more padding for touch
    return "h-14 px-6"; // 56px height, good for touch targets
  }
  return "h-10 px-4"; // Default smaller desktop size
}

/**
 * Get responsive spacing for Android
 */
export function getAndroidSpacing(): string {
  if (isAndroid()) {
    return "space-y-4"; // Larger spacing between elements on Android
  }
  return "space-y-2";
}

/**
 * Get responsive input height
 */
export function getTouchInputClasses(): string {
  if (isAndroid()) {
    return "h-14 text-base"; // 56px height, larger text
  }
  return "h-10 text-sm";
}

/**
 * Check if we should use vertical layout on Android
 */
export function shouldUseVerticalLayout(): boolean {
  if (!isAndroid()) return false;

  // Check if in portrait mode
  if (typeof window !== "undefined") {
    return window.innerHeight > window.innerWidth;
  }
  return true;
}
