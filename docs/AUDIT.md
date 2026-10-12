# BizBuddy source audit

Date: 2026-10-12. Identified at E:/Business-OS-Commercial/business-os by src/lib/brand.ts (PRODUCT.name = BizBuddy). Original commit: 62d6aafd9be713be576f010e2533928ac8bb6580. Original checkout inspected read-only; selected tests run in a private isolated source snapshot. No original Git history imported.

## Status definitions
VERIFIED = named local check passed, scoped to that check; IMPLEMENTED BUT UNVERIFIED = inspected source without corresponding runtime check; PARTIAL = only part of an end-to-end capability established; PLANNED = explicit future work; NOT FOUND = not established in inspected scope.

## Declared stack
package.json: Next.js ^16.3.5, React ^19.3.0, TypeScript ^6.0.3, @supabase/ssr ^0.12.7, @supabase/supabase-js ^2.117.2, postgres ^3.4.9, Tailwind ^4.3.3, Zod ^4.6.5. Local tests use @electric-sql/pglite ^0.5.8 and Vitest ^5.0.1. Versions above are declared ranges.

| Capability | Classification | Evidence and limits |
|---|---|---|
| Money, rounding, fractional sale quantities | VERIFIED | tests/money.test.ts and tests/sales-math.test.ts passed. src/lib/money.ts and sales-math.ts use integer minor units and BigInt arithmetic. |
| Sale cart behavior | VERIFIED | tests/sell-cart.test.ts passed. This is selected automated behavior, not manual POS acceptance. |
| Inventory | VERIFIED | tests/inventory.test.ts passed using local PGlite and synthetic fixtures. src/lib/inventory-services.ts. |
| Reports | VERIFIED | tests/reports.test.ts passed locally. src/lib/reports.ts includes daily, product and group summaries. No real-business reporting screenshot copied. |
| Tenant isolation | VERIFIED | tests/tenant-isolation.test.ts passed locally. Does not certify hosted account policy or every access path. |
| Next.js application | IMPLEMENTED BUT UNVERIFIED | package.json and src/app/: App Router source established; original production build not run in this audit. |
| Supabase authentication | IMPLEMENTED BUT UNVERIFIED | src/lib/auth/server.ts: createServerClient and Next cookies; identity bound per request. No real sign-in performed. |
| Supabase PostgreSQL driver | IMPLEMENTED BUT UNVERIFIED | src/lib/db/driver-postgres.ts uses postgres.js, transaction-scoped tenant context, prepare:false and role validation. Live staging tests not run. |
| Vercel integration/deployment | PARTIAL | vercel.json declares sin1 region. Configuration is established; deployment URL, account linkage and current health are not verified. |
| POS services and broader business workflows | IMPLEMENTED BUT UNVERIFIED beyond selected tests | src/lib/sell-*.ts, catalog-services.ts, stock-actions.ts, customer-services.ts, employee-services.ts, money-report.ts and operator/. Feature names/tests alone do not establish full functionality. |

## Existing tests and demos
tests/ has broad domain/database/security/UI-source suites. tests/staging/ has real Supabase tests for auth, concurrency, sell, stock and storage; they require staging credentials and were not executed. supabase/ contains database migrations. public/ and docs/ exist; sibling bizbuddy-branding and bizbuddy-ad include branding/media projects. Their commercial/private assets were not copied or claimed as public demonstration evidence.

## Verification
Command: node node_modules/vitest/vitest.mjs run --config audit.config.mjs in private-audit/bizbuddy. Selected suites: sales-math, money, sell-cart, inventory, reports, tenant-isolation. Result: 6 files, 133 tests passed. The snapshot contains only source, tests, migrations and package metadata; no environment files, real databases or original Git history. Installed dependencies are used through a local junction. PGlite uses in-process test data. No real Supabase, payments or live business data were accessed.

## Public demonstration
Independently authored, browser-memory POS: add a product, sell one unit, reduce stock, reconcile integer-centavo revenue, display synthetic receipts and reset. Excludes tax, discounts, refunds, multi-tenant auth, concurrent checkouts, persistence and payments. This is an isolated sample implementation, not the original application or a production deployment.

## Additional inspected AI integration
Ask your shop has a server-side OpenRouter adapter in src/lib/ask-shop/model.ts, with environment-selected paid model and provider data_collection denial configuration. The service in ask.ts has tenant-scoped facts, role/feature/plan and usage-limit boundaries. Classification: IMPLEMENTED BUT UNVERIFIED. No live request made; source comments do not verify actual provider data retention.

