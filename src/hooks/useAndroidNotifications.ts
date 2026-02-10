import { invoke } from "@tauri-apps/api/core";

export function useAndroidNotifications() {
  const showNotification = async (title: string, body: string) => {
    try {
      await invoke("show_notification", { title, body });
    } catch (err) {
      console.error("Failed to show notification", err);
    }
  };

  const showDownloadProgress = async (
    title: string,
    message: string,
    progress: number,
  ) => {
    try {
      // Clamp progress between 0 and 100
      const clampedProgress = Math.max(0, Math.min(100, Math.round(progress)));
      await invoke("show_download_progress", {
        title,
        message,
        progress: clampedProgress,
      });
    } catch (err) {
      console.error("Failed to show progress notification", err);
    }
  };

  const showDownloadComplete = async (
    title: string,
    fileCount: number,
    sizeTransferred: string,
    durationSecs: number,
  ) => {
    try {
      await invoke("show_download_complete", {
        title,
        fileCount,
        sizeTransferred,
        durationSecs,
      });
    } catch (err) {
      console.error("Failed to show completion notification", err);
    }
  };

  const showDownloadError = async (title: string, errorMessage: string) => {
    try {
      await invoke("show_download_error", { title, errorMessage });
    } catch (err) {
      console.error("Failed to show error notification", err);
    }
  };

  return {
    showNotification,
    showDownloadProgress,
    showDownloadComplete,
    showDownloadError,
  };
}
