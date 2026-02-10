/// Android notification support
use tauri::Manager;

#[tauri::command]
pub async fn show_notification(
    _app: tauri::AppHandle,
    title: String,
    body: String,
) {
    let _ = tauri_plugin_notification::Builder::new()
        .title(&title)
        .body(&body)
        .build()
        .send()
        .await;
}

#[tauri::command]
pub async fn show_download_progress(
    _app: tauri::AppHandle,
    title: String,
    message: String,
    progress: u32,
) {
    // For Android, we show a simple notification with progress
    // Note: Real notification progress may require native Android code
    let progress_bar = create_progress_bar(progress);
    let full_message = format!("{}\n{}", message, progress_bar);

    let _ = tauri_plugin_notification::Builder::new()
        .title(&title)
        .body(&full_message)
        .build()
        .send()
        .await;
}

#[tauri::command]
pub async fn show_download_complete(
    _app: tauri::AppHandle,
    title: String,
    file_count: u64,
    size_transferred: String,
    duration_secs: u64,
) {
    let body = format!(
        "Downloaded {} files ({})\nTime: {} seconds",
        file_count, size_transferred, duration_secs
    );

    let _ = tauri_plugin_notification::Builder::new()
        .title(&title)
        .body(&body)
        .build()
        .send()
        .await;
}

#[tauri::command]
pub async fn show_download_error(
    _app: tauri::AppHandle,
    title: String,
    error_message: String,
) {
    let _ = tauri_plugin_notification::Builder::new()
        .title(&title)
        .body(&error_message)
        .build()
        .send()
        .await;
}

/// Helper to create a simple text-based progress bar
fn create_progress_bar(progress: u32) -> String {
    let clamped = std::cmp::min(progress, 100);
    let filled = (clamped / 10) as usize;
    let empty = 10 - filled;
    format!(
        "[{}{}] {}%",
        "=".repeat(filled),
        " ".repeat(empty),
        clamped
    )
}
