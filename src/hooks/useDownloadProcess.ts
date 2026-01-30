import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

interface DownloadParams {
  source: string;
  destination: string;
  remoteConfig: string;
  createSubfolder: boolean;
  selectedFiles: string[] | null;
  createBackup: boolean;
}

export function useDownloadProcess() {
  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [status, setStatus] = useState("");
  const [log, setLog] = useState("");

  const appendLog = (message: string) => {
    setLog((prev) => `${prev}${message}\n`);
  };

  const startDownload = async (params: DownloadParams) => {
    setLoading(true);
    setStatus("Downloading...");
    setLog(
      `Starting download...\nSource: ${params.source}\nDestination: ${params.destination}\nRemote: ${params.remoteConfig}\nBackup: ${params.createBackup ? "Yes" : "No"}\n`,
    );

    try {
      const output = await invoke<string>("download_gdrive", {
        source: params.source,
        destination: params.destination,
        remoteConfig: params.remoteConfig,
        createSubfolder: params.createSubfolder,
        selectedFiles: params.selectedFiles,
        createBackup: params.createBackup,
      });
      setStatus("Download completed successfully.");
      appendLog(`\n${output}`);
    } catch (error) {
      console.error(error);
      setStatus("Download failed.");
      appendLog(`\nError: ${error}`);
    } finally {
      setLoading(false);
      setCancelling(false);
    }
  };

  const cancelDownload = async () => {
    if (cancelling) return;
    setCancelling(true);
    try {
      appendLog("\nRequesting cancellation...");
      await invoke("stop_rc_server");
    } catch (err) {
      console.error("Failed to stop rclone", err);
      appendLog(`\nFailed to stop rclone: ${err}`);
      setCancelling(false);
    }
  };

  return {
    loading,
    cancelling,
    status,
    log,
    appendLog,
    startDownload,
    cancelDownload,
  };
}
