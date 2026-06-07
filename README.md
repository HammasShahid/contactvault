# ContactVault

A full-stack contact management system built with Spring Boot and React.

---

## Tech Stack

**Backend**

- Java 17, Spring Boot
- Spring Security with JWT authentication
- Spring Data JPA + Flyway migrations
- MySQL
- MapStruct, Lombok
- JUnit 5, Mockito
- SonarQube

**Frontend**

- React 18, TypeScript, Vite
- TanStack Router + TanStack Query
- Axios, Zustand
- React Hook Form + Zod
- shadcn/ui, Tailwind CSS
- SonarQube

---

## Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8+
- Maven
- A running SonarQube instance (optional, for code analysis)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/HammasShahid/contactvault.git
cd contactvault
```

### 2. Backend Setup

#### Configure the database

Create a MySQL database (or let Flyway create it automatically):

```sql
CREATE DATABASE contactvault;
```

#### Configure environment

Edit `src/main/resources/application-dev.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/contactvault?createDatabaseIfNotExist=true
    username: your_mysql_username
    password: your_mysql_password
frontEndUrl: http://localhost:3000
```

#### Run the backend

```bash
./mvnw spring-boot:run
```

The backend starts on **http://localhost:8080**

Flyway will automatically create all required tables on first run.

---

### 3. Frontend Setup

#### Configure environment

Create a `.env.local` file in the frontend root (this file is git-ignored):

```env
VITE_API_BASE_URL=http://localhost:8080
```

#### Install dependencies

```bash
cd contactvault-frontend
npm install
```

#### Run the frontend

```bash
npm run dev
```

The frontend starts on **http://localhost:3000**

---

## Ports

| Service   | Port |
| --------- | ---- |
| Backend   | 8080 |
| Frontend  | 3000 |
| MySQL     | 3306 |
| SonarQube | 9000 |

---

## API Base URL

All API endpoints are prefixed with `/api/v1`.

| Method | Endpoint                       | Description            | Auth     |
| ------ | ------------------------------ | ---------------------- | -------- |
| POST   | `/api/v1/auth/register`        | Register a new user    | Public   |
| POST   | `/api/v1/auth/login`           | Login                  | Public   |
| GET    | `/api/v1/auth/me`              | Get current user       | Required |
| POST   | `/api/v1/auth/change-password` | Change password        | Required |
| GET    | `/api/v1/contacts`             | Get paginated contacts | Required |
| POST   | `/api/v1/contacts`             | Create a contact       | Required |
| GET    | `/api/v1/contacts/{id}`        | Get contact by ID      | Required |
| PUT    | `/api/v1/contacts/{id}`        | Update a contact       | Required |
| DELETE | `/api/v1/contacts/{id}`        | Delete a contact       | Required |

---

## Running Tests

```bash
# Backend
./mvnw test

# Backend with coverage report
./mvnw clean verify
```

Coverage report is generated at `target/site/jacoco/index.html`.

---

## SonarQube Analysis

Make sure SonarQube is running on **http://localhost:9000**.

- Make sure mvn cli is installed.
- Run the following command at the root of repo.

```bash
  mvn -f backend/pom.xml clean verify sonar:sonar \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=your_sonar_token \
  -Dsonar.projectBaseDir=.
```

---

## Project Structure

```
contactvault/                   ← Spring Boot backend
├── src/main/java/
│   └── com/hammasshahid/contactvault/
│       ├── auth/               ← Authentication (JWT, Spring Security)
│       ├── contact/            ← Contact CRUD
│       ├── user/               ← User entity and repository
│       └── common/             ← Global exception handling
├── src/main/resources/
│   ├── application.yml
│   ├── application-dev.yml
│   └── db/migration/           ← Flyway SQL migrations
└── src/test/                   ← JUnit + Mockito tests

contactvault-frontend/          ← React frontend
├── src/
│   ├── api/                    ← Axios API functions
│   ├── components/             ← UI components
│   ├── hooks/                  ← TanStack Query hooks
│   ├── lib/                    ← Axios client, query keys, Zod schemas
│   ├── routes/                 ← TanStack Router file-based routes
│   ├── store/                  ← Zustand auth store
│   └── types/                  ← TypeScript interfaces
```

---

## Git Branching

- `main` — stable, production-ready code
- `dev` — active development branch

All features are developed on `dev` and merged into `main` via pull requests.
