# MySocialBoard - Agent Execution Plan

## 1. Purpose
Build MySocialBoard as a multi-tenant social data platform that:
1. Connects user-owned social accounts via OAuth.
2. Ingests and stores data encrypted at rest.
3. Serves data through secure iframe embeds and a paid API.
4. Supports freemium monetization and provider-agnostic expansion.

Primary stack target:
1. Laravel backend.
2. Blade + React frontend.
3. Neon Postgres.
4. Cloudflare edge (CDN, Workers, Durable Objects).

Non-negotiable security requirement:
1. Encryption in transit and at rest for all sensitive data.

## 2. Agent Operating Rules

### 2.1 Execution loop (mandatory)
For every task:
1. Implement the smallest vertical slice.
2. Run related tests.
3. Only proceed when tests are green.
4. Update task status and evidence.
5. Move to next task.

### 2.2 Task sizing rule
1. A task should be completable in one focused implementation session.
2. If a task touches multiple bounded contexts, split it.

### 2.3 Test gate rule
1. No feature is considered done without test evidence.
2. If tests are missing, create tests first or in the same task.

## 3. Delivery Phases

## Phase A - Foundation and Security Baseline
Goal:
1. Establish secure multi-tenant core and baseline project architecture.

Tasks:
1. A1 - Create multi-tenant core schema
Instruction:
1. Create base tables for tenant, user, provider_account, oauth_consent, provider_token, audit_event.
Tests (green required):
1. Migration tests pass.
2. Tenant isolation constraints validated.
Done when:
1. Schema is migrated successfully.
2. All base relations and indexes are present.

2. A2 - Implement encryption primitives
Instruction:
1. Implement envelope encryption service (DEK/KEK abstraction).
2. Add encrypted column strategy for sensitive fields.
Tests (green required):
1. Encryption/decryption deterministic tests for valid keys.
2. Failure tests for invalid key versions.
Done when:
1. Sensitive fields cannot be persisted/read without crypto service.

3. A3 - Define secrets and config policy
Instruction:
1. Implement strict configuration contracts for environments.
2. Add startup validation for required secrets.
Tests (green required):
1. Missing secret test fails fast.
2. Valid config boot test passes.
Done when:
1. App boot blocks invalid secure config.

Dependencies:
1. A1 before A2.
2. A2 before A3.

## Phase B - Provider-Agnostic OAuth Core
Goal:
1. Deliver secure OAuth by provider with strict state validation.

Tasks:
1. B1 - Implement provider-agnostic authorize start endpoint
Routes:
1. GET /{provider}/authorize/start
Instruction:
1. Generate cryptographically strong state.
2. Persist state securely with short TTL.
3. Redirect to provider authorization URL.
Tests (green required):
1. State generated and persisted.
2. Redirect contains expected params.
Done when:
1. Start route works for Instagram provider adapter.

2. B2 - Implement provider-agnostic callback endpoint
Routes:
1. GET /{provider}/authorize/callback
Instruction:
1. Validate state strictly.
2. Exchange code for short token, then long token if provider supports.
3. Persist consent and token metadata per tenant account.
Tests (green required):
1. State mismatch returns unauthorized.
2. Successful callback persists expected records.
3. Token exchange error path is handled safely.
Done when:
1. Callback is secure and idempotent.

3. B3 - Implement authorization status and revoke
Routes:
1. GET /{provider}/authorize/status
2. POST /{provider}/authorize/revoke
Instruction:
1. Expose current connection status.
2. Revoke local credentials and mark integration state.
Tests (green required):
1. Status reflects token and consent state.
2. Revoke transitions to revoked/degraded state.
Done when:
1. Users can inspect and revoke provider connection.

Dependencies:
1. A3 before B1.
2. B1 before B2.
3. B2 before B3.

## Phase C - Ingestion and Normalized Data Model
Goal:
1. Ingest provider data reliably into encrypted, queryable structures.

