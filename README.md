<span style="color:#002E47;">Yusr — Frontend</span>
<span style="color:#2A4628;">Project Description</span>
Yusr is a modern single-page React application that connects citizens to government services through one unified, secure interface.
It provides access to multiple agencies, enables users to submit and track service requests, schedule appointments, pay fines, and manage their account details — all in one place.
<span style="color:#2A4628;">Technologies Used</span>
Category	Tools
Framework	React (Vite)
Routing	React Router
HTTP	Fetch API + sendRequest.js
State Management	React Hooks
Styling	Custom CSS (Royal Blue & Royal Green palette)
Authentication	JWT stored in localStorage
Build Tool	Vite
<span style="color:#2A4628;">User Stories</span>
As a user, I can...	Description
Sign up and log in	Create an account and authenticate securely using JWT
Browse government agencies	View available agencies and their descriptions
View available services	Explore all services offered by each agency
Create a service request	Submit a request and provide required information
Track my requests	View the status and history of all submitted requests
Manage appointments	Schedule, view, update, or delete appointments
Manage payment methods	Add or remove my credit card in My Account
View and pay traffic fines	View unpaid fines and pay individually or all at once
Change my password	Update my password securely from account settings
<span style="color:#2A4628;">Frontend Pages</span>
Page	Path	Description
Home	/	Landing page introducing Yusr
Login	/login	User login page
Signup	/signup	User registration page
Services	/services	List of all available services
My Requests	/my-requests	Manage and view service requests
My Account	/my-account	Manage user and credit card information
Fines	/fines	View and pay traffic fines
Chat	/chat	Interactive assistant to guide users through service selection
<span style="color:#2A4628;">RESTful Routes</span>
Endpoint	Method	Description
/users/signup/	POST	Register a new user
/users/login/	POST	Authenticate user and return tokens
/users/token/refresh/	GET	Refresh JWT token
/agencies/	GET	Get all agencies
/services/	GET	Get all services
/services/<id>/	GET	Get details for a service
/service-requests/	GET	View all my requests
/service-requests/	POST	Create a new service request
/service-requests/<id>/	PUT	Update a service request
/service-requests/<id>/	DELETE	Delete a service request
/service-requests/<id>/pay/	POST	Pay for a service request
/credit-card/	GET	Get user’s credit cards
/credit-card/	POST	Add new credit card
/credit-card/	DELETE	Remove credit card
/my-fines/	GET	View all unpaid fines
/pay-fines/	POST	Pay one or all fines
<span style="color:#2A4628;">Installation & Setup</span>
cd frontend
npm install
npm run dev
If needed, create a .env file and add:
VITE_API_BASE_URL=http://127.0.0.1:8000
<span style="color:#2A4628;">Icebox Features</span>
Feature	Description
Notifications System	Send real-time alerts for status changes or payments
Dark Mode	Optional dark theme using royal palette
Multi-language Support	Add Arabic/English interface toggle
Chatbot AI Upgrade	Smart recommendations based on user behavior
<span style="color:#2A4628;">Challenges & Key Takeaways</span>
Challenge	Solution / Takeaway
Managing multiple API integrations	Organized routes and API calls through modular utility files
Maintaining consistent design	Applied custom CSS with the royal palette for unified branding
Authentication flow	Implemented JWT handling with secure token storage
Frontend-backend synchronization	Tested endpoints thoroughly with Postman and integrated fetch logic
<span style="color:#2A4628;">Project Links</span>
Type	Link
Backend Repository	Yusr Backend
Frontend Repository	Yusr Frontend
Deployed Site	Live Application
<p style="text-align:right; color:#002E47; font-weight:bold;">Developed by Lujain Al Sultan</p>