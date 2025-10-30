# Message Collapse Feature - Implementation Guide

## Overview

The Message Collapse feature (v2.1) automatically collapses long user messages in ChatGPT conversations to improve performance and scrollability. This feature works seamlessly with the existing virtual scrolling system.

## Problem Solved

Long user messages (especially those with code, long prompts, or pasted content) make pages heavy and hard to scroll. Even with virtual scrolling, a single very long message can cause:
- Heavy initial page render
- Difficult scrolling through conversations
- Poor user experience when reviewing chat history

## Solution: Auto-Collapse with Expand Button

Similar to Google Gemini's approach, we:
1. **Automatically collapse** user messages that exceed 600px in height
2. Add an **expand/collapse button** to toggle the state
3. Apply a **fade gradient** at the bottom when collapsed
4. **Preserve collapse state** across virtual scrolling operations

## Implementation Details

### 1. CSS Styling (Lines 116-165)

```css
/* Collapsed message container */
.trimwise-collapsed {
    max-height: 400px;
    overflow: hidden;
    position: relative;
}

/* Fade gradient at bottom */
.trimwise-collapsed::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to bottom, transparent, var(--main-surface-primary, #fff));
    pointer-events: none;
}

/* Expand/Collapse button */
.trimwise-expand-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    margin-top: 8px;
    background-color: transparent;
    color: var(--text-secondary, #6e6e80);
    border: 1px solid var(--border-light, #e5e5e5);
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    transition: all 0.2s ease;
}
```

### 2. State Management (Lines 203-205)

```javascript
// Track which messages are collapsed
const collapsedMessages = new WeakSet();

// Threshold to consider message "long"
const LONG_MESSAGE_THRESHOLD = 600; // pixels
```

**Why WeakSet?**
- Automatic garbage collection when messages are removed
- No memory leaks
- Fast lookups (O(1))

### 3. Core Functions

#### `isMessageLong(article)` (Lines 620-639)
Determines if a message should be collapsed:
- Only targets **user messages** (not assistant responses)
- Checks if height exceeds 600px threshold
- Skips already-collapsed messages

#### `createExpandButton(article, isExpanded)` (Lines 648-670)
Creates the expand/collapse button:
- SVG chevron icon that rotates when expanded
- Text changes: "Show more" ↔ "Show less"
- Click handler toggles collapse state

#### `toggleMessageCollapse(article, button)` (Lines 678-703)
Handles the expand/collapse toggle:
- Finds content container
- Toggles `trimwise-collapsed` class
- Updates button appearance and text
- Tracks state in `collapsedMessages` WeakSet

#### `collapseMessage(article)` (Lines 710-735)
Applies collapsed state to a message:
- Marks message as processed (`data-trimwise-collapsible`)
- Adds collapsed class
- Inserts expand button after content

#### `processMessageCollapse()` (Lines 740-753)
Processes all visible messages:
- Called after visibility changes
- Skips hidden and virtualized messages
- Collapses qualifying long messages

### 4. Integration Points

#### A. Virtual Scrolling Integration (Line 368)
```javascript
// In updateVisibleRange() - after virtualization
setTimeout(processMessageCollapse, 50);
```
Processes messages after they become visible.

#### B. Message Restoration (Lines 612-616)
```javascript
// In restoreMessage() - after restoring from cache
requestAnimationFrame(() => {
    if (isMessageLong(element) && !element.dataset.trimwiseCollapsible) {
        collapseMessage(element);
    }
});
```
Ensures restored messages get collapsed if needed.

#### C. New Message Detection (Line 889)
```javascript
// In MutationObserver callback - when new messages appear
setTimeout(processMessageCollapse, 100);
```
Handles newly added messages.

## User Experience Flow

