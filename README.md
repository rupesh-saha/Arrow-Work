Arrow: Freelance Micro-Task Platform

Arrow is a full-stack freelance marketplace designed to facilitate quick, one-time jobs such as graphic design, content writing, and technical bug fixes. The platform connects clients with skilled freelancers through a secure, feature-rich environment. It supports three distinct user roles—Admin, Client, and Freelancer—each with tailored dashboards and functional permissions.

### Key Features

* **Role-Based Access Control:** Secure, multi-role dashboard system (Admin, Client, Freelancer) using server-side route guards and API middleware.
* **Secure Payments:** Integrated Stripe Checkout for seamless, reliable transaction processing upon task approval.
* **Advanced Auth:** Authentication handled via BetterAuth, supporting both Email/Password and Google OAuth.
* **Dynamic Marketplace:** Server-side pagination and real-time filtering for task searching and category browsing.
* **Data Visualization:** Admin-specific dashboard with interactive charts via Recharts to monitor platform health, total revenue, and user activity.

### Technology Stack

* **Frontend:** Next.js (App Router), Tailwind CSS, HeroUI, Lucide React.
* **Backend:** Express.js, MongoDB (Node Driver).
* **Authentication:** BetterAuth.
* **Payments:** Stripe Node SDK.

---
