import { Store } from "@tauri-apps/plugin-store";
import { useCallback, useEffect, useRef, useState } from "react";
import { type AppConfig, NETWORK_DEFAULTS } from "@/types/config";

const STORE_FILENAME = "app-config.json";

export function useAppConfig() {
  const [config, setConfig] = useState<AppConfig>(NETWORK_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<Store | null>(null);

  // Keep a ref to config so saveConfig doesn't need to be recreated on every change
  const configRef = useRef(config);
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    const initStore = async () => {
      try {
        const _store = await Store.load(STORE_FILENAME);
        setStore(_store);

        const val = await _store.get<AppConfig>("config");
        if (val) {
          // Merge with defaults to ensure new fields are present
          setConfig({ ...NETWORK_DEFAULTS, ...val });
        } else {
          // If no config exists, save the default one
          await _store.set("config", NETWORK_DEFAULTS);
          await _store.save();
        }
      } catch (err) {
        console.error("Failed to load store:", err);
      } finally {
        setLoading(false);
      }
    };

    initStore();
  }, []);

  const saveConfig = useCallback(
    async (newConfig: Partial<AppConfig>) => {
      if (!store) return;
      try {
        const current = configRef.current;
        const fullConfig = { ...current, ...newConfig };

        // Update state immediately
        setConfig(fullConfig);

        // Persist
        await store.set("config", fullConfig);
        await store.save();
      } catch (err) {
        console.error("Failed to save config:", err);
      }
    },
    [store],
  );

  return { config, loading, saveConfig };
}
