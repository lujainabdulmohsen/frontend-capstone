# Yusr - Frontend

## Project Description
Yusr is a single-page React application that connects users to government services through one secure interface.  
It allows users to view agencies, request services, book appointments, pay fines, and manage their account details.

---

## ERD Diagram
Add your ERD image below:

![ERD Diagram](./assets/ERD.png)

---

## RESTful Routing Table
| Route | Method | Description |
|--------|---------|-------------|
| / | GET | Home page |
| /login | POST | User login |
| /register | POST | User registration |
| /agencies | GET | List all agencies |
| /services | GET | List all services |
| /service-requests | GET, POST | View or create a service request |
| /service-requests/:id | GET, PUT, DELETE | Retrieve, update, or delete a service request |
| /appointments | POST | Create an appointment |
| /credit-card | GET | View credit card details |

---

## User Stories
| User Story | Description |
|-------------|-------------|
| As a user, I can register and log in securely | To access my personalized account |
| I can view government agencies and their services | To explore available options |
| I can submit a service request | To apply for renewals or fines |
| I can book appointments | To schedule visits conveniently |
| I can view my credit card and pay fees | To complete payments easily |
| I can view my previous requests | To track my service history |

---

## Technologies Used
| Category | Tools |
|-----------|--------|
| Framework | React (Vite) |
| Routing | React Router |
| HTTP | Fetch API |
| State Management | React Hooks |
| Styling | Custom CSS |
| Authentication | JWT stored in localStorage |
| Containerization | Docker |
| Version Control | Git & GitHub |

---

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone <frontend-repo-link>
   cd frontend
   Run the Development Server
   Open in Browser
   http://localhost:5173/

   ---

   ##Icebox Features

Add chatbot interface for guided service navigation
Add multilingual support
Add responsive design for mobile devices
Add notification system for request updates

---

#Challenges / Key Takeaways
Managing JWT authentication and persistence
Handling API requests and errors cleanly
Creating a consistent and intuitive UI using React Router
Integrating backend endpoints smoothly with frontend logic

---

## Run with Docker

1. Build the backend image:
   ```bash
   docker compose build

   ---

#Links
Backend Repository: [https://github.com/lujainabdulmohsen/backend-capstone]

