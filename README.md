# Event Booking Frontend

This is the **frontend** for the Event Booking System, a web application that allows users to browse events, book tickets, and manage their bookings. The project is built with **Next.js**, **React**, **Tailwind CSS**, and **TypeScript**, and it communicates with a **Ruby on Rails** backend.

## 🚀 Getting Started

### **1. Clone the repository**
```bash
git clone git@github.com:B0RlS/event-booking-frontend.git
cd event-booking-frontend
```

### **2. Install dependencies**
Make sure you have **Node.js** installed (recommended: `v18+`), then run:
```bash
yarn install
```
or if you use npm:
```bash
npm install
```

### **3. Set up environment variables**
Create a `.env.local` file in the project root and add:
```ini
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```
Modify the URL if your backend runs on a different port.

### **4. Start the development server**
```bash
yarn dev
```
or
```bash
npm run dev
```
The app will be available at `http://localhost:3001`.

## 🖥️ Backend Setup
Make sure you have the **Rails backend** running before using the frontend.

1. Clone the backend repository:
```bash
git clone git@github.com:B0RlS/event_booking_system.git
cd event-booking-backend
```
2. Install dependencies:
```bash
bundle install
```
3. Set up the database:
```bash
rails db:create db:migrate db:seed
```
4. Start the backend server:
```bash
rails s
```
The API will be available at `http://localhost:3000/api/v1`.

## 📦 Production Build
To build the frontend for production, run:
```bash
yarn build
```
Then, start the optimized build with:
```bash
yarn start
```

## 🔗 API Endpoints Used
- `GET /api/v1/events` → Fetch all events
- `GET /api/v1/events/:id` → Fetch a single event
- `POST /api/v1/users/sign_in` → Login
- `POST /api/v1/users/sign_up` → Register
- `POST /api/v1/events/:event_id/tickets` → Book tickets
- `GET /api/v1/tickets` → Fetch user’s tickets
- `DELETE /api/v1/tickets/:id` → Cancel a ticket

---

## ⚡ Technologies Used
- **Next.js (React)**
- **Tailwind CSS**
- **TypeScript**
- **Axios (for API requests)**
- **React Context API (for authentication & notifications)**

## 🛠️ Contributions
Feel free to contribute by opening a pull request.

## 📄 License
MIT

