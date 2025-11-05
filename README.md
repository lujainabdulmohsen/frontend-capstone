# Yusr — Frontend

## Project Description  
Yusr is a modern single-page React application that connects citizens to government services through one unified, secure interface.  
It provides access to multiple agencies, enables users to submit and track service requests, schedule appointments, pay fines, and manage their account details — all in one place.

---

## Technologies Used

| Category | Tools |
|-----------|--------|
| Framework | React (Vite) |
| Routing | React Router |
| HTTP | Fetch API + `sendRequest.js` |
| State Management | React Hooks |
| Styling | Custom CSS (Royal Blue & Royal Green palette) |
| Authentication | JWT stored in `localStorage` |
| Build Tool | Vite |
| Backend Integration | Django REST Framework API |

---

## User Stories

| As a user, I can... | Description |
|----------------------|-------------|
| Sign up and log in | Create an account and authenticate securely using JWT |
| Browse government agencies | View available agencies and their descriptions |
| View available services | Explore services offered by each agency |
| Create a service request | Submit a request and provide required information |
| Track my requests | View the status and history of submitted requests |
| Manage appointments | Schedule, view, update, or delete appointments |
| Manage payment methods | Add or remove my credit card in My Account |
| View and pay traffic fines | View unpaid fines and pay individually or all at once |
| Change my password | Update my password securely from account settings |
| Use the chatbot assistant | Get guided help in choosing and completing a service |

---

## Frontend Pages

| Page | Path | Description |
|-------|------|-------------|
| Home | `/` | Landing page introducing Yusr |
| Login | `/login` | User login page |
| Signup | `/signup` | User registration page |
| Services | `/services` | List of all available services |
| My Requests | `/my-requests` | Manage and view service requests |
| My Account | `/my-account` | Manage user and credit card information |
| Fines | `/fines` | View and pay traffic fines |
| Chat | `/chat` | Interactive assistant to guide users through service selection |

---

## RESTful Routes

| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/users/signup/` | POST | Register a new user |
| `/users/login/` | POST | Authenticate user and return tokens |
| `/users/token/refresh/` | GET | Refresh JWT token |
| `/agencies/` | GET | Get all agencies |
| `/services/` | GET | Get all services |
| `/services/<id>/` | GET | Get details for a specific service |
| `/service-requests/` | GET | View all my requests |
| `/service-requests/` | POST | Create a new service request |
| `/service-requests/<id>/` | PUT | Update a service request |
| `/service-requests/<id>/` | DELETE | Delete a service request |
| `/service-requests/<id>/pay/` | POST | Pay for a service request |
| `/credit-card/` | GET | Get user's credit cards |
| `/credit-card/` | POST | Add new credit card |
| `/credit-card/` | DELETE | Delete a credit card |
| `/my-fines/` | GET | View all unpaid fines |
| `/pay-fines/` | POST | Pay one or all fines |

---

## Installation & Setup

```bash
cd frontend
npm install
npm run dev

## Icebox Features

| Feature | Description |
|----------|-------------|
| Dark Mode | Add light/dark theme toggle for accessibility |
| Multi-language Support | Support Arabic and English |
| AI Voice Assistant | Allow voice-based interaction with chatbot |
| Notifications Center | Alerts for status updates and new requests |
| Profile Photo Upload | Let users upload a profile image |

---

## Challenges & Key Takeaways

| Challenge | Solution / Learning |
|------------|--------------------|
| Managing JWT authentication across components | Implemented a global `sendRequest.js` utility to attach tokens automatically |
| Keeping design consistent across pages | Used shared CSS classes and color palette (royal blue & royal green) |
| Handling multiple routes and dynamic content | Configured React Router with parameterized routes |
| Integrating frontend with Django REST API | Used fetch calls and tested all endpoints |
| Optimizing component performance | Used React Hooks carefully to reduce unnecessary re-renders |
