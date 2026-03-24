# 📸 MERN Image Upload App (Cloudinary Integration)

A full-stack MERN application that allows users to upload an image along with basic details (name and age), store the data in MongoDB, and display it in a modern card-based UI.

---

## 🚀 Features

* 📤 Upload images using **Cloudinary**
* 🧾 Submit user details (Name, Age)
* 🗄️ Store data in **MongoDB**
* 🎴 Display data as responsive **cards**
* ⚡ Built with **MERN Stack (MongoDB, Express, React, Node.js)**
* 🎨 Styled using **Tailwind CSS**

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Multer (for file handling)

### Cloud

* Cloudinary (Image Storage)

---

## 📁 Project Structure

```
mern-image-app/
│
├── client/                # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Card.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server/                # Backend
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── controllers/
│   │   └── userController.js
│   ├── config/
│   │   └── cloudinary.js
│   ├── server.js
│   └── .env
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/mern-image-app.git
cd mern-image-app
```

---

### 2️⃣ Setup Backend

```
cd server
npm install
```

Create a `.env` file inside `/server`:

```
MONGO_URI=mongodb://localhost:27017/cloudinaryDemo
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

Start backend server:

```
node server.js
```

---

### 3️⃣ Setup Frontend

```
cd client
npm install
npm run dev
```

---

## ☁️ Cloudinary Setup

1. Create an account at https://cloudinary.com
2. Go to Dashboard
3. Copy:

   * Cloud Name
   * API Key
   * API Secret
4. Paste them into your `.env` file

---

## 🔄 API Endpoints

### ➕ Create User (Upload Image)

```
POST /api/users
```

**Form Data:**

* name (string)
* age (number)
* image (file)

---

### 📥 Get All Users

```
GET /api/users
```

---

## 🧪 How It Works

1. User fills the form and uploads an image
2. Image is sent to backend using FormData
3. Backend uploads image to Cloudinary
4. Cloudinary returns image URL
5. URL + user data is stored in MongoDB
6. Data is fetched and displayed as cards

---

## 🎨 UI Preview

* Clean card layout
* Image preview
* Responsive grid system

---

## ⚠️ Common Issues

| Issue                  | Solution                    |
| ---------------------- | --------------------------- |
| Image not uploading    | Check `req.file` in backend |
| Cloudinary error       | Verify API keys             |
| MongoDB not connecting | Check `MONGO_URI`           |
| CORS error             | Enable `cors()` in server   |

---

## 🚀 Future Improvements

* 🔐 Add JWT Authentication
* ✏️ Edit/Delete functionality
* 📸 Image preview before upload
* ☁️ Deploy (Render + Vercel + MongoDB Atlas)
* 🎨 Enhanced UI/UX

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Developed by **Mohammed Sarfraz**

---
