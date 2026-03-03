# Trimwise Firefox Fork

A Firefox-focused, cross-browser fork of Trimwise for making long ChatGPT conversations significantly smoother.

## Maintainer + Lineage

- **Maintainer / Author:** **Shnxxx**
- **Original creator:** **Garanovich**
- **Fork source in this maintenance line:** **icedmoca**

For detailed authorship notes, see [CREDITS.md](./CREDITS.md).

---

## Current Fork Version

**`v2.1-firefox.8`**

This version includes all previous fork optimizations plus a dark-mode treatment for the floating settings UI and full documentation consolidation.

---

## What This Fork Improves

### 1) Cross-Browser Runtime Stability
- Firefox + Chrome compatible runtime/storage behavior.
- Gecko metadata and compatibility fields in manifest.
- Firefox-safe install flow and troubleshooting docs.

### 2) Performance in Long Conversations
- Virtualization with height-preserving placeholders.
- Adaptive frame-budget operation queue.
- Idle-batched mutation processing.
- Chunked long-message collapse scanning.
- Queue-state bitwise flags for lower scheduling overhead.
- Background-tab deferral to avoid wasted CPU cycles.

### 3) UI Robustness
- Floating settings button outside ChatGPT React tree.
- Show-more fallback placement when inline insertion is unstable.
- Dark-mode styling support for floating settings button.

---

## Performance Comparison (Theoretical)

> These are directional/engineering estimates, not lab-certified benchmarks.

| Scenario | Baseline (no virtualization) | Fork (v2.1-firefox.8) | Expected effect |
|---|---:|---:|---|
| DOM nodes in long chat | Very high (grows with full history) | Bounded around active range + placeholders | Lower layout/repaint cost |
| Mutation burst handling | Immediate repeated processing | Idle-batched/coalesced processing | Fewer main-thread spikes |
| Virtualize/restore burst | Unbounded same-frame churn | Adaptive frame-budget queue | Better scroll smoothness |
| Collapse scanning | Full-ish repeated scanning | Chunked idle scanning + height cache | Reduced blocking |
| Hidden-tab workload | Still processes heavy updates | Heavy work deferred while hidden | Lower background CPU |
| Queue churn | Duplicate enqueue opportunities | Bitwise queue-state flags | Less redundant scheduling |

---

## Installation

### Firefox (Recommended for this fork)
1. Go to: `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select `manifest.json` from this repo root

### Chrome
1. Go to: `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** and select repo folder

---

## Firefox Troubleshooting

### Error: `does not contain a valid manifest`
Your archive has a nested top-level directory. `manifest.json` must be at archive root.

### Error: `background.service_worker is currently disabled. Add background.scripts.`
- Update Firefox
- Reload temporary add-on
- If needed, test in Firefox Developer Edition/Nightly

### “Show more” not visible
Open ChatGPT tab console and check for:
- `[Trimwise] Show more button mounted`
- `[Trimwise] Using floating fallback for Show more button`

---

## Floating Settings Button + Dark Mode

The settings button is rendered as a floating UI element (outside ChatGPT’s React tree) and now supports dark-mode styling.

Why this helps:
- Reduces React hydration/reconciliation conflicts.
- Keeps settings access visible across changing composer layouts.
- Improves readability in dark UI contexts.

---

## Versioning Policy

Fork releases follow:
- `v2.1-firefox.N`

Where:
- `2.1` = upstream feature generation
- `firefox` = fork channel
- `N` = fork maintenance/release increment

See full release history in [CHANGELOG.md](./CHANGELOG.md).

---

## Changelog Snapshot

- `v2.1-firefox.8` — dark mode for floating settings UI + full docs/credit refresh
- `v2.1-firefox.7` — README and versioning consolidation
- `v2.1-firefox.6` — bitwise queue flags + idle-batched mutation + chunked collapse
- `v2.1-firefox.5` — adaptive queue + background-tab handling + floating UI resilience
- `v2.1-firefox.4` — Firefox manifest/install troubleshooting hardening
- `v2.1-firefox.1-3` — baseline Firefox compatibility and wrapper stabilization

---

## Contribution Direction (Important)

Since this is an actively maintained fork, contribution direction should prioritize the **fork maintainer workflow**.

- Issues/feature requests should be filed against this fork repository.
- PRs should target this fork’s default branch.
- Upstream links can still be referenced for historical/original context, but maintenance ownership for this fork is here.

(So yes — your intuition is correct: contribution flow should point to your maintained fork.)

---

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [CHANGELOG.md](./CHANGELOG.md)
- [TEST_GUIDE.md](./TEST_GUIDE.md)
- [CREDITS.md](./CREDITS.md)
- [privacy.html](./privacy.html)

---

## License

MIT. See [LICENSE](./LICENSE).
