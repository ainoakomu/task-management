# Task Management Service - Project Overview

## Project Purpose

This project demonstrates **Test-Driven Development (TDD)** practices by implementing a minimal but fully-featured task management API. The goal is to showcase clean architecture, separation of concerns, and quality assurance through comprehensive automated testing.

**Author**: Aino Komulainen  
**License**: ISC  
**Repository Type**: CommonJS (Node.js)

---

## Technology Stack

### Core Technologies
- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Language**: JavaScript (CommonJS)

### Testing & Quality Assurance
- **Unit Testing**: Jest (v30.2.0)
- **Integration Testing**: Supertest (v7.2.2)
- **Mutation Testing**: Stryker (v9.5.1)
- **Linting**: ESLint (v10.0.0)
- **CI/CD**: GitHub Actions

---

## Architecture & Layers

The project follows a **layered architecture** pattern for clean code organization:

```
┌─────────────────────────────────────┐
│      REST API Layer (Express)       │ Routes, HTTP handlers, middleware
├─────────────────────────────────────┤
│      Service Layer                  │ Business logic, validation, error handling
├─────────────────────────────────────┤
│      Repository Layer               │ Data access, CRUD operations
├─────────────────────────────────────┤
│      Domain Layer                   │ Custom errors, validation rules
└─────────────────────────────────────┘
```

### Layer Responsibilities

**Domain Layer** (`src/tasks/errors.js`)
- Custom error classes: `ValidationError`, `NotFoundError`
- Validation rules for tasks (title, status)
- Business rule enforcement

**Repository Layer** (`src/tasks/taskRepo.js`)
- In-memory task storage
- CRUD operations: create, read, update, delete
- Contract definitions for data access
- Returns task objects or null/boolean values

**Service Layer** (`src/tasks/taskService.js`)
- Business logic implementation
- Input validation before operations
- Dependency injection of repository
- Error handling and propagation

**REST API Layer** (`src/app.js`)
- Express configuration and middleware
- Route definitions (GET, POST, PATCH, DELETE)
- HTTP status code mapping
- Error response formatting

---

## Core Features

### Task Management Operations

| Operation | Endpoint | HTTP Method | Status Code |
|-----------|----------|-------------|------------|
| Create Task | `/tasks` | `POST` | 201 |
| List All Tasks | `/tasks` | `GET` | 200 |
| Get Single Task | `/tasks/:id` | `GET` | 200 |
| Update Task | `/tasks/:id` | `PATCH` | 200 |
| Delete Task | `/tasks/:id` | `DELETE` | 204 |
| Health Check | `/health` | `GET` | 200 |

### Task Validation Rules

- **Title**: Required, must be non-empty string
- **Status**: Optional, allowed values: `"todo"`, `"in_progress"`, `"done"`

### Error Handling

- `ValidationError` (400) - Invalid input data
- `NotFoundError` (404) - Task not found
- Generic errors (500) - Unexpected server errors

---

## Testing Strategy

### Multi-Level Testing Approach

**1. Unit Tests** (Domain & Service Layers)
- Test individual functions and methods
- `validateTask()` - title and status validation
- Service methods - business logic correctness
- Error scenarios - proper exception throwing
- Located in `tests/unit/`

**2. Integration Tests** (REST API)
- Test complete request/response cycles
- HTTP status codes correctness
- JSON response validation
- Error response formats
- Located in `tests/integration/`

**3. Static Analysis** (Code Quality)
- ESLint for syntax and style consistency
- 0 linting errors policy

**4. Mutation Testing** (Test Quality)
- Stryker identifies weaknesses in test coverage
- Ensures tests actually validate behavior

### Test Execution Commands

```bash
npm test                      # Run all tests (unit + integration)
npm run test:unit            # Run only unit tests
npm run test:integration     # Run only integration tests
npm run test:watch           # Watch mode for development
npm run lint                 # Check code style
npm run mutation             # Run mutation testing
```

---

## Project Structure

