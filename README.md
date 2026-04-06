# Finance Data Processing & Access Control System

A robust backend engineering solution designed to manage financial transactions with integrated Role-Based Access Control (RBAC) and real-time dashboard analytics.

## Project Overview
This system provides a secure environment for processing financial records. It was built to demonstrate proficiency in system architecture, API security, and data modeling. The application features a Spring Boot backend and a React-based frontend to provide a complete, testable user experience.

## Technology Stack

### Backend
- Java 17 & Spring Boot - Core framework
- Spring Security - Authentication & authorization
- JWT (JSON Web Tokens) - Secure API communication
- Spring Data JPA - Database abstraction
- H2 Database - Fast, in-memory data storage
- Maven - Dependency management

### Frontend
- React.js (Vite)
- Axios - API integration
- CSS3 - Custom styling

## Key Features
- Role-Based Access Control: Three-tier permission system (Admin, Analyst, Viewer).
- Financial Analytics: Automatic calculation of income, expenses, and net balance.
- Transaction Management: Full CRUD operations for financial records.
- Data Visualization: Category-wise summaries and recent activity logs.
- Secure Architecture: Global error handling and input validation.

## User Roles and Permissions
The system uses a tiered access model to ensure data security and proper oversight:

Admin: Holds full system control, including user management, record modification, and complete dashboard access.

Analyst: Focuses on data review with the ability to view all financial records and dashboard analytics without administrative privileges.

Viewer: Restricted to a high-level summary only, providing a "read-only" look at the dashboard without access to specific transaction details.

## Installation & Setup

### Backend Setup
1. Navigate to the finance-backend folder.
2. Run via Maven:
   mvn spring-boot:run
3. Access the API at: http://localhost:8081
4. Default Admin: admin@zoran.com / admin123

### Frontend Setup
1. Navigate to the finance-frontend folder.
2. Install dependencies:
   npm install
3. Start the development server:
   npm run dev
4. Open your browser to: http://localhost:5173

---
Note: This project uses an H2 in-memory database. All data is reset upon server restart.