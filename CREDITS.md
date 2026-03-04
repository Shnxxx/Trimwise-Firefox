# Credits

This document tracks authorship, fork lineage, and contribution summaries.

## Project Lineage

- **Original creator:** Garanovich
- **Fork source used by this maintainer:** icedmoca
- **Current maintainer / fork author:** Shnxxx

## Maintainer Contribution Summary (Shnxxx)

### 2026-03-03 — Firefox + Performance Fork Track

**Author:** Shnxxx  
**Role:** Maintainer, performance direction, validation, and release documentation

**Major contributions in this fork cycle:**
- Ported extension behavior for Firefox compatibility and dual-browser runtime safety.
- Added robust install/troubleshooting guidance for Firefox temporary add-ons.
- Hardened cross-browser storage/runtime wrappers (`browser` + `chrome` behavior).
- Improved virtualization throughput via adaptive frame-budget queueing.
- Added idle-batched mutation processing and chunked collapse scanning.
- Added queue-state bitwise flags to reduce redundant scheduling churn.
- Added floating UI resilience (settings and show-more fallback behavior).
- Reworked project documentation with fork versioning/changelog structure.
- Added dark-mode styling support for floating settings UI.
- Fixed dark-mode selector compatibility so floating settings styling applies reliably in ChatGPT dark theme.
- Implemented chat-theme-to-options sync so floating settings opens options in matching dark/light mode.

## Attribution Guidance for Future Releases

For every release note or PR in this fork, include:
- **Author:** Shnxxx
- **Date:** YYYY-MM-DD
- **Fork version:** `v2.1-firefox.N`
- **Contribution summary:** concise bullet list of shipped changes
