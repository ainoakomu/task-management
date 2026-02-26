# Project Plan

## Sprint 1 – Project Setup & Testing Infrastructure


### Objectives
- Establish project structure and testing foundation

### Work completed
- Node.js + Express project initialized
- Jest configured for unit testing
- npm scripts for test execution
- Initial test executed to verify environment

### Definition of Done
- Project runs locally
- Tests executable with a single command
- Repository structure established

---

## Sprint 2 – Domain Logic & Unit Testing


### Objectives
- Implement core business logic
- Apply TDD at the service level

### Work completed
- Task validation logic (e.g. required title)
- Domain-specific error types (ValidationError, NotFoundError)
- In-memory TaskRepository implementation
- TaskService implemented primarily using TDD
- Unit tests covering normal and error paths

### Notes
Repository implementation was partially scaffolded before tests; this deviation from strict TDD is documented and justified.

### Definition of Done
- Unit tests cover core logic and failure cases
- All unit tests pass locally

---

## Sprint 3 – REST API & Integration Testing

### Objectives
- Expose application functionality via HTTP
- Validate behavior through integration tests

### Development
Implement REST endpoints:
- `POST /tasks`
- `GET /tasks`
- `GET /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

Additional work:
- Centralized error-handling middleware
- Mapping of domain errors to appropriate HTTP status codes

### Testing
Integration tests using Supertest:
- happy paths for all endpoints
- representative error cases (invalid input, unknown id)
- Existing unit tests remain green

### GitHub Issues
- GitHub Issues used only for bugs discovered through testing
- Issues labeled by:
  - test level (unit / integration)
  - sprint (sprint-3)
- Issues serve as a source of empirical testing data

### Documentation
Update testausstrategia.md:
- unit vs integration testing
- tool choices and rationale

### Definition of Done
- All endpoints functional
- Integration tests passing
- Test-discovered bugs documented as Issues

---

## Sprint 4 – Minimal UI & End-to-End Flow

### Objectives
- Provide a working user interface
- Enable full end-to-end system usage

### UI Scope (intentionally limited)
Static frontend served by Express (`public/`)

Features:
- display task list
- add new task
- update task status or title
- delete task

### Development
- index.html, app.js, optional style.css
- UI communicates with backend via Fetch API
- No frontend framework to keep scope manageable

### Testing
- Backend integration tests continue to run
- UI validated via manual smoke-test checklist:
  - Create → List → Update → Delete
  - Optional single automated E2E test if time permits

### GitHub Issues
UI-related bugs reported as Issues

Issues labeled with:
- ui
- bug
- sprint-4

### Documentation
- Update scope description to include UI testing
- Explicitly document UI testing limitations

### Definition of Done
- Application usable via browser
- All CRUD operations functional through UI
- Backend tests remain green

---

## Sprint 5 – Automation, Code Review & Final Documentation

### Objectives
- Finalize automation
- Perform structured code review
- Collect and analyze testing data
- Prepare final submission

### Automation
GitHub Actions configured to:
- install dependencies
- run unit and integration tests on each push

### Code Review
Code reviewed using a structured checklist covering:
- architecture and separation of concerns
- test quality and coverage
- TDD adherence
- API design
- UI-backend interaction
- Findings documented in project documentation

### Metrics & Data Collection
GitHub Issues used to extract:
- number of defects per sprint
- defect discovery by test level
- defect resolution time
- Results summarized in final report

### Documentation
Finalize:
- testausstrategia.md
- reflektio.md
- README

Reflect on:
- effectiveness of TDD
- value of integration and UI testing
- lessons learned

### Definition of Done
- CI pipeline green
- Code review completed and documented
- Documentation complete
- Project ready for evaluation 

 