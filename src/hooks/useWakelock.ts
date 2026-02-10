import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";

export function useWakelock() {
  const requestWakelock = async () => {
    try {
      await invoke("request_wakelock");
    } catch (err) {
      console.warn("Failed to request wakelock (may not be on Android)", err);
    }
  };

  const releaseWakelock = async () => {
    try {
      await invoke("release_wakelock");
    } catch (err) {
      console.warn("Failed to release wakelock (may not be on Android)", err);
    }
  };

  return { requestWakelock, releaseWakelock };
}

/**
 * Hook to manage wakelock for a download operation
 * Automatically requests wakelock when download starts and releases it when done
 */
export function useDownloadWakelock(isDownloading: boolean) {
  const { requestWakelock, releaseWakelock } = useWakelock();

  useEffect(() => {
    if (isDownloading) {
      requestWakelock();
    } else {
      releaseWakelock();
    }
  }, [isDownloading]);
}
