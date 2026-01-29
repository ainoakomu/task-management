# Task Service API

A minimal Node.js backend project built using **Test-Driven Development (TDD)**.  
The goal of the project is to demonstrate clean architecture, automated testing, and separation of concerns using Express and Jest.

---

## Tech Stack

- Node.js
- Express
- Jest
- npm

---

## Project Structure

```text
src/
├─ app.js        # Express app (routes & middleware)
├─ server.js     # Server startup
└─ tasks/
   ├─ taskService.js # Domain logic & validation
   └─ errors.js      # Custom domain errors

tests/
├─ unit/
└─ integration/


## Key Concepts

Test-Driven Development (TDD): tests written before implementation

Unit & integration testing with Jest

Separation of concerns (app vs server vs domain)

Domain validation using custom error classes

## Scripts

npm start        # Start server
npm test         # Run all tests
npm run test:unit
npm run test:integration

##Running the Project
npm install
npm start


##Server runs on:

http://localhost:3000


##Health check:

GET /health