```
task-management/
├── src/                          # Source code
│   ├── app.js                   # Express app configuration & routes
│   ├── server.js                # Server startup
│   └── tasks/
│       ├── taskService.js       # Business logic
│       ├── taskRepo.js          # Repository interface & in-memory impl
│       ├── taskRepo.memory.js   # Alternative memory repository
│       └── errors.js            # Custom error classes
│
├── tests/                       # Automated tests
│   ├── unit/                   # Unit tests
│   │   ├── taskService.test.js
│   │   ├── taskRepo.memory.test.js
│   │   ├── taskValidation.test.js
│   │   └── taskStatus.test.js
│   └── integration/            # Integration tests
│       ├── taskApi.test.js
│       └── smoke.test.js
│
├── docs/                        # Documentation
│   ├── 00-overview.md          # This file
│   ├── 01-testaustrategia.md   # Testing strategy
│   ├── 02-mittarit-ja-data.md  # Metrics and data
│   ├── 03-sprinttiloki.md      # Sprint logs
│   ├── 04-tyo-ja-tulokset.md   # Work & results
│   ├── 05-reflektio.md         # Reflections
│   ├── 06-suunnitelma.md       # Sprint planning
│   └── 07-code-review-checklist.md # Code review criteria
│
├── public/                      # Static files
│   ├── index.html              # UI
│   └── ui.js                   # Client-side logic
│
├── coverage/                    # Test coverage reports
│   └── lcov-report/            # HTML coverage visualization
│
├── reports/                     # Analysis reports
│   └── mutation/               # Mutation testing results
│
├── package.json                # Dependencies & scripts
├── eslint.config.cjs           # ESLint configuration
├── stryker.config.json         # Mutation testing config
└── README.md                   # Quick start guide
```

---

## Getting Started

### Installation
```bash
npm install
```

### Running the Server
```bash
npm start
# Server starts at http://localhost:3000
```

### Running Tests
```bash
npm test           # All tests
npm run test:watch # Watch mode
```

### Code Quality
```bash
npm run lint       # Check ESLint
npm run mutation   # Mutation testing
```

---

## Key Development Practices

### Test-Driven Development (TDD)
- **Red**: Write failing test
- **Green**: Implement minimal code to pass
- **Refactor**: Improve code while keeping tests green

### Separation of Concerns
- Each layer has specific responsibilities
- Changes in one layer don't affect others
- Easy to test in isolation

### Dependency Injection
- Service receives Repository as dependency
- Makes testing with mocks easy
- Increases code flexibility

### Error Handling
- Custom error classes for different scenarios
- Proper HTTP status code mapping
- Clear error messages for clients

### Continuous Integration
- GitHub Actions pipeline
- Automated testing on every push
- Code quality gates before merge

---

## Documentation Map

| Document | Purpose |
|----------|---------|
| [00-overview.md](00-overview.md) | This comprehensive project overview |
| [01-testaustrategia.md](01-testaustrategia.md) | Detailed testing strategy and test organization |
| [02-mittarit-ja-data.md](02-mittarit-ja-data.md) | Metrics, coverage data, and quality measurements |
| [03-sprinttiloki.md](03-sprinttiloki.md) | Sprint progress logs and timeline |
| [04-tyo-ja-tulokset.md](04-tyo-ja-tulokset.md) | Implementation details and results |
| [05-reflektio.md](05-reflektio.md) | Project reflections and lessons learned |
| [06-suunnitelma.md](06-suunnitelma.md) | Sprint planning and project roadmap |
| [07-code-review-checklist.md](07-code-review-checklist.md) | Code review criteria and quality checklist |

---

## Project Goals

1. **Demonstrate TDD**: Show practical test-first development
2. **Clean Architecture**: Implement layered, maintainable code structure
3. **Quality Assurance**: Use multiple testing approaches (unit, integration, mutation)
4. **Best Practices**: Implement error handling, validation, dependency injection
5. **CI/CD**: Automated testing and code quality gates
6. **Documentation**: Comprehensive documentation of strategy and results

---

## Success Criteria

- All tests passing (unit + integration)
- Zero linting errors
- High mutation test score (quality tests)
- Complete API implementation
- Proper error handling
- Clear code organization and documentation