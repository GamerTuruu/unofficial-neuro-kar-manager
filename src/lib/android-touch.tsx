/**
 * Android accessibility and touch feedback enhancements
 */

/**
 * Hook for adding haptic feedback on Android
 */
export function useHapticFeedback() {
  const trigger = (pattern: "light" | "medium" | "strong" = "medium") => {
    // Check if running on Android with vibration support
    if (
      typeof navigator !== "undefined" &&
      navigator.vibrate &&
      /android/i.test(navigator.userAgent)
    ) {
      const patterns: Record<string, number | number[]> = {
        light: 10,
        medium: 50,
        strong: [30, 10, 30],
      };
      navigator.vibrate(patterns[pattern]);
    }
  };

  return { trigger };
}

/**
 * HOC to add haptic feedback to onClick handlers
 */
export function withHapticFeedback<T extends { onClick?: () => void }>(
  Component: React.FC<T>,
) {
  return (props: T) => {
    const { trigger } = useHapticFeedback();

    const handleClick = () => {
      trigger("medium");
      props.onClick?.();
    };

    return <Component {...props} onClick={handleClick} />;
  };
}

/**
 * Helper for creating touch-friendly select elements on Android
 */
export function getAndroidSelectClasses(): string {
  return "appearance-none cursor-pointer text-base";
}
