#[derive(serde::Serialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct GdriveFile {
    pub path: String,
    pub name: String,
    pub is_dir: bool,
    pub size: i64,
    pub mime_type: String,
}
