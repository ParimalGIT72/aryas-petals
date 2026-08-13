# Arya's Petals (Arya Blooms) — Full-Stack Application

*Handmade blooms, made to last.*

A production-ready, full-stack web application monorepo for **Arya's Petals** handmade flower bouquet business.

---

## 🌟 Architecture Overview

The system is separated into three independent modules:

1. **Customer Website** (`client/`) — React + Vite + Tailwind CSS + Framer Motion + Lucide React (`http://localhost:5173`)
2. **Admin Panel** (`admin/`) — React + Vite + Tailwind CSS + Axios (`http://localhost:5174`)
3. **Backend REST API** (`server/`) — Node.js + Express + MongoDB Atlas + Cloudinary SDK + JWT (`http://localhost:5000`)

---

## 📁 Monorepo Structure

```text
aryablooms/
│
├── client/                     # Customer Frontend App (Port 5173)
│   ├── src/
│   │   ├── components/         # Hero, Navbar, ProductCard, ProductDetailModal, OrderModal, etc.
│   │   ├── pages/              # Home, ProductsPage, CustomOrderPage
│   │   ├── services/           # Axios REST API Client
│   │   ├── index.css           # Ivory/Blush/Lavender/Sage Design System
│   │   └── App.jsx
│   └── package.json
│
├── admin/                      # Admin Panel Dashboard App (Port 5174)
│   ├── src/
│   │   ├── components/         # Tables, Modals, Forms
│   │   ├── context/            # AuthContext (JWT Protected Routes)
│   │   ├── layouts/            # Sidebar + Header Admin Layout
│   │   ├── pages/              # Dashboard, ProductsList, AddProduct, EditProduct, Orders, CustomRequests, Settings
│   │   ├── services/           # Admin Axios Client with Bearer Interceptor
│   │   └── App.jsx
│   └── package.json
│
├── server/                     # Express REST API Backend (Port 5000)
│   ├── config/                 # Mongoose DB & Cloudinary Upload SDK Config
│   ├── controllers/            # Product, Auth, Order, CustomRequest & Stats Controllers
│   ├── middleware/             # Auth JWT Guard, Multer Memory Storage, Error Handler
│   ├── models/                 # Product, Admin, Order, CustomRequest Schemas
│   ├── routes/                 # API Routes (/api/products, /api/auth, /api/orders, /api/custom-requests)
│   ├── utils/                  # DB Seed Script & Admin Creator Script
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies

You can install dependencies inside each module:

```bash
# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install

# Admin dependencies
cd ../admin
npm install
```

### 2. Configure Environment Variables

Create `.env` inside `server/`, `client/`, and `admin/` using the provided `.env.example` templates.

**`server/.env`**:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/arya_blooms
JWT_SECRET=arya_blooms_secret_jwt_key_2026_production
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**`client/.env`**:
```env
VITE_API_URL=http://localhost:5000/api
```

**`admin/.env`**:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🌾 Seeding Database & Creating Admin

To populate MongoDB with initial products ("Midnight Web", "Lavender Love", "Blue Daisy", "Blush Garden") and create the initial admin user:

```bash
# From server directory
cd server
npm run seed
```

Output:
- **Admin Email**: `admin@aryablooms.com`
- **Admin Password**: `admin123`

To create a custom admin user:
```bash
npm run create-admin
```

---

## 💻 Running Local Development Servers

Start each server in separate terminal windows:

### Terminal 1 — Backend API
```bash
cd server
npm run dev
# Running on http://localhost:5000
```

### Terminal 2 — Customer Website
```bash
cd client
npm run dev
# Running on http://localhost:5173
```

### Terminal 3 — Admin Panel
```bash
cd admin
npm run dev
# Running on http://localhost:5174
```

---

## 🛡️ Key Features

- **Dynamic MongoDB Catalog**: Product updates in Admin Panel immediately reflect on Customer Website via REST API.
- **Cloudinary Image Management**: Supports uploading multiple high-res product photos, selecting primary cover images, and auto-deleting Cloudinary assets on product deletion. Includes graceful fallback mode.
- **Admin Order & Custom Request System**: Admin can view customer orders and custom bouquet inquiries, toggle status (Pending → Confirmed → Preparing → Ready → Delivered), and contact clients directly.
- **JWT & Bcrypt Security**: Passwords are securely hashed; admin endpoints are protected by standard Bearer JWT middleware.
# aryas-petals
