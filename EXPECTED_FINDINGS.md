# Expected Findings

Verified by running Shimpilot's real scanner against this repository.
Not hand-written predictions — this is actual observed output.

**Detected SDK version:** `9.16.0` (coerced from `^9.16.0` in package.json)
**Total findings:** 15

| Applicability | Symbol | Location |
| --- | --- | --- |
| ACTIVE | `charges.create` | `src/billing/checkout.ts:9` |
| ACTIVE | `charges.capture` | `src/billing/checkout.ts:14` |
| UPCOMING | `paymentIntents.create` | `src/billing/checkout.ts:19` |
| UPCOMING | `paymentIntents.confirm` | `src/billing/checkout.ts:24` |
| UPCOMING | `checkout.sessions.create` | `src/billing/checkout.ts:29` |
| ACTIVE | `subscriptions.create` | `src/billing/subscriptions.ts:11` |
| ACTIVE | `subscriptions.update` | `src/billing/subscriptions.ts:19` |
| UPCOMING | `customers.update` | `src/billing/subscriptions.ts:26` |
| UPCOMING | `customers.createSource` | `src/billing/subscriptions.ts:31` |
| UPCOMING | `orders.create` | `src/orders/legacy.ts:9` |
| UPCOMING | `invoices.pay` | `src/orders/legacy.ts:14` |
| ACTIVE | `balance.retrieve` | `src/orders/legacy.ts:19` |
| UPCOMING | `refunds.create` | `src/orders/legacy.ts:24` |
| UPCOMING | `terminal.readers.processPaymentIntent` | `src/orders/legacy.ts:29` |
| ACTIVE | `webhooks.constructEvent` | `src/webhooks/handler.ts:9` |

**ACTIVE** = already deprecated/removed on 9.16.0.
**UPCOMING** = still fine on 9.16.0, breaks on upgrade.

## Negative controls — MUST report zero findings

`src/shared/no-findings.ts` must produce **no** findings. It contains:

- `charges.list`, `customers.list`, `prices.list` — real calls, not in the registry
- `stripe.charges.create` inside a **string literal** and in a **comment**

If any finding is reported from this file, the scanner has regressed to
text matching. This is the single most important assertion in the fixture.

## What this fixture proves

| Capability | How |
| --- | --- |
| Version detection from a caret range | `^9.16.0` → `9.16.0` |
| ESM default import | `src/billing/checkout.ts` |
| CommonJS `require()` | `src/orders/legacy.ts` |
| Non-`stripe` variable name | `const client` / `const gateway` |
| Deep property chains | `terminal.readers.processPaymentIntent` |
| ACTIVE vs UPCOMING classification | Mixed throughout |
| No false positives from strings/comments | `src/shared/no-findings.ts` |
