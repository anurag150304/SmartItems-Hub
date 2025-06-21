# 🛍️ SmartItems Hub

A full-stack web application for managing and viewing a catalog of items, such as clothing and sports gear. Users can add items with images, browse existing items, view detailed information in a carousel modal, and send inquiries via email.

---

## 📚 Tech Stack

### Frontend

* **Framework**: React.js (with TypeScript)
* **Styling**: Tailwind CSS
* **Package Manager**: `pnpm`

### Backend

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB (via Mongoose ODM)
* **Image Hosting**: Cloudinary (for persistent cloud image storage)
* **Email Service**: **Nodemailer** (more reliable and configurable than EmailJS for server-side usage)

---

## 🔧 Features

### 🖊️ Add Items Page (`/add`)

* Add a new item with:

  * Item Name
  * Item Type (Dropdown: Shirt, Pant, Shoes, Sports Gear, etc.)
  * Item Description
  * Item Cover Image
  * Item Additional Images (Multiple)
* Success Message: `Item successfully added`

### 👁️ View Items Page (`/view`)

* Display all items (static + user-submitted)

  * Show Item Name & Cover Image
* Click on item opens modal:

  * Full Description
  * Item Type
  * Cover + Additional Images in a carousel
  * "Enquire" button (sends email)

### ✉️ Inquiry Feature

* Clicking "Enquire" sends an email with item details to a static email ID.

---

## 🗃️ Project Structure

```bash
smartitems-hub/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   │   └── cloudinary.ts
│   ├── uploads/ (optional - for fallback/testing only)
│   ├── .env
│   ├── server.ts
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   ├── tailwind.config.js
│   ├── index.html
│   ├── tsconfig.json
├── package.json (workspace managed with pnpm)
└── README.md
```

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

* Node.js installed
* `pnpm` installed globally: `npm i -g pnpm`
* MongoDB running locally or via Atlas
* Cloudinary Account

### 📦 Installation

```bash
git clone https://github.com/your-username/smartitems-hub.git
cd smartitems-hub
pnpm install
```

### 🚀 Start Project

```bash
# In one terminal
cd backend && pnpm dev

# In another terminal
cd frontend && pnpm dev
```

---

## 🧩 Backend Details

### 🔐 Environment Variables (`.env`)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/smartitems
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_pass
EMAIL_RECEIVER=receiver_email@example.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 📫 Email (Nodemailer)

* Nodemailer configured to use Gmail/SMTP
* Sends item info when "Enquire" is clicked

### ☁️ Cloudinary Image Uploads

* Use `multer-storage-cloudinary` to upload images
* Images stored in Cloudinary folder `smartitems`
* Access images using URLs from Cloudinary

**Cloudinary Setup (in `utils/cloudinary.ts`)**:

```ts
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'smartitems',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

export { cloudinary, upload };
```

### 🔌 API Endpoints

```http
POST /api/items        - Add new item
GET  /api/items        - Fetch all items
POST /api/enquire/:id  - Send enquiry email for item
```

---

## 🖥️ Frontend Details

### 📘 Pages

* `/add` → Add Item Form
* `/view` → View Items Grid

### 🧩 Components

* **ItemCard**: Displays item preview (name + cover)
* **ItemModal**: Opens on click with carousel & details
* **Carousel**: Tailwind-based image slider
* **Form**: Controlled form with validations

### ⚙️ Features

* Uses React Hooks + TypeScript
* Responsive layout with Tailwind
* Axios for API calls
* Form validation with `react-hook-form`
* Image carousel for additional images
* Inquiry email with item info
* Cloudinary-based image storage for production-ready hosting

---

## 🚧Improvements

* User authentication (Admin-only Add Item)
* Inquiry form for name/email/message
* Pagination or filtering for items

---

## 🧑‍💻 Author

Built by Anurag Mishra

---

## 📄 License

This project is licensed under the MIT License.