```
┌─────────────────────────────────────────────────────────┐
│  User sends long message (800px)                        │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  MutationObserver detects new article                   │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  processMessageCollapse() runs                          │
│  - isMessageLong() → true (800px > 600px threshold)     │
│  - collapseMessage() adds .trimwise-collapsed class     │
│  - Inserts expand button                                │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  Message now shows:                                     │
│  ┌────────────────────────────────────┐                │
│  │ [Collapsed to 400px max-height]    │                │
│  │ [Fade gradient at bottom...]       │                │
│  │                                     │                │
│  └────────────────────────────────────┘                │
│  [📥 Show more]  ← Button                              │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼ (User clicks "Show more")
┌─────────────────────────────────────────────────────────┐
│  toggleMessageCollapse() expands                        │
│  - Removes .trimwise-collapsed class                    │
│  - Button text → "Show less"                            │
│  - Chevron rotates 180°                                 │
└─────────────────────────────────────────────────────────┘
```

## Performance Benefits

1. **Reduced Initial Render**: Long messages are limited to 400px initially
2. **Improved Scroll Performance**: Less content to render and paint
3. **Better UX**: Easier to navigate through conversations
4. **Memory Efficient**: WeakSet automatically cleans up references
5. **Complements Virtual Scrolling**: Works together to maximize performance

## Configuration

### Current Settings
- **Threshold**: 600px (user messages taller than this get collapsed)
- **Max Height**: 400px (collapsed state height)
- **Fade Height**: 80px (gradient at bottom)

### Future Improvements
Could add to extension settings:
- Toggle feature on/off
- Adjust height threshold
- Adjust collapsed max-height
- Option to collapse assistant messages too

## Technical Considerations

### Why Only User Messages?
- User messages are more likely to be very long (pasted code, prompts)
- Assistant messages are usually well-formatted and paginated
- Users primarily scroll past their own long inputs

### Selector Strategy
```javascript
const isUserMessage = article.querySelector('[data-message-author-role="user"]');
```
Uses ChatGPT's `data-message-author-role` attribute to identify user messages. This is more stable than class-based selectors.

### WeakSet for State Tracking
```javascript
const collapsedMessages = new WeakSet();
```
- Prevents memory leaks
- Automatic cleanup when articles are removed
- Fast O(1) lookups

### Timing and Delays
```javascript
setTimeout(processMessageCollapse, 50);   // After visibility changes
setTimeout(processMessageCollapse, 100);  // After mutations
requestAnimationFrame(() => ...)          // After restoration
```
Ensures accurate height measurements after DOM has settled.

## Testing Checklist

- [x] Long user messages (>600px) collapse automatically
- [x] Expand button appears below collapsed messages
- [x] Clicking expand shows full message
- [x] Clicking collapse re-collapses message
- [x] Button text and icon update correctly
- [x] Fade gradient appears when collapsed
- [x] Works with virtual scrolling (messages stay collapsed when virtualized)
- [x] Works with "Show more" button
- [x] Restored messages collapse if needed
- [x] New messages collapse on arrival
- [x] No memory leaks (WeakSet cleanup)
- [x] No scroll jumping when toggling
- [x] Assistant messages are NOT collapsed

## Maintenance Notes

### If ChatGPT Updates DOM Structure
1. **Check selector**: `[data-message-author-role="user"]`
2. **Check container**: `.closest('div[class*="group"]')`
3. **Check button insertion point**: `contentContainer.nextSibling`

### If Performance Issues
1. Increase debounce delays (currently 50ms, 100ms)
2. Increase threshold (currently 600px)
3. Add option to disable feature

### If Styling Issues
1. Check CSS variable fallbacks: `var(--main-surface-primary, #fff)`
2. Adjust z-index if button appears behind content
3. Update fade gradient to match ChatGPT theme changes

## Related Files

- `content.js` (Lines 116-165, 203-205, 610-753) - Main implementation
- `manifest.json` - Version updated to 2.1
- `README.md` - Feature documentation
- `ARCHITECTURE.md` - Technical architecture (to be updated if needed)

## Version

- **Introduced**: v2.1 (2025-10-30)
- **Branch**: performance-refactor
- **Author**: Trimwise Team
