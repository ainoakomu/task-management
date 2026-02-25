# Task Management Service API

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-21+-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2+-blue?logo=express)](https://expressjs.com/)
[![Jest](https://img.shields.io/badge/Jest-30+-red?logo=jest)](https://jestjs.io/)
[![ESLint](https://img.shields.io/badge/ESLint-10+-purple?logo=eslint)](https://eslint.org/)

A task management API demonstrating **Test-Driven Development (TDD)**

</div>

---

## Overview

This project showcases professional software engineering practices by building a complete task management REST API using test-driven development from the ground up. It demonstrates:

-  **Test-Driven Development**: Red-Green-Refactor cycle with 100% test coverage intent
-  **Clean Architecture**: Layered design with clear separation of concerns
-  **Comprehensive Testing**: Unit, integration, and mutation testing
-  **Code Quality**: ESLint, static analysis, and continuous integration
-  **Best Practices**: Error handling, validation

---

##  Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Runtime** | Node.js | 21+ |
| **Framework** | Express.js | 5.2.1 |
| **Language** | JavaScript (CommonJS) | ES2020+ |
| **Testing** | Jest | 30.2.0 |
| **Integration Tests** | Supertest | 7.2.2 |
| **Mutation Testing** | Stryker | 9.5.1 |
| **Linting** | ESLint | 10.0.0 |
| **CI/CD** | GitHub Actions | - |

### Running the Server

```bash
# Start development server
npm start

# Server will run on http://localhost:3000
```

Verify with health check:
```bash
curl http://localhost:3000/health
# Response: {"status":"ok"}
```

---

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Check code style (ESLint)
npm run lint

# Run mutation testing
npm run mutation
```

### Test Coverage

The project aims for comprehensive test coverage across all layers:
- **Domain Layer**: Validation rules, error handling
- **Service Layer**: Business logic, error propagation
- **Repository Layer**: CRUD operations
- **API Layer**: HTTP status codes, response formats

---

##  Architecture

The project follows a **4-layer architecture** for clean code organization:

```
┌──────────────────────────────────┐
│    REST API Layer (Express)      │  HTTP routes, middleware, responses
├──────────────────────────────────┤
│    Service Layer                 │  Business logic, validation
├──────────────────────────────────┤
│    Repository Layer              │  Data access, persistence
├──────────────────────────────────┤
│    Domain Layer                  │  Business rules, errors
└──────────────────────────────────┘
```

### Directory Structure

```
task-management/
├── src/                           # Source code
│   ├── app.js                    # Express configuration & routes
│   ├── server.js                 # Server startup
│   └── tasks/
│       ├── taskService.js        # Business logic
│       ├── taskRepo.js           # Repository interface
│       ├── taskRepo.memory.js    # In-memory implementation
│       └── errors.js             # Custom error classes
├── tests/                         # Automated tests
│   ├── unit/                     # Isolated unit tests
│   └── integration/              # End-to-end API tests
├── public/                        # Static assets
│   ├── index.html                # UI
│   └── ui.js                     # Client-side code
├── docs/                          # Documentation
│   ├── 00-overview.md            # Project overview
│   ├── 01-testaustrategia.md     # Testing strategy
│   ├── 02-mittarit-ja-data.md    # Metrics & data
│   ├── 03-sprinttiloki.md        # Sprint logs
│   ├── 04-tyo-ja-tulokset.md     # Work & results
│   ├── 05-reflektio.md           # Reflections
│   └── 06-osaamistavoitteet-matriisi.md # Skills matrix
├── coverage/                      # Test coverage reports
└── reports/                       # Analysis reports
```

---
### Test-Driven Development (TDD)

The project uses the Red-Green-Refactor cycle:

1. **Red**: Write a failing test
2. **Green**: Write minimal code to pass the test
3. **Refactor**: Improve code while keeping tests green


## Quality Assurance

- **Unit Tests**: Jest with >80% coverage target
- **Integration Tests**: Supertest for API validation
- **Mutation Testing**: Stryker ensures test quality
- **Static Analysis**: ESLint for code consistency
- **CI/CD**: Automated testing on every commit

---

<div align="center">

</div>