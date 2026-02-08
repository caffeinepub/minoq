# Specification

## Summary
**Goal:** Let admins enter alphanumeric product prices in Admin Mode while keeping WhatsApp “Buy Now” links based on a numeric-only extracted price.

**Planned changes:**
- Update Admin Mode inline product price edit input to accept alphabetic characters (alphanumeric) without blocking keystrokes, and save/display the full typed price text.
- Update Admin Mode “Add Product” form price input to accept alphabetic characters (alphanumeric) without blocking keystrokes, and save/display the full typed price text.
- Preserve existing WhatsApp “Buy Now” link generation by extracting a numeric-only price value from the typed price text.
- Keep existing validation behavior: if no valid numeric value > 0 can be extracted, show the existing English validation error and prevent save/add.

**User-visible outcome:** In the Admin Panel, admins can type prices like “A50” or “MRP 299”; the product card shows the full text, and WhatsApp “Buy Now” continues to use only the numeric portion (and still rejects entries with no valid numeric price).
