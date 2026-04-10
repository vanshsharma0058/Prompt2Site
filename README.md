# 🚀 Prompt2Site – AI Website Builder with SaaS Billing

## 🌍 Live Demo

👉 https://prompt2site-1-cvux.onrender.com/

---

## 📌 Overview

Prompt2Site is a full-stack SaaS application that allows users to generate websites using AI and manage usage through a credit-based system. It includes secure payment integration, real-time updates, and a modern dashboard experience.

---

## ✨ Features

* 🤖 AI-powered website generation
* 💳 Razorpay payment integration
* 🔐 Secure payment verification using HMAC SHA256
* 💰 Credit-based system (plans & usage)
* 📊 Payment history dashboard with filters
* 🔄 Real-time UI updates using Redux (no reload)
* 🌙 Responsive modern UI (Tailwind CSS)
* 🚫 Custom 404 Page
* 🔍 Filter payments by plan & date

---

## 💳 Payment Flow

1. User selects a plan
2. Backend creates Razorpay order
3. Razorpay checkout opens
4. User completes payment
5. Frontend sends payment details to backend
6. Backend verifies signature securely
7. User credits & plan updated in real-time

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Redux Toolkit
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Payment Gateway

* Razorpay

### Deployment

* Backend: Render

---

## 📊 Payment History

* View all transactions
* Shows plan, credits, amount, and status
* Filter by:

  * Plan (Free / Pro / Enterprise)
  * Date (Last 7 / 30 days)

---

## 🔐 Security

* HMAC SHA256 signature verification
* Secure environment variables
* Protected routes with authentication middleware

---

## 📁 Folder Structure

```
Prompt2Site/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── middlewares/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── utils/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/prompt2site.git
cd prompt2site
```

---

### 2️⃣ Backend Setup

```
cd Backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
JWT_SECRET=your_secret
```

Run backend:

```
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🚀 Future Enhancements

* 📄 Invoice PDF generation
* 🔔 Webhook integration
* 📊 Admin dashboard
* 💳 Subscription-based billing
* 📈 Analytics (usage & revenue)

---

## 👨‍💻 Author

**Vansh Sharma**
Full Stack Developer

---

## ⭐ Highlights

* Built a real SaaS billing system
* Integrated secure payment gateway
* Implemented real-time UI updates
* Deployed full-stack app on cloud

---

## 📌 Conclusion

This project demonstrates end-to-end SaaS development including authentication, payment integration, backend security, and modern frontend UI/UX.

---

> 💡 Feel free to fork, explore, and build upon this project!