Tasks:
1. C1 - Build provider ingestion adapter contract
Instruction:
1. Define interfaces: auth, token refresh, media fetch, pagination.
2. Implement Instagram adapter first.
Tests (green required):
1. Contract conformance tests.
2. Adapter pagination behavior tests.
Done when:
1. Provider adapter can fetch all pages within limits.

2. C2 - Implement ingestion jobs and job tracking
Routes:
1. POST /{provider}/ingestion/run
2. GET /{provider}/ingestion/jobs
3. GET /{provider}/ingestion/jobs/{jobId}
Instruction:
1. Add job queue workflow with retry/backoff.
2. Track job state and failure reasons.
Tests (green required):
1. Successful ingestion job path.
2. Retry path and terminal failure path.
Done when:
1. Ingestion job states are observable and reliable.

3. C3 - Build normalized read model for media
Instruction:
1. Persist canonical media_item and media_metric_snapshot records.
2. Keep encrypted raw payload snapshot for audit.
Tests (green required):
1. Mapping correctness from provider payload to normalized schema.
2. Read model query performance baseline tests.
Done when:
1. Dashboard/API can read normalized data without raw payload processing.

Dependencies:
1. B2 before C1.
2. C1 before C2.
3. C2 before C3.

## Phase D - Embed Platform (iframe)
Goal:
1. Deliver secure, customizable embeds with low latency.

Tasks:
1. D1 - Implement embed widget lifecycle
Routes:
1. POST /embeds
2. GET /embeds/{embedId}
3. PATCH /embeds/{embedId}
4. DELETE /embeds/{embedId}
Instruction:
1. Create widget configuration model.
2. Bind widget to tenant and source accounts.
Tests (green required):
1. CRUD tests for embed widgets.
2. Tenant isolation tests.
Done when:
1. Widget lifecycle works with access controls.

2. D2 - Implement iframe runtime endpoint
Routes:
1. GET /embed/{embedId}
Instruction:
1. Serve isolated iframe payload.
2. Apply strict CSP and sandbox policy.
Tests (green required):
1. Response headers security tests.
2. Render data correctness tests.
Done when:
1. Widget renders safely in third-party sites.

3. D3 - Implement embed token issuance
Routes:
1. POST /embeds/{embedId}/token
Instruction:
1. Generate short-lived signed embed tokens bound to origin + tenant + widget.
2. Validate token at runtime.
Tests (green required):
1. Valid token accepted.
2. Expired/forged token rejected.
3. Origin mismatch rejected.
Done when:
1. Embed access is cryptographically scoped.

Dependencies:
1. C3 before D1.
2. D1 before D2.
3. D2 before D3.

## Phase E - Public API and Client Credentials
Goal:
1. Provide paid API access with secure credentials and quota enforcement.

Tasks:
1. E1 - Implement developer clients and secret rotation
Routes:
1. POST /developer/clients
2. GET /developer/clients
3. GET /developer/clients/{clientId}
4. POST /developer/clients/{clientId}/secret/rotate
5. POST /developer/clients/{clientId}/secret/revoke
Instruction:
1. Add dual-secret overlap strategy.
2. Add audit logs for rotation events.
Tests (green required):
1. Rotation overlap works.
2. Old secret revocation enforced.
Done when:
1. Secret rotation is zero-downtime.

2. E2 - Implement OAuth-style token endpoint for API consumers
Routes:
1. POST /oauth/token
2. POST /oauth/token/refresh
3. POST /oauth/token/revoke
Instruction:
1. Issue short-lived access tokens.
2. Support token refresh/revoke with audit events.
Tests (green required):
1. Token issue/refresh/revoke flows pass.
2. Unauthorized client blocked.
Done when:
1. Consumers can access API with rotating credentials.

