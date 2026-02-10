/**
 * Parse error messages from Tauri/Rclone and return user-friendly messages
 */
export function parseDownloadError(error: unknown): string {
  const errorStr = String(error).toLowerCase();

  // Network errors
  if (errorStr.includes("connection refused") || errorStr.includes("error sending request")) {
    return "Network connection failed. Please check your internet connection and try again.";
  }

  if (errorStr.includes("timeout") || errorStr.includes("timed out")) {
    return "Connection timed out. Your network may be slow or unstable.";
  }

  if (errorStr.includes("no such host") || errorStr.includes("dns")) {
    return "Cannot reach Google Drive servers. Check your internet connection.";
  }

  // Permission errors
  if (errorStr.includes("permission denied") || errorStr.includes("access denied")) {
    return "Access denied. Try regenerating your remote configuration in the settings.";
  }

  if (errorStr.includes("unauthorized") || errorStr.includes("401")) {
    return "Authentication failed. Please re-authorize your Google Drive access.";
  }

  if (errorStr.includes("forbidden") || errorStr.includes("403")) {
    return "Access forbidden. You may not have permission to access this folder.";
  }

  // File system errors
  if (errorStr.includes("no such file") || errorStr.includes("not found") || errorStr.includes("404")) {
    return "Source folder not found. Please verify the Google Drive folder ID or URL.";
  }

  if (errorStr.includes("no space left") || errorStr.includes("disk full")) {
    return "Not enough disk space. Free up space on your device and try again.";
  }

  if (errorStr.includes("read-only")) {
    return "Cannot write to destination. The folder may be read-only.";
  }

  if (errorStr.includes("directory not empty")) {
    return "Destination folder is not empty and cannot be overwritten.";
  }

  // Rate limiting
  if (errorStr.includes("rate limit") || errorStr.includes("too many requests") || errorStr.includes("429")) {
    return "Google Drive rate limit reached. Please wait a few minutes and try again.";
  }

  if (errorStr.includes("quota exceeded")) {
    return "Google Drive quota exceeded. You may have reached your daily download limit.";
  }

  // Rclone specific
  if (errorStr.includes("remote configuration") || errorStr.includes("no remotes found")) {
    return "Remote configuration is missing or invalid. Please set up Google Drive access first.";
  }

  if (errorStr.includes("cancelled")) {
    return "Download was cancelled.";
  }

  // Configuration errors
  if (errorStr.includes("invalid") && errorStr.includes("config")) {
    return "Invalid configuration. Try deleting and recreating your remote.";
  }

  // Generic errors with more context
  if (errorStr.includes("failed to")) {
    return `Operation failed: ${error}`;
  }

  // Default fallback
  return `An error occurred: ${error}`;
}

/**
 * Parse error for auth-specific operations
 */
export function parseAuthError(error: unknown): string {
  const errorStr = String(error).toLowerCase();

  if (errorStr.includes("timeout")) {
    return "Authorization timed out. Please try again.";
  }

  if (errorStr.includes("cancelled")) {
    return "Authorization was cancelled.";
  }

  if (errorStr.includes("invalid") || errorStr.includes("malformed")) {
    return "Invalid authorization response. Please try again.";
  }

  if (errorStr.includes("network") || errorStr.includes("connection")) {
    return "Network error during authorization. Check your connection.";
  }

  return `Authorization failed: ${error}`;
}

/**
 * Parse errors for file listing operations
 */
export function parseFileListError(error: unknown): string {
  const errorStr = String(error).toLowerCase();

  if (errorStr.includes("not found") || errorStr.includes("404")) {
    return "Folder not found. Please check the folder ID.";
  }

  if (errorStr.includes("permission") || errorStr.includes("forbidden")) {
    return "Cannot access folder. Check your permissions.";
  }

  if (errorStr.includes("timeout")) {
    return "Loading files timed out. Folder may be too large.";
  }

  return `Failed to load files: ${error}`;
}
