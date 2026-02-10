import { useState } from "react";

const DEFAULT_GDRIVE_SOURCE = "1B1VaWp-mCKk15_7XpFnImsTdBJPOGx7a";

export function useDownloadForm() {
  const [source, setSource] = useState(DEFAULT_GDRIVE_SOURCE);
  const [destination, setDestination] = useState("");
  const [syncMode, setSyncMode] = useState(true);
  const [useSubfolder, setUseSubfolder] = useState(true);
  const [createBackup, setCreateBackup] = useState(true);
  const [deleteExcluded, setDeleteExcluded] = useState(true);
  const [trackRenames, setTrackRenames] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<string[] | null>(null);
  const [bandwidthLimit, setBandwidthLimit] = useState("");
  const [bandwidthUnit, setBandwidthUnit] = useState("M"); // "K" for KB/s, "M" for MB/s

  const isValid = (remoteConfigValid: boolean) => {
    return remoteConfigValid && !!source && !!destination;
  };

  const getBandwidthLimitString = () => {
    if (!bandwidthLimit || parseFloat(bandwidthLimit) <= 0) return null;
    return `${bandwidthLimit}${bandwidthUnit}`;
  };

  return {
    source,
    setSource,
    destination,
    setDestination,
    syncMode,
    setSyncMode,
    useSubfolder,
    setUseSubfolder,
    createBackup,
    setCreateBackup,
    deleteExcluded,
    setDeleteExcluded,
    trackRenames,
    setTrackRenames,
    selectedFiles,
    setSelectedFiles,
    bandwidthLimit,
    setBandwidthLimit,
    bandwidthUnit,
    setBandwidthUnit,
    getBandwidthLimitString,
    isValid,
  };
}
