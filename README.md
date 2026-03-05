# Trimwise Forfoxxx Firefox Add-on

A Firefox-only performance add-on for ChatGPT long conversations.

## Maintainer + Lineage
- Maintainer / Author: **Shnxxx**
- Original creator: **Garanovich**
- Fork lineage reference: **icedmoca**

## Version
- Current: **v2.1-firefox.12**
- Manifest: **2.1.12**

## Firefox-only Scope
This repository is strictly Firefox-focused. Chromium/Chrome compatibility is intentionally removed.

## Key Performance Optimizations (Firefox)
- Virtual scrolling with DOM removal + height placeholders
- Adaptive frame-budget queue for virtualize/restore operations
- Bitwise queue-state flags to avoid redundant scheduling
- Idle-batched mutation processing
- Chunked collapse scanning with cached height reads
- Background-tab observer detachment (`visibilitychange`) to reduce hidden-tab CPU usage

## Installation (Firefox)
1. Open: `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select `manifest.json`

## Settings Window Notes
- Floating settings button opens **Add-on Settings** (not "Extension")
- Settings page follows chat dark/light theme when opened
- Includes:
  - Contribute link (issues): https://github.com/Shnxxx/Trimwise-Firefox/issues
  - Ko-fi support button
  - Credits to Garanovich and icedmoca

## Theoretical Performance Comparison

| Scenario | Baseline | v2.1-firefox.12 |
|---|---:|---:|
| Mutation burst handling | Repeated immediate work | Idle-batched/coalesced |
| Virtualize/restore spikes | High same-frame churn | Adaptive frame-budget queue |
| Hidden-tab CPU | Continues processing | Observer detached while hidden |
| Collapse scanning | Large synchronous scan | Chunked idle scan + cache |

## Docs
- [CHANGELOG.md](./CHANGELOG.md)
- [CREDITS.md](./CREDITS.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [TEST_GUIDE.md](./TEST_GUIDE.md)

## License
MIT
