# 🎓 ScholarStream - Scholarship Management Platform

ScholarStream is a comprehensive web application designed to bridge the gap between students seeking financial aid and scholarship providers. It simplifies the scholarship application process, making it transparent, efficient, and accessible for everyone.

- **Live Site Link**: [ScholarStream](https://scholar-stream-client.vercel.app/)
- **Github Repository (Client)**: [ScholarStream-client](https://github.com/ShamimWebDev/ScholarStream-client)
- **Github Repository (Server)**: [ScholarStream-server](https://github.com/ShamimWebDev/ScholarStream-server)

## Admin Role Credential

user:admin1@gmail.com
Pass: admin1@gmail.comA

## Moderator Role Credential

user: moderator@gmail.com
Pass:Moderator@123

## Student role Credential

user:student10@gmail.com
Pass: student10@gmail.comA

## 💳 Payment Testing Credential (Stripe Test Mode)
To test the payment gateway functionality, usage the following test card credentials:

| Card Number | Expiry Date | CVC | ZIP/Postal Code |
| :--- | :--- | :--- | :--- |
| **4242 4242 4242 4242** | Any future date (e.g., 12/30) | Any 3 digits (e.g., 123) | Any valid ZIP (e.g., 12345) |

## 🌟 Key Features

### 👨‍🎓 For Students

- **Smart Search**: Find scholarships tailored to your academic profile.
- **Easy Application**: Apply to multiple scholarships with a few clicks.
- **Dashboard**: Track application status (Pending, Processing, Completed) in real-time.
- **Reviews**: Read and write reviews for universities and scholarship programs.
- **Secure Payments**: Integrated Stripe payment gateway for application fees.

### 🛡️ For Moderators

- **Application Management**: Review, approve, or reject scholarship applications.
- **Feedback System**: Provide detailed feedback on rejected applications.
- **Review Moderation**: Monitor and manage user reviews to ensure community guidelines.

### 👑 For Admins

- **User Management**: Manage user roles (Student, Moderator, Admin).
- **Analytics**: Gain insights into platform usage and application trends.
- **System Control**: Oversee the entire platform's operation.

## 🚀 Technologies Used

### Frontend

- **React.js**: Component-based UI library.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **DaisyUI**: Component library for Tailwind CSS.
- **Framer Motion**: Production-ready animation library.
- **Axios**: Promise-based HTTP client.
- **React Icons**: Popular icons for React projects.
- **Stripe.js**: Payment processing integration.
- **Firebase Auth**: Secure user authentication.

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework.
- **MongoDB**: NoSQL database for flexible data storage.
- **JWT**: JSON Web Tokens for secure authentication.

## 🛠️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Atlas connection string)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/scholarstream.git
cd scholarstream
```

### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Run the frontend:

```bash
npm run dev
```

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
DB_USER=your_db_user
DB_PASS=your_db_password
STRIPE_SECRET_KEY=your_stripe_secret_key
ACCESS_TOKEN_SECRET=your_jwt_secret
```

Run the backend:```bash
npm start

```

## 📄 License
This project is licensed under the MIT License.
```
