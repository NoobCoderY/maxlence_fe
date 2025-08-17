# User Management System

A comprehensive React-based user management application with authentication, role-based permissions, and modern UI components.

## 🚀 Features Overview

### **Authentication System**

- **Google OAuth Integration** - Seamless Google authentication with backend flow
- **Email/Password Authentication** - Traditional login with secure password handling
- **Registration System** - New user signup with email verification
- **Password Reset** - Forgot password functionality with email tokens
- **Email Verification** - Account activation via email links
- **JWT Token Management** - Secure token-based authentication with refresh capabilities

### **User Management**

- **User List View** - Paginated table with search and sorting capabilities
- **User Details** - Comprehensive user profile viewing and editing
- **Role-Based Permissions** - Admin/User role system with different access levels
- **Profile Image Upload** - Drag-and-drop image upload with preview
- **User Activation/Deactivation** - Admin controls for user account status
- **Bulk Operations** - Multiple user management capabilities

### **Profile Management**

- **Edit Profile** - Users can update their personal information
- **Profile Picture Upload** - Hover-to-upload image functionality with preview
- **Password Update** - Secure password change with confirmation
- **Account Settings** - Personal account configuration options

### **UI/UX Features**

- **Responsive Design** - Mobile-first approach with perfect mobile/tablet/desktop support
- **Clean White & Black Theme** - Professional monochrome design system
- **Loading States** - Skeleton loaders and progress indicators
- **Error Handling** - Comprehensive error messages and fallback UI
- **Toast Notifications** - Real-time feedback for user actions
- **Accessible Components** - WCAG compliant UI elements

### **Technical Features**

- **State Management** - Redux Toolkit with RTK Query for API management
- **Type Safety** - Full TypeScript implementation with strict typing
- **Form Validation** - Zod schema validation with React Hook Form
- **API Integration** - RESTful API integration with error handling
- **Image Proxy** - CORS-handled image serving through Vite proxy
- **Route Protection** - Protected routes based on authentication status

## 📱 Pages & Components

### **Authentication Pages**

- `/login` - User login with Google OAuth and email/password
- `/signup` - User registration with email verification
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset with token validation
- `/verify-email` - Email verification page

### **User Management Pages**

- `/users` - User list with search, filter, and pagination
- `/users/:id` - Individual user details and editing
- `/profile` - Current user profile editing
- `/update-password` - Password change for logged-in users

### **Error Pages**

- `/404` - Page not found with navigation back
- `/403` - Access forbidden for unauthorized users

### **Core Components**

- **Navigation Sidebar** - Collapsible sidebar with role-based menu items
- **User Avatar** - Profile image display with upload functionality
- **Data Tables** - Sortable, searchable, paginated tables
- **Form Components** - Reusable form elements with validation
- **Status Indicators** - Visual status badges for user states
- **Image Upload** - Hover-to-upload with preview and clear functionality

## 🔐 Security Features

### **Authentication Security**

- **JWT Token Validation** - Secure token-based authentication
- **Role-Based Access Control** - Different permissions for Admin/User roles
- **Protected Routes** - Automatic redirection for unauthorized access

## 🛠️ Technologies Used

### **Frontend Framework**

- **React 18** with **Vite** 🚀 - Modern build tooling and fast development
- **TypeScript** - Type-safe development with strict typing
- **React Router** - Client-side routing with protected routes

### **State Management**

- **Redux Toolkit** - Efficient state management
- **RTK Query** - Data fetching and caching
- **Redux Persist** - State persistence across sessions

### **UI/Styling**

- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality component library
- **Radix UI** - Accessible primitive components
- **Lucide Icons** - Modern icon library

### **Forms & Validation**

- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation
- **File Upload** - Drag-and-drop image upload

### **Development Tools**

- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting
- **Vite Proxy** - Development server with API proxying

---

## 🚀 Getting Started

### **1. Prerequisites**

Ensure you have the following installed:

- **Node.js** (v18 or later recommended)
- **npm** (or yarn/pnpm, as preferred)

### **2. Install Dependencies**

```sh
npm install
```

### **3. Setup Environment Variables**

Create `.env` files in the root directory based on your environment:

#### **Development (`.env.development`)**

```
VITE_BASE_URL=https://dev.example.com/api
VITE_FRONTEND_URL=http://localhost:5173
```

````

### **4. Start the Development Server**
```sh
npm run dev
````

This will start the server in **development mode** at `http://localhost:5173`

This will generate the production-ready files in the `dist/` folder.

## 🔧 API Integration

### **Authentication Endpoints**

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/google` - Google OAuth
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset
- `POST /auth/verify-email` - Email verification
- `POST /auth/refresh` - Token refresh

### **User Management Endpoints**

- `GET /users` - List all users (with pagination, search, sort)
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `POST /users/:id/activate` - Activate user
- `POST /users/:id/deactivate` - Deactivate user
- `POST /users/reinvite` - Resend invitation

### **Profile Endpoints**

- `GET /profile` - Get current user profile
- `PUT /profile` - Update current user profile
- `POST /profile/upload` - Upload profile image
- `POST /profile/change-password` - Change password

---

## 🎯 User Roles & Permissions

### **Admin**

- Manage regular users
- View user analytics
- Limited system access
- Cannot modify super admins

### **User**

- View own profile
- Edit own information
- Limited read access
- Cannot access admin features

---

## 🚀 Deployment

### **Development**

```sh
npm run dev
```

---
