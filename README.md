UniLink - Student Affairs Management System
A comprehensive, modern digital platform designed to revolutionize communication and service delivery between students and university administration. Built with Spring Boot and React, UniLink provides a complete solution for request management, appointment scheduling, document handling, and administrative workflow automation.

🚀 Features
👥 Dual-Role System
Student Portal: Service requests, appointment booking, status tracking

Staff Portal: Request management, appointment scheduling, analytics dashboard

Role-based Access Control: Secure separation of privileges and data access

Unified Authentication: Single sign-on with university credentials

📋 Request Management
Multi-type Service Requests: Transcripts, ID renewal, housing, and more

Status Tracking: Real-time updates from submission to completion

Document Upload: Secure file uploads with format validation (PDF, JPG, PNG)

Workflow Automation: Automated notifications and status transitions

Request History: Complete audit trail for all student interactions

🗓️ Appointment System
Smart Scheduling: Conflict-free appointment booking with staff availability

Calendar Integration: Visual calendar interface for easy management

Rescheduling & Cancellations: Flexible changes with automatic notifications

Purpose-based Booking: Categorized appointments (Help, Complaint, Inquiry)

Time Slot Management: 15-minute standardized meeting durations

📊 Administrative Dashboard
Real-time Analytics: Request volumes, status distribution, performance metrics

Reporting Tools: Exportable reports in PDF and Excel formats

Staff Performance: Workload tracking and processing efficiency

Student Engagement: Usage patterns and service demand analysis

🔔 Notification System
Real-time Alerts: Instant updates for request status changes

Appointment Reminders: Automated notifications for upcoming meetings

Document Requests: Alerts for missing or additional required documents

Multi-channel Delivery: In-app notifications with email integration capability

🛠️ Technology Stack
Backend
Framework: Spring Boot 3.0 with Java 17

Security: Spring Security with JWT authentication

Database: MySQL 8.0 with Spring Data JPA & Hibernate

API Documentation: Swagger/OpenAPI 3.0

Build Tool: Maven 3.6+

Testing: JUnit 5, Mockito, Postman

Frontend
Framework: React 18 with TypeScript

Styling: Tailwind CSS for responsive design

Routing: React Router DOM

State Management: React Context API

HTTP Client: Axios for API communication

Build Tool: Vite

Mobile
Framework: Flutter with Dart

State Management: Provider/Riverpod

HTTP Client: Dio

🏗️ System Architecture
text
┌─────────────────┐    ┌──────────────────┐    ┌──────────────┐
│   Client Layer  │    │   Backend API    │    │  Database    │
│                 │    │                  │    │              │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │ ┌──────────┐ │
│ │   React     │◄┼────┼─│ Spring Boot  │◄┼────┼─│  MySQL   │ │
│ │   Web App   │ │    │ │   REST API   │ │    │ │ Database │ │
│ └─────────────┘ │    │ └──────────────┘ │    │ └──────────┘ │
│                 │    │                  │    │              │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │              │
│ │  Flutter    │◄┼────┼─│ Spring Sec   │ │    │              │
│ │   Mobile    │ │    │ │   JWT Auth   │ │    │              │
│ └─────────────┘ │    │ └──────────────┘ │    │              │
└─────────────────┘    └──────────────────┘    └──────────────┘
📱 Responsive Design
The platform is fully responsive and optimized for all device types:

Mobile: 320px - 767px (Touch-optimized for students on-the-go)

Tablet: 768px - 1023px (Adaptive layout for staff devices)

Desktop: 1024px - 1439px (Full administrative feature set)

Large Desktop: 1440px+ (Enhanced dashboard and analytics views)

🎨 Design System
Color Palette
Primary: Blue (#2563eb) - Trust, professionalism, stability

Success: Green (#16a34a) - Approved states, positive actions

Warning: Amber (#d97706) - Pending status, requires attention

Error: Red (#dc2626) - Rejected items, system errors

Neutral: Gray scale for consistent UI elements

Typography
Headings: Inter font family with hierarchical scaling

Body Text: System fonts for optimal readability

Accessibility: Minimum 14px font size, WCAG AA contrast compliance

🚀 Getting Started
Prerequisites
Java 17 or higher

MySQL 8.0 or higher

Node.js 18.0 or higher

Maven 3.6+

Backend Installation
Clone the backend repository

bash
git clone https://github.com/MahmoudEhab3/Student-Affairs-Backend.git
cd Student-Affairs-Backend
Configure database

sql
CREATE DATABASE unilink_db;
Update application properties

properties
spring.datasource.url=jdbc:mysql://localhost:3306/unilink_db
spring.datasource.username=your_username
spring.datasource.password=your_password
Run the backend

bash
mvn spring-boot:run
Frontend Installation
Clone the frontend repository

bash
git clone https://github.com/Mariam2026/uni.git
cd uni
Install dependencies

bash
npm install
Start development server

bash
npm run dev
Access the application

Backend API: http://localhost:8080

Frontend: http://localhost:3000

API Documentation: http://localhost:8080/swagger-ui.html

📚 API Endpoints
Authentication
Method	Endpoint	Description	Access
POST	/api/auth/login	User authentication	Public
POST	/api/auth/register	User registration	Public
POST	/api/auth/refresh	Refresh JWT token	Both
Request Management
Method	Endpoint	Description	Access
GET	/api/requests	Get filtered requests	Staff
POST	/api/requests	Create new request	Student
PUT	/api/requests/{id}	Update request status	Staff
GET	/api/requests/student/{id}	Get student requests	Student
Appointment Management
Method	Endpoint	Description	Access
GET	/api/appointments	Get appointments	Both
POST	/api/appointments	Book appointment	Student
PUT	/api/appointments/{id}	Reschedule appointment	Both
DELETE	/api/appointments/{id}	Cancel appointment	Both
🗃️ Database Schema
Core Entities
Users: Students and staff members with role-based access

Requests: Service requests with status tracking and documentation

Appointments: Scheduled meetings with conflict prevention

Documents: File uploads with format and size validation

Notifications: Real-time alerts and system messages

🔒 Security Features
JWT Authentication: Stateless token-based security

Role-based Authorization: Student and staff privilege separation

Input Validation: Comprehensive server-side validation

SQL Injection Prevention: Parameterized queries and JPA

XSS Protection: Input sanitization and output encoding

File Upload Security: Type validation and size restrictions
