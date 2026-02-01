use std::path::Path;

#[tauri::command]
pub fn scan_local_files(path: String) -> Result<Vec<String>, String> {
    let root = Path::new(&path);
    if !root.exists() || !root.is_dir() {
        return Err("Destination is not a valid directory".to_string());
    }

    let mut files = Vec::new();
    let mut stack = vec![root.to_path_buf()];

    while let Some(dir) = stack.pop() {
        let entries = std::fs::read_dir(&dir).map_err(|e| e.to_string())?;
        for entry in entries {
            let entry = entry.map_err(|e| e.to_string())?;
            let path = entry.path();
            if path.is_dir() {
                stack.push(path);
            } else {
                if let Ok(relative) = path.strip_prefix(root) {
                    let path_str = relative.to_string_lossy().replace('\\', "/");
                    files.push(path_str);
                }
            }
        }
    }

    Ok(files)
}
