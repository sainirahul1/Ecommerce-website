# 🛒 Mini Interactive E-Commerce Platform (MERN Stack)

A full-stack **Mini E-Commerce Web Application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.

This project demonstrates RESTful API development, MongoDB schema design, structured backend architecture, and responsive frontend integration.

---

## 🚀 Features

### 🏠 Home Page
- View all products  
- Search products by keyword  
- Add product to cart  
- Loading state handling  
- “No Products Found” message  
- Responsive product card layout  

### 🛍 Cart Page
- View cart items  
- Remove item from cart  
- Display total cart price  
- Place dummy order (alert message)  

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js  
- React Router DOM  
- Axios  
- CSS / Tailwind CSS  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- CORS  
- Dotenv  

---

## 📁 Project Structure

```
project-root/
|
|-- backend/
|   |-- models/
|   |   |-- Product.js
|   |   |-- Cart.js
|   |
|   |-- routes/
|   |   |-- productRoutes.js
|   |   |-- cartRoutes.js
|   |
|   |-- controllers/
|   |   |-- productController.js
|   |   |-- cartController.js
|   |
|   |-- config/
|   |   |-- db.js
|   |
|   |-- server.js
|   |-- .env
|
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |   |-- Navbar.jsx
|   |   |   |-- ProductCard.jsx
|   |   |   |-- SearchBar.jsx
|   |   |
|   |   |-- pages/
|   |   |   |-- Home.jsx
|   |   |   |-- Cart.jsx
|   |   |
|   |   |-- services/
|   |   |   |-- api.js
|   |   |
|   |   |-- App.jsx
|   |
|   |-- package.json
|
|-- README.md
```

---

## 🗄 Database Schema

### 📦 Product Schema

```js
{
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  image: String,
  createdAt: Date
}
```

### 🛒 Cart Schema

```js
{
  productId: ObjectId (ref: Product),
  quantity: Number,
  totalPrice: Number
}
```

---

## 🔌 API Endpoints

### 📦 Product APIs

| Method | Endpoint | Description |
|--------|----------|------------|
| POST   | /api/products | Add product |
| GET    | /api/products | Get all products |
| GET    | /api/products/:id | Get single product |
| GET    | /api/products?search=keyword | Search products |

### 🛒 Cart APIs

| Method | Endpoint | Description |
|--------|----------|------------|
| POST   | /api/cart | Add to cart |
| GET    | /api/cart | Get cart items |
| DELETE | /api/cart/:id | Remove cart item |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-link>
cd project-folder
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🧪 Testing

- All APIs tested using Postman  
- Postman collection exported  
- Proper error handling implemented  

---

## 📊 Evaluation Criteria Covered

✔ Clean Folder Structure  
✔ RESTful API Design  
✔ Proper MongoDB Schema  
✔ Reusable React Components  
✔ Responsive UI  
✔ Code Quality & Separation of Concerns  
✔ Complete Cart Functionality  

---

## 👨‍💻 Author

**Saini Rahul**
