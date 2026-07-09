# Arrow - Freelance Micro-Task Platform

![Arrow Screenshot](./screenshot.png)

**Live Site URL:** [https://arrow-work.vercel.app/](https://arrow-work.vercel.app/)

## 📖 Overview

Arrow is a full-stack freelance marketplace designed to facilitate quick, one-time jobs such as graphic design, content writing, and technical bug fixes. The platform connects clients with skilled freelancers through a secure, feature-rich environment. It supports three distinct user roles — Admin, Client, and Freelancer — each with tailored dashboards and functional permissions.

## ✨ Core Features

* **Role-Based Access Control:** Secure, multi-role dashboard system (Admin, Client, Freelancer) using server-side route guards and API middleware.
* **Secure Payments:** Integrated Stripe Checkout for seamless, reliable transaction processing upon task approval.
* **Advanced Auth:** Authentication handled via BetterAuth, supporting both Email/Password and Google OAuth.
* **Dynamic Marketplace:** Server-side pagination and real-time filtering for task searching and category browsing.
* **Data Visualization:** Admin-specific dashboard with interactive charts via Recharts to monitor platform health, total revenue, and user activity.

## 🛠️ Technology Stack

* **Frontend:** Next.js (App Router), Tailwind CSS, HeroUI, Lucide React
* **Backend:** Express.js, MongoDB (Node Driver)
* **Authentication:** BetterAuth
* **Payments:** Stripe Node SDK

## 📦 Dependencies

```
next
react
react-dom
tailwindcss
express
mongodb
better-auth
stripe
heroui
daisyui
recharts
lucide-react
```

> ⚠️ Update this list with the exact packages from your `package.json` — this is a placeholder based on what's been mentioned so far.

## 🚀 Getting Started Locally

1. Clone the repo

   ```bash
   git clone https://github.com/rupesh-saha/Arrow-Work.git
   cd Arrow-Work
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables — create a `.env.local` file in the root:

   ```env
   NEXT_PUBLIC_API_URL=
   BETTER_AUTH_SECRET=
   MONGODB_URI=
   STRIPE_SECRET_KEY=
   STRIPE_WEBHOOK_SECRET=
   ```

4. Run the dev server

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔗 Links

* **Live Site:** [https://arrow-work.vercel.app/](https://arrow-work.vercel.app/)
