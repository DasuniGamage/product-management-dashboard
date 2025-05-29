# 🛍️ E-Commerce Product Dashboard (React)

This is a React-based E-Commerce Product Management Dashboard where users can add, update, delete, search, and filter products. The application uses `useReducer` for state management and persists data in `localStorage`.

---

## 🚀 Features

- 🧩 Product listing in a responsive grid layout (MUI)
- ➕ Add, ✏️ Edit, and ❌ Delete products with form validation
- 🔍 Real-time search and advanced filtering (by category, stock, price)
- 💾 Data persistence with `localStorage`
- 📦 `useReducer` + custom hooks for clean state management
- 📸 Image upload preview with fallback to default
- ✅ Snackbar alerts for user feedback
- 🧪 Ready for unit and integration testing

---

## 🛠️ Tech Stack

- React (Vite)
- Material UI (MUI)
- useReducer, useEffect, useState
- Custom Hooks (`useProducts`, `useLocalStorage`)
- LocalStorage for data persistence

---

## 📂 Project Structure

src/
├── components/ # UI components (ProductCard, ProductGrid, etc.)
├── hooks/ # Custom hooks (useProducts, useLocalStorage)
├── assets/ # Images or static files (optional)
├── App.jsx # Main app shell
└── main.jsx # Vite entry point

## 📦 Installation & Setup

### 1. Clone the repository

git clone https://github.com/your-username/ecommerce-dashboard.git
cd ecommerce-dashboard

### 2. Install dependencies
npm install

### 3. Start the development server
npm run dev

## 📁 Public Folder Notes
To set a default image fallback, add a file like '/public/default-image.png'

Access it using /default-image.jpg in image URLs

## 💡 Future Improvement
***Add pagination or infinite scroll

***Integrate a backend API (Node.js, Firebase, Supabase, etc.)

***User authentication and admin roles

***Upload images to cloud storage (Cloudinary, Firebase)

## 🙋‍♀️ Author
Made with patience by Dasuni Gamage
> Connect with me on [LinkedIn](www.linkedin.com/in/dasuni-gamage)
