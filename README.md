# 🚀 Job Role Management System – MERN Stack

A full-stack MERN application to manage job roles efficiently with features like CRUD operations, role-based access, pagination, search, sorting, and a modern responsive UI.

---

## 📌 Features

- ✅ Create, Read, Update, Delete Job Roles  
- 🔍 Search by job title & department  
- ⏱️ Sort by creation date (Newest / Oldest)  
- 🌗 Theme toggle (Light/Dark)  
- 📄 Pagination for job roles  
- ⚛️ State management using Redux Toolkit  
- 🎨 Clean, responsive UI with MUI  
- 🧠 Validation, toast notifications, loading indicators  
- 🔗 Routing for `/list`, `/add`, and `/edit/:id`  

---

## 🔧 Tech Stack

| Layer       | Technology           |
|-------------|----------------------|
| Frontend    | React.js + Hooks     |
| State Mgmt  | Redux Toolkit        |
| UI Library  | Material-UI (MUI)    |
| Backend     | Node.js + Express.js |
| Database    | MongoDB + Mongoose   |
| Routing     | React Router DOM     |
| Notifications | React Toastify     |

---

## 📁 Folder Structure

```
job-role-management
├─ backend
│  ├─ .env
│  ├─ controllers
│  │  └─ jobController.js
│  ├─ models
│  │  └─ JobRole.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  └─ jobRoutes.js
│  └─ server.js
└─ frontend
   ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  └─ vite.svg
   ├─ README.md
   ├─ src
   │  ├─ App.jsx
   │  ├─ components
   │  │  ├─ JobFilters.jsx
   │  │  ├─ JobForm.jsx
   │  │  ├─ JobTable.jsx
   │  │  └─ ThemeToggleButton.jsx
   │  ├─ hooks
   │  │  └─ useDebounce.js
   │  ├─ main.jsx
   │  ├─ pages
   │  │  ├─ AddJobPage.jsx
   │  │  ├─ EditJobPage.jsx
   │  │  └─ JobListPage.jsx
   │  ├─ redux
   │  │  ├─ jobSlice.js
   │  │  └─ store.js
   │  ├─ theme.css
   │  └─ ThemeContext.jsx
   └─ vite.config.js
```

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Shivani6668/Job-Role-Management-System.git
cd Job-Role-Management-System
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
MONGO_URI=your_mongo_connection_string
PORT=5001
```

Run the backend:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---


## 📸 Screenshots

Home Page List All Role

<img width="1876" height="784" alt="image" src="https://github.com/user-attachments/assets/cee2f160-24de-4078-9deb-923524d8d21d" />

Add Job role form
<img width="1368" height="826" alt="image" src="https://github.com/user-attachments/assets/eac62a62-a6d8-4b08-a682-39831897d713" />

Update Job Role Form
<img width="1205" height="812" alt="image" src="https://github.com/user-attachments/assets/281730de-678f-411f-accc-4c4601fc436e" />


---

## 📝 License

This project is open source and available under the MIT License.

---

## 🔗 GitHub Repository

[https://github.com/Shivani6668/Job-Role-Management-System](https://github.com/Shivani6668/Job-Role-Management-System)
