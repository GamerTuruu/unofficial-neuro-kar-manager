/// Parse a Google Drive ID from various URL formats or raw ID
pub fn parse_gdrive_id(source: &str) -> String {
    // Handle full URLs like https://drive.google.com/drive/folders/12345...
    if let Some(start) = source.find("/folders/") {
        let rest = &source[start + 9..];
        // Stop at next slash or query param
        if let Some(end) = rest.find(|c: char| c == '/' || c == '?') {
            return rest[..end].to_string();
        }
        return rest.to_string();
    }

    // Handle id= style
    if let Some(start) = source.find("id=") {
        let rest = &source[start + 3..];
        if let Some(end) = rest.find('&') {
            return rest[..end].to_string();
        }
        return rest.to_string();
    }

    // Assume it's an ID if no known prefix found
    source.to_string()
}
