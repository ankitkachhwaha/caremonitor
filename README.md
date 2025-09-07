
# CareMonitor Angular Challenge

## Overview
This is an Angular 18 application built as part of the CareMonitor interview challenge.  
It demonstrates authentication, route guards, lazy loading, state management, UI design, and testing in a clean, production-like structure.

---

# Features
- **Login Page**
  - Reactive form with validation.
  - Cookie-based authentication (`ngx-cookie-service`).
  - Redirects to dashboard after successful login.

- **Authentication**
  - Route guard (`AuthGuard`) protects dashboard and list routes.
  - Separate LoginGuard prevents logged-in users from revisiting the login page.
  - Logout clears cookie + state.

- **Dashboard**
  - Displays logged-in user’s email.
  - Navigation to the List page.

- **List Page (Lazy Loaded)**
  - Uses **NgRx Component Store** for state management.
  - Fetches items from a **backservice**.
  - Handles **loading** and **error** states gracefully.

- **Mock Backend**
  - `/api/login` → returns token + user object.
  - `/api/items` → returns array of items (requires auth token).

- **UI/UX**
  - Angular Material components.
  - Clean SCSS with responsive breakpoints.

- **Testing**
  - Unit tests for services, stores, and components.
  - Run with `ng test --code-coverage`.

---

Architecture & Approach

### Layers
- **Core Layer**  
  - `AuthService`, `UserStore`, guards, interceptors.
- **Features**  
  - Login, Dashboard, List (lazy-loaded).
- **Shared**  
  - Angular Material setup.
  - variable sccs
- **State Management**  
  - Lightweight `ComponentStore` (NgRx) per feature.
- **Backend service**  
  - Interceptor simulating API responses.
- **Presentation**  
  - Angular Material UI components + responsive SCSS.

Approach
- **Separation of concerns** (core vs features vs shared).
- **Reactive** state management with RxJS & ComponentStore.
- **Self-contained**: no external backend needed.
- **Best practices**: lazy loading, guards, interceptors, unit tests.
- **Human-readable code**: clean structure, not AI-generated boilerplate.

---

 Setup Instructions

1. Clone repository
```bash
git clone https://github.com/<your-username>/caremonitor.git
cd caremonitor
