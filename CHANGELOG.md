# Changelog

This file contains the fork release history and notable technical changes.

---

## v2.1-firefox.11 (2026-03-03)

### Author
- Shnxxx

### Changed
- Aligned addon name/version across manifest, runtime banner/logs, and docs.
- Switched Firefox background configuration to `background.scripts` only, per Firefox-focused strict compatibility preference.
- Updated options page title/header to use `Trimwise Forfoxxx` naming.

---

## v2.1-firefox.10 (2026-03-03)

### Author
- Shnxxx

### Fixed
- Clicking floating settings now passes current chat theme (`dark`/`light`) before opening options.
- Options page now applies the stored theme and renders dark mode when opened from dark ChatGPT sessions.

### Changed
- Updated options page styles to use theme variables with dark-mode support.

---

## v2.1-firefox.9 (2026-03-03)

### Author
- Shnxxx

### Fixed
- Floating settings dark mode now applies reliably when ChatGPT uses theme classes/attributes instead of media-query matching.
- Added explicit dark-theme selectors for `html/body` (`.dark` and `[data-theme="dark"]`) with safe priority.

---

## v2.1-firefox.8 (2026-03-03)

### Author
- Shnxxx

### Added
- Dark-mode styling for floating settings button UI.
- Documentation overhaul covering fork lineage, versioning, contribution credits, and maintainer ownership.

### Changed
- README rewritten to describe this repository as a maintained Firefox-focused performance fork.
- Contributing/ownership guidance updated to direct users toward the fork maintainer workflow.

---

## v2.1-firefox.7 (2026-03-03)

### Author
- Shnxxx

### Changed
- Full README restructure with fork status, versioning policy, troubleshooting, and maintenance-focused docs.

---

## v2.1-firefox.6 (2026-03-03)

### Author
- Shnxxx

### Added
- Bitwise queue membership flags to reduce duplicate queue scheduling work.
- Idle-batched mutation processing pipeline.
- Chunked idle collapse scanning with cached height reads.

### Changed
- Adaptive queue scheduling and deferred mutation/collapse processing tuned for long active chats.

---

## v2.1-firefox.5 (2026-03-03)

### Author
- Shnxxx

### Added
- Adaptive frame-budgeted virtualization queue.
- Background-tab-aware heavy-work deferral.
- Floating settings button outside React tree to reduce UI conflicts.
- Show-more fallback placement for unstable inline insertion scenarios.

### Changed
- Cross-browser runtime/storage wrappers hardened.

---

## v2.1-firefox.4 (2026-03-03)

### Author
- Shnxxx

### Added
- Firefox troubleshooting guidance for manifest and service worker fallback errors.

### Changed
- Manifest compatibility improvements for Firefox environments.

---

## v2.1-firefox.3 (2026-03-03)

### Author
- Shnxxx

### Added
- Cross-browser wrapper support for options/content/background runtime pathways.

---

## v2.1-firefox.2 (2026-03-03)

### Author
- Shnxxx

### Added
- Gecko metadata and host matching updates for Firefox support.

---

## v2.1-firefox.1 (2026-03-03)

### Author
- Shnxxx

### Added
- Initial fork baseline from Trimwise v2.1 for Firefox-focused maintenance.
- Fork optimization roadmap and compatibility adaptation foundation.

---

## Upstream Lineage

- Base project and original concept by **Garanovich**.
- Fork source reference used in this maintainer stream: **icedmoca**.
