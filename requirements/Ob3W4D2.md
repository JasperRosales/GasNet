# GasNet: An AI-Driven Decision Support and Point-of-Sale System for CJG LPG Trading

## Objective 3:  Supabase Integration

**Owner:** Rosales Jasper B.

**Week:** 4 | **Day:** 2

## Task: Addeding Supabase Service Integration

### Sub-Tasks (Breakdown)
- Develop CRUD Operation for each Table 
- Apply Proper Error Handling to each service with supabase
- Test all CRUD operations for services to ensure data integrity and seamless database communication.

### Deliverable(s)
- Modular Service Files: A set of clean, reusable service files (e.g., supabaseClient.js/ts and individual table services like inventoryService.js/ts) handling all database interactions
- Error Handling & Logging Middleware/Utility: Standardized try-catch blocks and error wrappers that catch Supabase-specific API errors (like connection timeouts, constraint violations, or missing permissions) and return user-friendly messages.
- Service Test Suite: A set of integration verifying successful Create, Read, Update, and Delete operations against a development or staging Supabase instance.

### Test Suite / PR Acceptance Criteria
- No Silent Failures: Every database query must have explicit error handling. Failed Supabase API calls must throw readable exceptions rather than failing silently or returning undefined.
- 100% CRUD Test Coverage: All core tables must successfully pass positive (e.g., successfully creating a record) and negative (e.g., attempting to delete a non-existent record) integration tests.
- Data Validation & Type Safety: Input data must be validated before hitting the Supabase client to prevent SQL injections or schema mismatch errors.

### Instructor Notes

_[Space reserved for instructor feedback]_
