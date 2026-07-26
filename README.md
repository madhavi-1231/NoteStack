# NoteStack 📝

**Effortless Note-Taking, Perfectly Organized**

---

NoteStack is a modern, full-stack note-taking application built to help users capture, organize, and manage their notes efficiently. It provides a clean, responsive interface with secure authentication and powerful note management features.

Built with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** and styled using ** CSS** for a modern user experience.

---

## ✨ Features

- 🔐 **JWT Authentication** – Secure user registration and login.
- 📝 **Create, Read, Update & Delete Notes** – Easily manage your notes.
- 🏷️ **Tags Support** – Organize notes with custom tags.
- 🔍 **Search Functionality** – Search notes instantly by title or content.
- 📱 **Responsive Design** – Works seamlessly on desktop, tablet, and mobile.
- 🌐 **Protected Routes** – Only authenticated users can access their dashboard.
- ⚡ **Fast Performance** – Built with React + Vite for a smooth experience.
- 🎨 **Modern UI** – Clean and attractive interface using Tailwind CSS.

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
-  CSS
- React Router DOM

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Bcrypt.js
- CORS

---

# 📂 Project Structure

```
NoteStack
│
├── backend
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── index.js
│   └── .env
│
├── frontend
│   └── notes-app
│       ├── src
│       ├── public
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/NoteStack.git

cd NoteStack
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
PORT=3000
```

Run the backend.

```bash
npm start
```

---

## 3. Frontend Setup

```bash
cd frontend/notes-app

npm install

npm run dev
```

---

# 🌍 Deployment

## Backend (Render)

- Push backend code to GitHub.
- Create a Web Service on Render.
- Root Directory: `backend`
- Build Command:

```bash
npm install
```

- Start Command:

```bash
node index.js
```

Add Environment Variables:

```
MONGODB_URI
JWT_SECRET_KEY
PORT
```

---

## Frontend (Vercel)

- Import GitHub Repository.
- Root Directory:

```
frontend/notes-app
```

Environment Variable:

```
VITE_APP_BASE_URL=https://your-backend-url.onrender.com
```

Deploy.

---

# 📸 Screenshots

## 🏠 Landing Page

_Add screenshot here_

---

## 🔐 Login Page

_Add screenshot here_

---

## 📋 Dashboard

_Add screenshot here_

---

## ➕ Add Note

_Add screenshot here_

---

## ✏️ Edit Note

_Add screenshot here_

---

# 👨‍💻 Author

**Your Name**

- GitHub: https://github.com/yourusername
- LinkedIn: https://linkedin.com/in/yourprofile
- Email: your-email@example.com

---

# ⭐ Support

If you like this project, don't forget to **⭐ Star** the repository on GitHub!

---

# 📄 License

This project is licensed under the **MIT License**.
