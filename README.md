🚚 Delivery Management System 📦
📋 Project Overview & Purpose
The Delivery Management System 🚛 is a full-stack web application designed to streamline logistics operations for a delivery company. It empowers administrators to manage drivers 👨‍✈️, routes 🛣️, and orders 📦, visualize key performance indicators (KPIs) 📊 like profit and efficiency, and run simulations 🔄 to optimize delivery schedules. The system enforces company rules, such as penalties for late deliveries ⏰, driver fatigue considerations 😴, and fuel cost calculations ⛽, to boost operational efficiency.
Purpose:

Provide a Dashboard 📊 to visualize KPIs (profit, efficiency, delivery status, fuel costs) with interactive charts.
Offer a Simulation 🔄 feature to test delivery scenarios based on driver availability and hours.
Enable Management 🛠️ interfaces for CRUD operations on drivers, routes, and orders.
Ensure secure authentication 🔒 to restrict access to authorized users.

🚀 Setup Steps
To get the project up and running locally, follow these steps:

Clone the Repository 📥:git clone <your-repo-url>


Set up the Backend 💻 (Node.js + PostgreSQL).
Set up the Frontend 🌐 (React).
Configure environment variables ⚙️ for both frontend and backend.
Start PostgreSQL 🗄️, backend, and frontend servers.
(Optional) Deploy to Netlify 🌍 (frontend) and Render ☁️ (backend).

🛠️ Tech Stack Used
Frontend 🌐

React (18.2.0) ⚛️: JavaScript library for building dynamic user interfaces.
Tailwind CSS (3.4.1) 🎨: Utility-first CSS framework for responsive design.
Chart.js (4.4.0) 📊: For rendering bar and pie charts on the dashboard.
Axios (1.6.8) 🌐: For making HTTP requests to the backend API.
React Router (6.22.0) 🧭: For client-side navigation.

Backend 💻

Node.js (v16 or higher) 🚀: JavaScript runtime for the backend.
Express (4.18.2) ⚙️: Web framework for building RESTful APIs.
PostgreSQL (via pg 8.11.3) 🗄️: Relational database for data storage.
jsonwebtoken (9.0.2) 🔒: For JWT-based authentication.
bcrypt (5.1.1) 🔐: For secure password hashing.
cors (2.8.5) 🌍: To enable cross-origin requests.
csv-parser (3.0.0) 📄: To load initial data from CSV files.
dotenv (16.4.5) ⚙️: For environment variable management.
Jest (29.7.0) & Supertest (6.3.3) 🧪: For unit testing.

Database 🗄️

PostgreSQL: Stores data for drivers 👨‍✈️, routes 🛣️, orders 📦, and simulations 🔄.

🛠️ Setup Instructions
Backend Setup 💻

Navigate to the backend directory:cd delivery-management-backend


Install dependencies 📦:npm install express@4.18.2 pg@8.11.3 jsonwebtoken@9.0.2 bcrypt@5.1.1 cors@2.8.5 csv-parser@3.0.0 dotenv@16.4.5
npm install --save-dev jest@29.7.0 supertest@6.3.3


Set up PostgreSQL 🗄️:
Install PostgreSQL if not already installed: postgresql.org.
Create a database:psql -U postgres
CREATE DATABASE delivery_management;
\q




Create the data/ directory and CSV files 📄:
Create data/drivers.csv:name,shift_hours,past_week_hours
John Doe,8,40
Jane Smith,6,50


Create data/routes.csv:distance,traffic_level,base_time
10,Low,30
20,High,45


Create data/orders.csv:value_rs,route_id,delivery_timestamp
1500,1,2025-08-12T08:00:00Z
500,2,2025-08-12T09:00:00Z




Start the backend server 🚀:npm start


The server runs on http://localhost:5000 🌐.



Frontend Setup 🌐

Navigate to the frontend directory:cd delivery-management-frontend


Install dependencies 📦:npm install react@18.2.0 react-dom@18.2.0 axios@1.6.8 chart.js@4.4.0 react-router-dom@6.22.0 tailwindcss@3.4.1


Initialize Tailwind CSS 🎨:npx tailwindcss init


Update tailwind.config.js:/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}


Create src/styles/tailwind.css:@tailwind base;
@tailwind components;
@tailwind utilities;




