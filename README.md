<div align="center">
<a href="https://github.com/busydayhuh/wisharchive" target="_blank">
<img src="./public/favicon-96x96.png" width="90" alt="Logo" />
</a>

<h2>WISH ARCHIVE</h2>

![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![](https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white)
![](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![](https://img.shields.io/badge/shadcn-black?style=for-the-badge&logo=shadcnui&logoColor=white)

<p>Create wishlists and share them with friends</p>

<img src ="./public/cover-image.png" width="95%" alt="Cover">

</div>

[![Static Badge](https://img.shields.io/badge/lang-ENG-EF4565)](https://github.com/busydayhuh/wisharchive/blob/main/README.md) [![Static Badge](https://img.shields.io/badge/lang-RU-66A0E3)](https://github.com/busydayhuh/wisharchive/blob/main/README.ru.md)

## 💡 Overview

**Wish Archive** is a web application for creating and managing personal wishlists with built-in social interaction. It solves a simple but real problem — helping people organize their wishes and avoid duplicate gifts. Users can create multiple wishlists, add and organize items, and share lists with others. Guests can reserve wishes, while the wishlist owner does not see which items have already been reserved, preserving the element of surprise.

The project is built as a **frontend-focused application** without a custom backend. Authentication, data storage, and access control are handled via a Backend-as-a-Service solution. This approach intentionally shifts part of the business logic to the client side and demonstrates work with:

- optimistic UI updates,
- cache synchronization and invalidation,
- data consistency checks,
- access control and privacy logic.

**Wish archive** is a portfolio pet project with a strong focus on clean architecture, readable code, and frontend practices commonly used in real-world production applications.

## ✨ Features

- 🔐 **Authentication & Permission-Based Access:** Secure user authentication with permission-aware access control for private and public wishlists.
- 🧩 **Full CRUD for Wishes & Wishlists:** Complete create, read, update, and delete workflows for wishes and wishlists with consistent state management.
- 🤝 **Cross-User Interactions (Wish Reservation):** Reservation system that enables safe interaction between users while preventing duplicate gift selections.
- 🔒 **Privacy & Data Access Control:** Public and private wishlists enforced through both UI logic and backend permissions.
- ⚡ **Optimistic UI & Cache Synchronization:** Optimistic updates with rollback handling, manual cache invalidation, and consistency management in a frontend-driven architecture.
- 🔄 **Wish Organization:** Ability to move and reorganize wishes between lists while maintaining data integrity.
- 📱 **Responsive & Adaptive UI:** Fully responsive interface designed to work seamlessly across desktop and mobile devices.

## 🛠️ Technologies Used

- **React & TypeScript:** Core stack for building a scalable, type-safe frontend with predictable state management and reusable components.
- **Vite:** Modern build tool providing fast development startup, efficient bundling, and optimized production builds.
- **React Router:** Client-side routing with protected routes, dynamic navigation, and state-driven page transitions.
- **SWR:** Data fetching and caching layer with manual cache control, optimistic updates, and fine-grained revalidation strategies.
- **Appwrite (Backend-as-a-Service):** Used for authentication, database management, file storage, and permission handling without a custom backend.
- **React Hook Form & Zod:** Performant form management combined with schema-based validation for reliable user input handling.
- **ESLint & Architectural Boundaries:** Enforced code quality and architectural constraints to maintain clear separation of concerns.
- **Responsive UI Architecture:** Component-driven layout system designed for adaptability across different screen sizes and devices.

## 🚀 Getting started

Follow the steps below to run the project locally.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- An **Appwrite** instance (cloud or self-hosted)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/busydayhuh/wisharchive.git
   cd wisharchive
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create an environment file and fill in the required environment variables:

   ```env
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE = your_database_id
   VITE_APPWRITE_COLLECTION_WISHES = your_wishes_collection_id
   VITE_APPWRITE_COLLECTION_WISHLISTS = your_wishlists_collection_id
   VITE_APPWRITE_COLLECTION_USERS = your_users_collection_id
   VITE_APPWRITE_STORAGE_BUCKET = your_bucket_id
   ```

### Running the Project

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at:

```
http://localhost:5173
```

### Production Build

To create an optimized production build:

```bash
npm run build
npm run preview
```

## 🧩 Appwrite Setup

This project uses **Appwrite** as a Backend-as-a-Service for authentication, database storage, and access control. No custom backend is implemented.

### Project Configuration

Create a new Appwrite project and obtain the following values:

- **Project ID**
- **API Endpoint**

These values are required for local development and must be provided via environment variables.

### Authentication

- Email-based authentication is used for user accounts.
- Each user has a unique account ID managed by Appwrite.
- User identity is used as the primary source for permission checks and data ownership.

### Database Structure

The application relies on multiple collections to model users, wishlists, and wishes.

#### Collections

- **Users**
  - Stores public user profile data (e.g. name, age).
  - Linked to Appwrite account IDs.

- **Wishlists**
  - Represents user-created lists.
  - Supports public and private access modes.
  - Ownership and access permissions are enforced at the document level.

- **Wishes**
  - Individual wish items.
  - Each wish references a wishlist ID.
  - Supports cross-user interactions via reservations.

### Permissions & Access Control

- Document-level permissions are used to control read/write access.
- Wishlist owners have full access to their data.
- Other users can read public wishlists and create reservations but cannot modify the underlying wishes.
- Sensitive reservation data is intentionally restricted from the wishlist owner.

### Frontend Responsibility

Due to the limitations of a Backend-as-a-Service environment:

- Business logic such as reservation rules and consistency checks is handled on the frontend.
- Optimistic updates and manual cache invalidation are used to keep the UI responsive.
- Rollback logic is applied in case of failed mutations.

This setup demonstrates how to build robust client-side logic when backend capabilities are constrained.

## 📜 License

Distributed under the MIT License. See [License](/LICENSE) for more information.
