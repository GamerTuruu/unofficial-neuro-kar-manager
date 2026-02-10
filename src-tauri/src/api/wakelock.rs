/// Android wakelock support for keeping the device awake during downloads
/// Note: This is a stub implementation as tauri-plugin-wakelock is not yet published

#[tauri::command]
pub async fn request_wakelock(_app: tauri::AppHandle) -> Result<(), String> {
    // Wakelock plugin not yet available - this is a no-op for now
    Ok(())
}

#[tauri::command]
pub async fn release_wakelock(_app: tauri::AppHandle) -> Result<(), String> {
    // Wakelock plugin not yet available - this is a no-op for now
    Ok(())
}
