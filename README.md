# 📚 Book Store Web Application (Frontend)

A comprehensive e-commerce web application for book shopping built with React, featuring user management, shopping cart functionality, order processing, and administrative tools.

---

## ✨ Key Features
- **User Authentication:** Login/Register with email verification and Google OAuth integration
- **Product Management:** Browse books by categories, publishers, authors with advanced filtering and sorting
- **Shopping Experience:** Add to cart, wishlist management, quantity control, and product reviews
- **Order Processing:** Complete checkout flow with address management, coupon system, and payment integration (VNPay, COD)
- **Admin Dashboard:** Full CRUD operations for products, categories, publishers, users, and order management
- **Responsive Design:** Mobile-first approach with Bootstrap and custom SCSS styling
- **Real-time Features:** Notifications, order tracking, and inventory management
- **Smart Loading System:** Global loading overlay and button-level loading states for smooth UX during API calls

---

## 🛠️ Tech Stack
- **Framework:** React 18.3.1
- **State Management:** Redux Toolkit with React Redux
- **Styling:** SCSS, Bootstrap 5.3.3, react-bootstrap
- **Routing:** React Router DOM v6
- **Forms & Validation:** Formik, Yup
- **UI Components:** Bootstrap Icons, React Icons, react-star-ratings
- **Notifications:** react-toastify
- **HTTP Client:** Axios
- **Date Handling:** date-fns
- **Others:** Web Vitals, Sass

---

## 📁 Project Structure Highlights
- `components/`: Reusable UI components
  - `admin/`: Admin-specific components for management dashboards
  - `header/`: Navigation, search, and user menu components
  - `footer/`: Site footer with links and information
  - `loading/`: Global loading overlay and loading button components
  - `pagination/`: Product listing pagination controls
  - `quantity-control/`: Cart quantity management
  - `user/`: User-specific components for profile, checkout, etc.
- `pages/`: Page-level components
  - `admin-page/`: Admin dashboard pages (products, categories, users management)
  - `public-page/`: Public pages (home, login, register, product details)
  - `user-page/`: User account pages (profile, cart, orders, wishlist)
- `services/`: API service modules
  - `authenticationService.js`: User authentication
  - `productService.js`: Product management
  - `cartService.js`: Shopping cart operations
  - `orderService.js`: Order processing
  - `categoryService.js`: Category management
  - `wishlistService.js`: Wishlist functionality
- `features/`: Redux slices for state management
  - `auth/`: Authentication state
  - `cart/`: Shopping cart state
  - `products/`: Product catalog state
  - `category/`: Category management state
- `configurations/`: App configurations and API endpoints
- `utilities/`: Helper functions and utilities
- `routes/`: Route definitions and protected route logic

---

## 🚀 Core Functionalities

### For Customers:
- **Account Management:** Registration, login, profile updates, password change
- **Product Discovery:** Advanced search, filtering by category/publisher/author, sorting options
- **Shopping Cart:** Add/remove items, quantity updates, persistent cart state
- **Wishlist:** Save favorite products for later purchase
- **Checkout Process:** Address management, shipping options, coupon application
- **Payment Integration:** VNPay online payment and Cash on Delivery options
- **Order Tracking:** View order history, track shipping status
- **Product Reviews:** Rate and review purchased products

### For Administrators:
- **Product Management:** CRUD operations with image and audio file uploads
- **Category & Publisher Management:** Organize product catalog structure
- **User Management:** View and manage customer accounts and permissions
- **Order Management:** Process orders, update shipping status
- **Inventory Control:** Track stock levels and product availability
- **Analytics Dashboard:** Sales reports and popular product insights
- **Coupon System:** Create and manage discount codes and promotions

---

## 🎯 Purpose
This project demonstrates:
- **Full-Stack E-commerce Development:** Complete online bookstore with all essential features
- **Modern React Architecture:** Component-based design with Redux state management
- **API Integration:** RESTful services with Spring Boot backend
- **Payment Gateway Integration:** Real-world payment processing capabilities
- **Admin Panel Development:** Comprehensive administrative tools
- **Responsive Web Design:** Mobile-optimized user experience
- **Authentication & Authorization:** Secure user management with role-based access control

---

## 🔧 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository
```bash
git clone [repository-url]
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [https://book-store-web-app-seven.vercel.app](https://book-store-web-app-seven.vercel.app) to view the application

### Available Scripts
- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (one-way operation)

---

## 🌐 Live Demo
- **Frontend:** [Book Store Web App](https://book-store-web-app-seven.vercel.app/)
- **Backend API:** [Spring Boot API](https://book-store-web-api-5ac5f5640ffb.herokuapp.com/)

---

## 📱 Key Pages & Features
- **Home Page:** Featured products, categories, and promotional banners
- **Product Listing:** Filterable and sortable product catalog
- **Product Details:** Comprehensive product information with reviews
- **Shopping Cart:** Full cart management with quantity controls
- **Checkout:** Multi-step checkout with address and payment options
- **User Dashboard:** Profile management, order history, wishlist
- **Admin Panel:** Complete administrative interface for store management

---

## 🔐 Authentication Features
- Email/password login with validation
- Google OAuth integration for social login
- Email verification for new accounts
- Password reset functionality
- OTP-based account verification
- Role-based access control (User/Admin)

This Book Store Web Application represents a production-ready e-commerce solution with modern web development practices and comprehensive business logic implementation.