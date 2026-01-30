mod types;
mod utils;
mod list;
mod remotes;
mod download;

// Re-export types
pub use types::GdriveFile;

// Re-export command functions
pub use list::__cmd__list_gdrive_files;
pub use remotes::{__cmd__get_gdrive_remotes, __cmd__create_gdrive_remote};
pub use download::__cmd__download_gdrive;

// Re-export the actual functions (for potential internal use)
pub use list::list_gdrive_files;
pub use remotes::{get_gdrive_remotes, create_gdrive_remote};
pub use download::download_gdrive;
