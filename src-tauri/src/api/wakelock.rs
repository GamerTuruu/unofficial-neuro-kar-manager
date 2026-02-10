/// Android wakelock support for keeping the device awake during downloads
use tauri_plugin_wakelock::WakelockExt;

#[tauri::command]
pub async fn request_wakelock(app: tauri::AppHandle) -> Result<(), String> {
    app.wakelock()
        .request_wakelock()
        .map_err(|e| format!("Failed to request wakelock: {}", e))
}

#[tauri::command]
pub async fn release_wakelock(app: tauri::AppHandle) -> Result<(), String> {
    app.wakelock()
        .release_wakelock()
        .map_err(|e| format!("Failed to release wakelock: {}", e))
}