Start the frontend server 🌍:npm start


The app runs on http://localhost:3000.



⚙️ Environment Variables
Backend (delivery-management-backend/.env) 🔧
DB_USER=your_postgres_user
DB_HOST=your_postgres_host
DB_NAME=delivery_management
DB_PASSWORD=your_postgres_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret
PORT=5000

Frontend (delivery-management-frontend/.env) 🌐
REACT_APP_API_URL=http://localhost:5000/api

Note: Replace placeholders (e.g., your_postgres_password, your_jwt_secret) with secure values. Do not commit .env files to version control 🚫.
☁️ Deployment Instructions
Backend (Render) 🚀

Push to GitHub 📥:cd delivery-management-backend
git init
git add .
git commit -m "Initial backend commit 📦"
git remote add origin <your-backend-repo-url>
git push -u origin main


Set up Render ☁️:
Create a new web service in Render and connect your GitHub repository.
Set the build command: npm install.
Set the start command: npm start.
Add environment variables in Render’s dashboard (same as .env).
Create a PostgreSQL database in Render and update DB_HOST, DB_USER, etc.


Verify deployment ✅:
Test the deployed URL (e.g., https://your-app.onrender.com/api/auth/login).



Frontend (Netlify) 🌍

Push to GitHub 📥:cd delivery-management-frontend
git init
git add .
git commit -m "Initial frontend commit 🌐"
git remote add origin <your-frontend-repo-url>
git push -u origin main


Set up Netlify 🌐:
Create a new site in Netlify and connect your GitHub repository.
Set the build command: npm run build.
Set the publish directory: build.
Add the REACT_APP_API_URL environment variable (e.g., https://your-backend.onrender.com/api).


Verify deployment ✅:
Access the Netlify URL and test login (admin/admin123).



📚 API Documentation
Postman Collection 📬
Use the following Postman collection to test the API endpoints: Delivery Management System Postman Collection 📄
Note: Create a Postman collection with the requests below and share it via Postman’s public workspace. Update the link above once created.
API Endpoints 🚪
All endpoints except /api/auth/login require a JWT token in the Authorization header (Bearer <token>).
1. POST /api/auth/login 🔒

Description: Authenticate a user and return a JWT token.
Request:{
  "username": "admin",
  "password": "admin123"
}


Response (200) ✅:{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}


Error (401) 🚫:{
  "message": "Invalid credentials"
}



2. GET /api/dashboard 📊

Description: Retrieve dashboard KPIs (profit, efficiency, deliveries, fuel costs).
Request: Requires Authorization: Bearer <token>.
Response (200) ✅:{
  "profit": 1450,
  "efficiency": 100,
  "deliveries": { "onTime": 1, "late": 0 },
  "fuelCosts": { "base": 50, "surcharge": 0 }
}


Error (500) 🚫:{
  "message": "Server error"
}



3. GET /api/drivers 👨‍✈️

Description: List all drivers.
Request: Requires Authorization: Bearer <token>.
Response (200) ✅:[
  { "id": 1, "name": "John Doe", "shift_hours": 8, "past_week_hours": 40 },
  { "id": 2, "name": "Jane Smith", "shift_hours": 6, "past_week_hours": 50 }
]


Error (500) 🚫:{
  "message": "Server error"
}



4. POST /api/drivers ➕

Description: Create a new driver.
Request: Requires Authorization: Bearer <token>.{
  "name": "Alice Johnson",
  "shift_hours": 7,
  "past_week_hours": 45
}


Response (201) ✅:{
  "id": 3,
  "name": "Alice Johnson",
  "shift_hours": 7,
  "past_week_hours": 45
}


Error (400) 🚫:{
  "message": "Missing required fields"
}



5. PUT /api/drivers/:id ✏️

Description: Update a driver.
Request: Requires Authorization: Bearer <token>.{
  "name": "Alice Johnson",
  "shift_hours": 8,
  "past_week_hours": 48
}


Response (200) ✅:{
  "id": 3,
  "name": "Alice Johnson",
  "shift_hours": 8,
  "past_week_hours": 48
}


Error (400) 🚫:{
  "message": "Driver not found"
}



6. DELETE /api/drivers/:id 🗑️

Description: Delete a driver.
Request: Requires Authorization: Bearer <token>.
Response (200) ✅:{
  "message": "Driver deleted"
}


Error (400) 🚫:{
  "message": "Driver not found"
}



7. GET /api/routes 🛣️

Description: List all routes.
Request: Requires Authorization: Bearer <token>.
Response (200) ✅:[
  { "id": 1, "distance": 10, "traffic_level": "Low", "base_time": 30 },
  { "id": 2, "distance": 20, "traffic_level": "High", "base_time": 45 }
]


Error (500) 🚫:{
  "message": "Server error"
}



8. POST /api/routes ➕

Description: Create a new route.
Request: Requires Authorization: Bearer <token>.{
  "distance": 15,
  "traffic_level": "Medium",
  "base_time": 40
}


Response (201) ✅:{
  "id": 3,
  "distance": 15,
  "traffic_level": "Medium",
  "base_time": 40
}


Error (400) 🚫:{
  "message": "Missing required fields"
}



9. PUT /api/routes/:id ✏️

Description: Update a route.
Request: Requires Authorization: Bearer <token>.{
  "distance": 15,
  "traffic_level": "Low",
  "base_time": 35
}


Response (200) ✅:{
  "id": 3,
  "distance": 15,
  "traffic_level": "Low",
  "base_time": 35
}


Error (400) 🚫:{
  "message": "Route not found"
}



10. DELETE /api/routes/:id 🗑️

Description: Delete a route.
Request: Requires Authorization: Bearer <token>.
Response (200) ✅:{
  "message": "Route deleted"
}


Error (400) 🚫:{
  "message": "Route not found"
}



11. GET /api/orders 📦

Description: List all orders.
Request: Requires Authorization: Bearer <token>.
Response (200) ✅:[
  { "id": 1, "value_rs": 1500, "route_id": 1, "delivery_timestamp": "2025-08-12T08:00:00Z" },
  { "id": 2, "value_rs": 500, "route_id": 2, "delivery_timestamp": "2025-08-12T09:00:00Z" }
]


Error (500) 🚫:{
  "message": "Server error"
}



12. POST /api/orders ➕

Description: Create a new order.
Request: Requires Authorization: Bearer <token>.{
  "value_rs": 1000,
  "route_id": 1,
  "delivery_timestamp": "2025-08-13T10:00:00Z"
}


Response (201) ✅:{
  "id": 3,
  "value_rs": 1000,
  "route_id": 1,
  "delivery_timestamp": "2025-08-13T10:00:00Z"
}


Error (400) 🚫:{
  "message": "Missing required fields"
}



13. PUT /api/orders/:id ✏️

Description: Update an order.
Request: Requires Authorization: Bearer <token>.{
  "value_rs": 1200,
  "route_id": 1,
  "delivery_timestamp": "2025-08-13T11:00:00Z"
}


Response (200) ✅:{
  "id": 3,
  "value_rs": 1200,
  "route_id": 1,
  "delivery_timestamp": "2025-08-13T11:00:00Z"
}


Error (400) 🚫:{
  "message": "Order not found"
}



14. DELETE /api/orders/:id 🗑️

Description: Delete an order.
Request: Requires Authorization: Bearer <token>.
Response (200) ✅:{
  "message": "Order deleted"
}


Error (400) 🚫:{
  "message": "Order not found"
}



15. POST /api/simulation 🔄

Description: Run a delivery simulation with specified inputs.
Request: Requires Authorization: Bearer <token>.{
  "drivers": 1,
  "startTime": "08:00",
  "maxHours": 8
}


Response (200) ✅:{
  "profit": 1450,
  "efficiency": 100,
  "deliveries": { "onTime": 1, "late": 0 },
  "fuelCosts": { "base": 50, "surcharge": 0 }
}


Error (400) 🚫:{
  "message": "Invalid or missing parameters"
}



16. GET /api/simulation/history 📜

Description: Retrieve simulation history.
Request: Requires Authorization: Bearer <token>.
Response (200) ✅:[
  {
    "id": 1,
    "inputs": { "drivers": 1, "startTime": "08:00", "maxHours": 8 },
    "results": { "profit": 1450, "efficiency": 100, "deliveries": { "onTime": 1, "late": 0 }, "fuelCosts": { "base": 50, "surcharge": 0 } },
    "created_at": "2025-08-13T02:00:00Z"
  }
]


Error (500) 🚫:{
  "message": "Server error"
}




📂 Project Setup Details
Backend Directory Structure
delivery-management-backend/
├── data/ 📄
│   ├── drivers.csv 👨‍✈️
│   ├── routes.csv 🛣️
│   └── orders.csv 📦
├── src/
│   ├── config/ ⚙️
│   │   └── db.js
│   ├── middleware/ 🔒
│   │   └── auth.js
│   ├── models/ 🗄️
│   │   ├── Driver.js 👨‍✈️
│   │   ├── Route.js 🛣️
│   │   ├── Order.js 📦
│   │   └── Simulation.js 🔄
│   ├── routes/ 🧭
│   │   ├── auth.js 🔒
│   │   ├── dashboard.js 📊
│   │   ├── drivers.js 👨‍✈️
│   │   ├── routes.js 🛣️
│   │   ├── orders.js 📦
│   │   └── simulation.js 🔄
│   ├── services/ 🛠️
│   │   └── dataLoader.js 📄
│   ├── tests/ 🧪
│   │   └── simulation.test.js
│   └── server.js 🚀
├── .env ⚙️
├── .gitignore 🚫
└── package.json 📦

Frontend Directory Structure
delivery-management-frontend/
├── src/
│   ├── components/ 🧩
│   │   ├── Auth/ 🔒
│   │   │   └── Login.js
│   │   ├── Dashboard/ 📊
│   │   │   └── Dashboard.js
│   │   ├── Simulation/ 🔄
│   │   │   └── Simulation.js
│   │   ├── Management/ 🛠️
│   │   │   └── Management.js
│   ├── services/ 🌐
│   │   └── api.js
│   ├── styles/ 🎨
│   │   └── tailwind.css
│   ├── App.js ⚛️
│   └── index.js
├── .env ⚙️
├── .gitignore 🚫
├── package.json 📦
└── tailwind.config.js 🎨

Project Setup Steps (Recap) 🔧

Backend 💻:

Install Node.js (v16 or higher) 🚀.
Set up PostgreSQL and create the delivery_management database 🗄️.
Create the data/ directory with drivers.csv, routes.csv, and orders.csv 📄.
Install dependencies and configure .env ⚙️.
Run npm start to start the server on http://localhost:5000 🌐.


Frontend 🌐:

Install Node.js (v16 or higher) 🚀.
Install dependencies and configure Tailwind CSS 🎨.
Create .env with REACT_APP_API_URL ⚙️.
Run npm start to start the app on http://localhost:3000.


Database 🗄️:

The dataLoader.js script creates tables (drivers, routes, orders, simulations) and populates them with CSV data on server startup 📄.



URL Endpoints 🚪
The backend API endpoints are:

Authentication 🔒: POST /api/auth/login
Dashboard 📊: GET /api/dashboard
Drivers 👨‍✈️:
GET /api/drivers
POST /api/drivers
PUT /api/drivers/:id
DELETE /api/drivers/:id


Routes 🛣️:
GET /api/routes
POST /api/routes
PUT /api/routes/:id
DELETE /api/routes/:id


Orders 📦:
GET /api/orders
POST /api/orders
PUT /api/orders/:id
DELETE /api/orders/:id


Simulation 🔄:
POST /api/simulation
GET /api/simulation/history



All endpoints except /api/auth/login require a JWT token in the Authorization header 🔒.

📝 Additional Notes

Authentication 🔒: Default credentials are username: admin, password: admin123. In production, store hashed passwords in the database and use secure JWT secrets.
Simulation Logic 🔄:
Late delivery penalty: ₹50 if delivery time exceeds base time + 10 minutes ⏰.
High-value bonus: 10% extra profit for orders > ₹1000 💰.
Driver fatigue: 30% slower speed if past week hours > 56 😴.
Fuel costs: ₹5/km base, ₹2/km surcharge for high traffic ⛽.


Testing 🧪:
Run backend tests with npm test (covers simulation logic).
Test frontend manually via the UI at http://localhost:3000 🌐.


Deployment ☁️:
Use Netlify for the frontend 🌍 and Render for the backend 🚀.
Ensure the backend URL is updated in the frontend’s .env for production.

