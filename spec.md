# Technical Specification (SPEC)
## Finance Data Processing and Access Control Backend

## 1. System Architecture
The backend will follow a layered architecture:

Controller Layer → Service Layer → Repository/Data Layer → Database

### Layers Description
- Controller: Handles HTTP requests and responses
- Service: Contains business logic
- Repository: Handles database operations
- Database: Stores users and financial records

---

## 2. Technology Stack (Example)
You can choose any stack, example:

- Backend: Node.js + Express / Java Spring Boot
- Database: PostgreSQL / SQLite
- Authentication: JWT / Mock Authentication
- API Testing: Postman
- Documentation: README.md

---

## 3. Database Design

### Users Table
| Field | Type |
|------|------|
| id | UUID |
| name | String |
| email | String |
| password | String |
| role | String |
| status | Active/Inactive |
| created_at | Timestamp |

### Financial Records Table
| Field | Type |
|------|------|
| id | UUID |
| amount | Decimal |
| type | Income/Expense |
| category | String |
| date | Date |
| notes | String |
| created_by | User ID |
| created_at | Timestamp |

---

## 4. API Design

### User APIs
| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | /users | Create user |
| GET | /users | Get all users |
| PUT | /users/{id} | Update user |
| PATCH | /users/{id}/status | Activate/Deactivate user |
| POST | /users/{id}/role | Assign role |

### Financial Records APIs
| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | /records | Create record |
| GET | /records | Get all records |
| GET | /records/{id} | Get record |
| PUT | /records/{id} | Update record |
| DELETE | /records/{id} | Delete record |

Filtering Example:
GET /records?type=expense&category=food&startDate=2025-01-01&endDate=2025-01-31

---

## 5. Dashboard APIs
| Endpoint | Description |
|---------|-------------|
| GET /dashboard/summary | Income, Expense, Balance |
| GET /dashboard/category-summary | Category totals |
| GET /dashboard/monthly-summary | Monthly totals |
| GET /dashboard/recent | Recent transactions |

---

## 6. Access Control Rules

| Role | View Records | Create | Update | Delete | Dashboard | Manage Users |
|------|-------------|-------|--------|--------|-----------|-------------|
| Viewer | Yes | No | No | No | Yes | No |
| Analyst | Yes | No | No | No | Yes | No |
| Admin | Yes | Yes | Yes | Yes | Yes | Yes |

Access control will be implemented using:
- Middleware
- Role checking
- Token-based authentication

---

## 7. Validation Rules

### User Validation
- Email must be valid
- Password minimum 6 characters
- Role must be Viewer / Analyst / Admin

### Financial Record Validation
- Amount must be positive
- Type must be income or expense
- Date must be valid
- Category cannot be empty

---

## 8. Error Handling Format
Example error response:

{
  "error": "Invalid input",
  "message": "Amount must be greater than 0"
}

HTTP Status Codes:
- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 500 Internal Server Error

---

## 9. Project Folder Structure
finance-backend/
│
├── controllers/
├── services/
├── repositories/
├── models/
├── middleware/
├── routes/
├── config/
├── utils/
├── tests/
├── app.js
└── README.md

---

## 10. Data Flow Example
Create Financial Record Flow:

Request → Controller → Validation → Service → Repository → Database → Response