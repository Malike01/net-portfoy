# NetPortfoy - Real Estate CRM System 🏠

**NetPortfoy** is a comprehensive CRM (Customer Relationship Management) application designed for real estate consultants to manage portfolio management, customer relationships, and sales processes from a single, efficient, and modern interface.

<img width="1911" height="936" alt="Ekran görüntüsü 2025-11-30 134101" src="https://github.com/user-attachments/assets/265deed8-7fab-421a-85df-38b821790232" />
<img width="1918" height="945" alt="Ekran görüntüsü 2025-11-30 163017" src="https://github.com/user-attachments/assets/2899e53e-cf13-4f55-8334-13b8a7a42b46" />
<img width="1918" height="945" alt="image" src="https://github.com/user-attachments/assets/80b84ca7-12dc-4ea7-96d1-8b0577a9bc0e" />
<img width="1919" height="945" alt="Ekran görüntüsü 2025-11-30 163057" src="https://github.com/user-attachments/assets/d6614f86-f027-496e-b04a-4a26438f70e2" />
<img width="1919" height="940" alt="image" src="https://github.com/user-attachments/assets/f55cb3ea-be7f-4c2f-bf32-c504e1d1faa1" />
<img width="1917" height="942" alt="Ekran görüntüsü 2025-11-30 163204" src="https://github.com/user-attachments/assets/438f6293-4214-423e-bbc6-c44c6745279d" />
![Uploading image.png…]()


## 🌟 Key Features

### 🔐 Security & Authentication
* **JWT Based Session:** Secure login system with a 1-hour auto-logout session timeout.
* **SMS Verification (OTP):** Phone verification system integrated with Twilio. Includes a "Nag Screen" (Reminder Modal) for unverified users.
* **Role Management:** Infrastructure for Admin and Consultant authorization.

### 📊 Smart Dashboard
* **KPI Cards:** Total portfolio value, active listings, and monthly sales targets.
* **Trend Analysis:** Dynamic indicators showing growth/decline rates compared to the previous month.
* **Daily Agenda:** Interactive task list for tracking calls and appointments.

### 🏘️ Portfolio Management
* **Masonry Layout:** Aesthetic arrangement of listing cards with varying sizes (Pinterest style).
* **Detailed Listing Form:** Support for external links (Sahibinden, Hepsiemlak), multi-currency, and detailed property features.
* **URL-Based Management:** Shareable links for edit and create modes.

### 👥 Customer Relations (CRM)
* **Buyer/Seller Segmentation:** Categorize customers based on their type.
* **Smart Matching:** Feature to match a new customer with suitable existing portfolios during registration.
* **Status Tracking:** Visual tracking of stages like "To Call", "Offer Made", "Title Deed Process".

### 🚀 Sales Pipeline
* **Kanban View:** Manage sales stages using Drag & Drop technology.
* **View Switcher:** Instant toggle between Kanban and List views.

### 🔔 Notification System
* **Persistent Notifications:** Notification history stored in the database.
* **Auto-Triggers:** Smart system-generated alerts for events like "You have customers to call" or "Welcome".

---

## 🛠️ Tech Stack

This project is built using the **MERN Stack** (MongoDB, Express, React, Node.js) architecture.

### Frontend (Client)
* **Framework:** React (Vite) + TypeScript
* **State Management:** Redux Toolkit & Context API
* **Data Fetching:** React Query (TanStack Query) & Axios
* **UI Library:** Ant Design (v5)
* **Drag & Drop:** @dnd-kit
* **Utilities:** Day.js, React Router DOM

### Backend (Server)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose)
* **Auth:** JWT (JSON Web Token) + Bcrypt
* **SMS Service:** Twilio SDK

---

## 🚀 Installation & Setup

Follow the steps below to run the project in your local environment.

### Prerequisites
* Node.js (v16 or higher)
* MongoDB (Local or Atlas URI)

### 1. Clone the Repository
```bash
git clone [https://github.com/Malike01/netportfoy.git](https://github.com/Malike01/netportfoy.git)
cd netportfoy
