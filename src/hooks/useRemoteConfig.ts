import { invoke } from "@tauri-apps/api/core";
import { useCallback, useEffect, useState } from "react";

const DEFAULT_RCLONE_CONFIG_NAME = "gdrive_unofficial_neuro_kar";

export function useRemoteConfig() {
  const [remotes, setRemotes] = useState<string[]>([]);
  const [selectedRemote, setSelectedRemote] = useState<string | null>(
    DEFAULT_RCLONE_CONFIG_NAME,
  );
  const [loading, setLoading] = useState(false);

  const fetchRemotes = useCallback(async () => {
    try {
      const availableRemotes = await invoke<string[]>("get_gdrive_remotes");
      setRemotes(availableRemotes);
    } catch (err) {
      console.error("Failed to fetch remotes", err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchRemotes();
  }, [fetchRemotes]);

  useEffect(() => {
    setSelectedRemote((prev) => {
      // If manually selected "new config" (null), keep it.
      if (prev === null) {
        return null;
      }
      // If the currently selected remote is still in the list, keep it.
      if (remotes.includes(prev)) {
        return prev;
      }
      // Otherwise, prefer the default config if available.
      if (remotes.includes(DEFAULT_RCLONE_CONFIG_NAME)) {
        return DEFAULT_RCLONE_CONFIG_NAME;
      }
      return null;
    });
  }, [remotes]);

  const createConfig = async () => {
    setLoading(true);
    try {
      const newConfigName = await invoke<string>("create_gdrive_remote");
      await fetchRemotes();
      setSelectedRemote(newConfigName);
      return newConfigName;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    remotes,
    selectedRemote,
    setSelectedRemote,
    loading,
    fetchRemotes,
    createConfig,
    isConfigValid: !!selectedRemote,
  };
}
