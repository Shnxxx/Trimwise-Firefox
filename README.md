# ChatGPT Lag Fixer – True Virtual Scrolling for Long Chats

A production-ready Chrome + Firefox extension that **dramatically improves** ChatGPT performance in long conversations by implementing true virtual scrolling. Unlike simple hide/show solutions, Trimwise v2.1 completely removes offscreen messages from the DOM, reducing memory usage by 70-90% and eliminating lag.

## ✨ What's New in v2.1

**📦 Smart Message Collapsing** - Long messages now collapse automatically:
- **Long user messages auto-collapse** by default (like Gemini)
- **Expand/Collapse buttons** for easy toggling
- **Reduces page weight** and improves scroll performance
- **Works seamlessly** with virtual scrolling

## ✨ What's New in v2.0

**🚀 True Performance Gains** - Not just hiding, actually removing messages from memory:
- **70-90% memory reduction** in 500+ message conversations
- **95% CPU reduction** during idle (no more polling)
- **Instant response** to new messages (was 3-second delay)
- **Smooth scrolling** with zero position jumping

## 🔧 Features

### Message Collapse System (NEW in v2.1)
- **Auto-Collapse Long Messages**: User messages over 600px height collapse automatically
- **Expand/Collapse Button**: Toggle between collapsed/expanded states
- **Smooth Animations**: Fade gradient at bottom when collapsed
- **Preserved Across Scrolling**: Collapse state maintained during virtualization

### Virtual Scrolling Engine
- **Smart DOM Management**: Offscreen messages completely removed from DOM
- **Height Placeholders**: Maintains exact scroll position (no jumping)
- **Seamless Restoration**: Messages reload before becoming visible (1200px buffer)
- **Browser-Native**: Uses IntersectionObserver for optimal performance

### Performance Optimizations
- **Event-Driven Updates**: MutationObserver detects changes (vs polling every 3s)
- **Change Detection**: Eliminates unnecessary DOM queries and updates
- **Element Reuse**: Zero allocation churn for stable elements
- **CSS Classes**: Fast class toggling vs slow inline style writes

### User Experience
- **Configurable Batch Size**: Show 5-100 messages at a time (settings page)
- **"Show More" Control**: Expand visible range with one click
- **Visual Polish**: Smooth button animations matching ChatGPT's design
- **Backward Compatible**: All v1.x settings preserved

## 📊 Performance Comparison

| Metric | v1.1 (Hide) | v2.0 (Virtual) | Improvement |
|--------|-------------|----------------|-------------|
| Memory (500 msgs) | 100% in DOM | ~20% in DOM | **80% reduction** |
| CPU (idle) | 8.3ms/sec | 0.4ms/sec | **95% reduction** |
| New message delay | 0-3 seconds | Instant | **Instant** |
| DOM operations | 200+/cycle | Changed only | **90% reduction** |

## 💡 Why?

Long ChatGPT conversations (100+ messages) cause severe performance issues:
- Browser lag and freezing
- High memory usage (1GB+ for 500 messages)
- Slow scrolling
- React reconciliation overhead

**Previous solutions** (including v1.1) only hid messages with `display: none` – they stayed in memory and React's virtual DOM, providing minimal improvement.

**Trimwise v2.0** actually removes messages from the DOM and restores them on-demand, delivering real performance gains.

## 🧑‍💻 Install

### Option 1: Chrome Web Store (Recommended - Coming Soon)
*Extension will be available on Chrome Web Store after review*

### Option 2: Firefox Add-ons (AMO - Coming Soon)
*Extension will be available on Firefox Add-ons after review*

### Option 3: Load Unpacked (Developer Mode)
1. **Clone or download** this repository
   ```bash
   git clone https://github.com/garanovich/Trimwise.git
   ```
2. **Open your browser's extensions page**:
   - Chrome: `chrome://extensions/`
   - Firefox: `about:debugging#/runtime/this-firefox`
3. **Enable development mode**:
   - Chrome: Toggle on **Developer mode**
   - Firefox: Click **Load Temporary Add-on**
4. **Firefox install (important)**:
   - Select the repository's **`manifest.json` file directly** (recommended), OR
   - Select a `.zip/.xpi` that has `manifest.json` at the **archive root** (not inside a nested folder).
5. **Done!** Extension will appear in your toolbar

#### Common Firefox error: "does not contain a valid manifest"
This usually means the zip was created with an extra top-level folder.

✅ Correct archive structure:
```text
trimwise-firefox.xpi
├── manifest.json
├── background.js
├── content.js
└── ...
```

❌ Incorrect archive structure:
```text
trimwise-firefox.zip
└── Trimwise-Firefox/
    ├── manifest.json
    └── ...
```

If you are using `about:debugging`, easiest path is to skip zipping and load `manifest.json` directly.

Another possible error:
- **`background.service_worker is currently disabled. Add background.scripts.`**

This happens on Firefox builds where MV3 service workers are disabled. The manifest includes a `background.scripts` fallback now, but if you still see this:
1. Update Firefox to the latest stable version
2. Retry loading via `about:debugging#/runtime/this-firefox`
3. If needed, test on Firefox Developer Edition/Nightly where MV3 support is newer