3. E3 - Implement versioned public data endpoints
Routes:
1. GET /v1/providers/{provider}/accounts/{accountId}/media
2. GET /v1/providers/{provider}/accounts/{accountId}/media/{mediaId}
3. GET /v1/providers/{provider}/accounts/{accountId}/metrics
4. GET /v1/usage
Instruction:
1. Serve read model data with tenant/client authorization.
2. Add pagination, filtering, and usage reporting.
Tests (green required):
1. Authz tests per tenant/client.
2. Pagination and filtering contract tests.
Done when:
1. Public API is consumable and measurable.

Dependencies:
1. D3 before E1.
2. E1 before E2.
3. E2 before E3.

## Phase F - Billing, Quotas, and Edge Controls
Goal:
1. Enforce freemium/premium plans technically and commercially.

Tasks:
1. F1 - Implement plan and subscription model
Routes:
1. GET /plans
2. GET /subscription
3. POST /subscription/upgrade
4. POST /subscription/downgrade
5. GET /subscription/usage
Tests (green required):
1. Plan transitions validated.
2. Usage counters mapped to plan limits.
Done when:
1. Subscription state controls feature access.

2. F2 - Implement quota enforcement and rate limiting
Instruction:
1. Enforce quotas in app core and Cloudflare edge.
2. Use Durable Objects for near-real-time counters.
Tests (green required):
1. Over-quota requests blocked.
2. Counter consistency tests pass.
Done when:
1. Limits are deterministic and auditable.

Dependencies:
1. E3 before F1.
2. F1 before F2.

## Phase G - Compliance and Operational Excellence
Goal:
1. Finalize privacy workflows and production-grade operations.

Tasks:
1. G1 - Implement privacy endpoints
Routes:
1. POST /privacy/data-deletion
2. POST /privacy/data-export
3. POST /privacy/deauthorize
Tests (green required):
1. Data deletion flow test.
2. Export flow test.
3. Deauthorize flow test.
Done when:
1. Privacy lifecycle is complete and auditable.

2. G2 - Implement observability and runbooks
Instruction:
1. Add trace IDs, audit events, error taxonomy, dashboards, alerts.
2. Write operational runbooks for token failures, rate limits, key rotation incidents.
Tests (green required):
1. Telemetry presence tests.
2. Synthetic alert tests.
Done when:
1. Incident response is documented and testable.

Dependencies:
1. F2 before G1.
2. G1 before G2.

## 4. Test Strategy

### 4.1 Required test layers
1. Unit tests: crypto, token lifecycle, policy rules.
2. Integration tests: OAuth callback, ingestion adapters, embed token validation.
3. API contract tests: public endpoints and error envelopes.
4. End-to-end smoke tests: connect account -> ingest -> embed render -> API read.

### 4.2 Green criteria per feature
A feature moves forward only when:
1. Related unit and integration tests pass.
2. No critical lint/type errors.
3. Security checks for affected path are satisfied.

## 5. Definition of Done (Global)
1. Functional behavior implemented.
2. Tests green for affected scope.
3. Security constraints validated.
4. Monitoring hooks added where relevant.
5. Documentation updated.

## 6. Suggested Execution Order (Implementation -> Green -> Next)
1. Finish Phase A tasks in order.
2. For each B-G task:
   - implement minimal slice
   - run tests
   - confirm green
   - update task status
   - start next task

## 7. Success Metrics
1. OAuth success rate >= 99%.
2. Token refresh failure rate < 1% daily.
3. Embed P95 <= 300ms on cache hit.
4. API P95 <= 500ms on cache hit.
5. Data isolation incidents = 0.
6. Credential rotation downtime = 0.

## 8. Immediate Next Tasks (Ready for Agent)
1. A1 - Create multi-tenant core schema.
2. A2 - Implement envelope encryption service.
3. A3 - Add secure config bootstrap validation.

Execution policy for next tasks:
1. Complete A1 -> run migration tests -> green.
2. Complete A2 -> run crypto tests -> green.
3. Complete A3 -> run bootstrap/config tests -> green.
4. Move to Phase B only after all A tasks are green.
