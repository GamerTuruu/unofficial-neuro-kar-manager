# Migration Notes - Update from Previous Version

##🎯 Automatic Improvements (No Action Needed)

These features are automatically enabled and require NO code changes:

### Touch-Friendly UI
- All buttons and inputs automatically resize on Android
- Components detect Android and apply proper sizing
- **No action needed** - works automatically

### Device Wakelock
- Downloads automatically prevent device sleep
- Wakelock is managed in `Download.tsx` based on `download.loading` state
- **No action needed** - enabled by default

### Error Messages
- All download errors are automatically parsed
- Users see helpful messages instead of technical errors
- **No action needed** - integrated in `useDownloadProcess`

---

## 🔧 Optional Features (Consider Enabling)

### Android Notifications
**Currently:** Not integrated into download flow
**To Enable:** Call from `useDownloadProcess`:
```typescript
const { showDownloadProgress, showDownloadComplete } = useAndroidNotifications();

// In startDownload:
showDownloadProgress("Downloading", "Starting...", 0);

// In runDownload:
showDownloadProgress("Downloading", `Transferred: ${stats}`, progress);

// On completion:
showDownloadComplete("Success", fileCount, "15.2 GB", duration);
```

### Bandwidth Limiting
**Currently:** UI control is available but optional
**Default:** No limit (unlimited bandwidth)
**To Use:** Just set in Advanced Options, will be passed to rclone

---

## 📝 Configuration Changes

### Cargo.toml
**Added dependencies:**
```toml
tauri-plugin-notification = "2"
tauri-plugin-wakelock = "2"
```

### src-tauri/src/lib.rs
**Added plugin initialization:**
```rust
.plugin(tauri_plugin_notification::init())
.plugin(tauri_plugin_wakelock::init())
```

**Added invoke handlers:**
```rust
api::android_notifications::show_notification,
api::android_notifications::show_download_progress,
api::android_notifications::show_download_complete,
api::android_notifications::show_download_error,
api::wakelock::request_wakelock,
api::wakelock::release_wakelock,
```

### src-tauri/src/api.rs
**Added module exports:**
```rust
pub mod android_notifications;
pub mod wakelock;
```

---

## 🧪 Testing Checklist

### Build & Dependencies
- [ ] `pnpm install` or `cargo update`
- [ ] Build TypeScript: `pnpm build` (no errors)
- [ ] Build Rust: `cd src-tauri && cargo build` (no errors)

### Core Features
- [ ] Download with network error → see helpful message
- [ ] Set bandwidth limit → verify transfer speed is capped
- [ ] Brief network outage → download retries automatically
- [ ] Observe logs for retry attempts

### Android Specific
- [ ] Run on Android device
- [ ] Buttons and inputs are large (56px+)
- [ ] Device stays awake during download
- [ ] Lock device during download → stays connected
- [ ] Test on portrait and landscape modes

### Desktop
- [ ] Download still works on desktop
- [ ] No wakelock calls on desktop (graceful)
- [ ] No notification calls on desktop (graceful)
- [ ] Button/input sizes normal (no Android sizing)

### Regression Testing
- [ ] Dry-run warnings still appear
- [ ] Backup creation still works
- [ ] File browser still works
- [ ] Settings save/load still works
- [ ] Cancel during download still works

---

## ⚠️ Breaking Changes

**None!** All changes are backward compatible.

- Existing download logic unchanged
- New parameters have defaults
- Old configurations still work
- Features gracefully degrade on unsupported platforms

---

## 📖 Documentation

Read for more details:
- `SUMMARY.md` - Quick overview of all improvements
- `IMPROVEMENTS.md` - Detailed changelog
- `IMPLEMENTATION_GUIDE.md` - Developer guide

---

## 🚀 Deployment Checklist

- [ ] Git commit all changes
- [ ] Update version in Cargo.toml and package.json
- [ ] Run `pnpm build` successfully
- [ ] Test on both desktop and Android
- [ ] Create release notes (reference SUMMARY.md)
- [ ] Tag release in git
- [ ] Build APK for Android distribution

---

## 💡 Tips

1. **Error Testing:** Unplug network to test error messages
2. **Wakelock Testing:** Lock screen during download, verify continues
3. **Touch Testing:** Measure buttons/inputs with DevTools (should be 56px)
4. **Notifications:** Check Android system tray during download
5. **Performance:** No noticeable impact from new features

---

## ❓ FAQ

**Q: Will this work on desktop?**
A: Yes! Touch UI scales appropriately, wakelock gracefully fails, notifications work on desktop.

**Q: Do I need to update configurations?**
A: No! All new features are optional and have sensible defaults.

**Q: Will bandwidth limiting slow down my download?**
A: Yes, by design. Leave Bandwidth Limit empty for unlimited speed.

**Q: Why does my download keep retrying?**
A: Transient network errors trigger automatic retry. Check logs if excessive.

**Q: Can I disable Android features on desktop?**
A: They're already conditional! Desktop won't call wakelock/notifications.

---

## 🐛 Troubleshooting

**Build Error: "Plugin not found"**
- Run `cargo update` in src-tauri
- Check Cargo.toml has all plugins listed

**Notifications not working on Android**
- Verify plugin permission in AndroidManifest.xml
- Check app has notification permission

**Buttons/inputs not scaling on Android**
- Verify `isAndroid()` function detects correctly
- Check DevTools device emulation settings

**Wakelock not working**
- Verify `WAKE_LOCK` permission in manifest
- Check Download page is using `useDownloadWakelock`

---

Last Updated: February 2026
Version: 0.0.4+