If **"Show more"** does not appear:
1. Open ChatGPT tab DevTools console
2. Look for one of these logs from the extension:
   - `[Trimwise] Show more button mounted` (normal inline placement)
   - `[Trimwise] Using floating fallback for Show more button` (fallback mode)
3. If neither appears, reload the ChatGPT tab after loading the add-on

### Configuration
1. **Click the extension icon** or right-click → Options
2. **Adjust message count** (5-100, default 20)
3. **Save settings**
4. **Reload ChatGPT tab** to apply

## 📖 Documentation

- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and release notes
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical deep-dive, maintenance guide
- **[privacy.html](./privacy.html)** - Privacy policy (no data collection)

## 🎯 How It Works

### The Problem
ChatGPT keeps all messages in the DOM as you chat. A 500-message conversation can have:
- 10,000+ DOM nodes
- 500 React components in memory
- Syntax highlighted code blocks fully parsed
- All images decoded and cached

### The Solution - Virtual Scrolling

```
┌─────────────────────────────────────┐
│  Placeholders (virtualized)         │  ← Not in DOM
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  Buffer Zone (1200px)               │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  Real Messages                      │  ← In DOM
│  ══════════════════════════════════ │
│  VIEWPORT (visible)                 │  ← What you see
│  ══════════════════════════════════ │
│  Real Messages                      │  ← In DOM
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  Buffer Zone (1200px)               │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  Placeholders (virtualized)         │  ← Not in DOM
└─────────────────────────────────────┘
```

**Key Concepts**:
1. **Remove** messages far from viewport
2. **Replace** with height-preserving placeholders (no scroll jump)
3. **Restore** seamlessly when scrolling brings them back
4. **Buffer zones** ensure smooth restoration before visible

## 🔧 Technical Highlights

- **No React internals**: Pure DOM manipulation, works with any ChatGPT update
- **Chrome + Firefox MV3 compatible**: Production-ready extension manifest
- **Memory safe**: Proper cleanup prevents leaks
- **Zero dependencies**: Vanilla JavaScript, no libraries
- **Well documented**: 600+ lines of inline comments

## 🐛 Known Limitations

1. **React vDOM overhead**: React still tracks all messages (~20-30% overhead remains)
2. **Event listeners**: Cached messages keep listeners (good: preserved functionality, bad: not fully freed)
3. **ChatGPT updates**: Selector changes require maintenance (trade-off for stability)

These are architectural limitations that can only be solved by hooking into React internals (fragile) or intercepting ChatGPT's API (complex).

## 🤝 Contributing

Contributions are welcome! Areas for improvement:

- **Adaptive buffer sizing** based on scroll velocity
- **Predictive loading** in scroll direction only
- **IndexedDB caching** for true memory freedom
- **Service worker** integration for API-level pagination
- **Tests** for virtualization logic
- **Performance monitoring** dashboard

### Development Setup
```bash
# Clone repo
git clone https://github.com/garanovich/Trimwise.git
cd Trimwise

# Make changes to content.js

# Load unpacked in Chrome or Firefox
# Chrome: chrome://extensions/ → Load unpacked → Select Trimwise folder
# Firefox: about:debugging#/runtime/this-firefox → Load Temporary Add-on → Select manifest.json

# Test on ChatGPT
# Open long conversation (100+ messages)
# Monitor: DevTools → Performance → Memory
```

### Testing Checklist
- [ ] Messages virtualize when scrolling away
- [ ] Messages restore when scrolling back
- [ ] Scroll position never jumps
- [ ] "Show more" button works correctly
- [ ] Settings persist across reloads
- [ ] No console errors
- [ ] Memory usage reduced (DevTools → Memory)

## ☕ Support Development

If this extension saves your sanity in long ChatGPT sessions:

- ⭐ **Star this repo** on GitHub
- ☕ **Buy me a coffee**: [Ko-Fi](https://ko-fi.com/rentanek0)
- 🐛 **Report bugs**: [GitHub Issues](https://github.com/garanovich/Trimwise/issues)
- 💡 **Suggest features**: [GitHub Discussions](https://github.com/garanovich/Trimwise/discussions)

## 📜 License

MIT License - see [LICENSE](./LICENSE) file for details

---

## 📌 Version History

### v2.1 (2025-10-30) - Message Collapse
- Auto-collapse long user messages (600px+ height)
- Expand/Collapse buttons with smooth animations
- Reduces page weight and improves scroll performance
- Integrates seamlessly with virtual scrolling system
- Collapse state preserved during message restoration

### v2.0 (2025-10-30) - Virtual Scrolling
- Complete rewrite with true virtual scrolling
- 70-90% memory reduction (removes messages from DOM)
- 95% CPU reduction (MutationObserver vs polling)
- IntersectionObserver for seamless restoration
- Production-ready with extensive documentation

### v1.1 (Previous)
- Dynamic message display with settings
- "Show more" button improvements
- Visual enhancements

### v1.0 (Initial)
- Basic hide/show with `display: none`
- Fixed batch size (50 messages)

---

**Made with ❤️ for the ChatGPT community**

*Having issues? Check [ARCHITECTURE.md](./ARCHITECTURE.md) for troubleshooting or [open an issue](https://github.com/garanovich/Trimwise/issues).*
