# 🏛️📚 Library Management System (Arabic & English)

A fully-featured web-based Library Management System with dual-language support (Arabic & English), dark mode, dynamic statistics, responsive design, and complete management of books, members, borrowings, and reports.

---

## ✨ Features

### 🌐 Multi-Language Support
- Switch between **Arabic** and **English** using a single toggle.  
- All UI elements, forms, tables, placeholders, and alerts adapt dynamically.

### 🌙 Dark Mode
- One-click toggle between **Light** and **Dark** themes.  
- Uses CSS variables and `[data-theme="dark"]` for seamless theme switching.

### 📊 Dashboard & Statistics
- Overview of total books, members, borrowings, and activity.  
- Cards highlight popular books, active members, and recent borrowings.

### 📚 Book Management
- Add, edit, delete books.  
- Dynamic table updates (`booksTable`) with live search functionality.

### 👥 Member Management
- Add, edit, delete members.  
- Dynamic table updates (`membersTable`) with live search functionality.

### 📖 Borrowing & Returning
- Borrow books, return books, and extend borrowing period.  
- Updates `borrowTable` dynamically.

### ⚙️ Settings
- Customize library name, borrowing period, and daily fines.  
- Settings persist using localStorage.

### 💾 Backup & Restore
- Export and import data for safe backups.

### 🖥️ Responsive Design
- Fully responsive for desktop, tablet, and mobile screens.  
- Smooth transitions, hover effects, and clean UI for all devices.

### 🛠️ Technical Implementation
- **Manifest & Scripts:** JavaScript-driven functionality for tables, modals, and toggles.  
- **Modals:** Add/Edit Book, Add/Edit Member, Borrow Book, all supporting dual-language.  
- **Alerts:** User notifications for success, danger, and info, adapting to dark/light mode.  
- **Dynamic Updates:** Uses `updatePageData()`, `updateBooksTable()`, `updateMembersTable()`, etc., for real-time table updates.  
- **Navigation:** `showPage(pageId)` manages page visibility.  
- **Search:** Real-time search filtering for books and members.  

---

## 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Alhomaidi1/LibraryManagementSystem.git
````

2. **Open in Browser:**

* Open `index.html` in a modern browser (Chrome, Firefox, Edge).
* No backend required; data stored in `localStorage`.

---

## 🚀 Usage

1. Switch **language** using the language toggle button.
2. Toggle **dark/light mode** using the theme button.
3. Navigate through pages: Dashboard, Books, Members, Borrowings, Reports, Settings.
4. Use the forms and tables to manage the library.
5. Export/Import data for backups.

---

## 🎨 UI & Design Highlights

* Smooth **animations** and **fadeIn effects** for pages and modals.
* **Stat cards** with hover effects and dynamic colors.
* **Tables** with highlighted rows on hover.
* **Forms & Inputs** with focus effects.
* **Sidebar & Header** with gradient backgrounds and responsive adjustments.
* Fully **responsive layouts** for desktops, tablets, and mobile screens.

---

## 📄 License

MIT License

---

## 💡 Author

**Abdulrahman Alhomaidi**
GitHub: [https://github.com/Alhomaidi1](https://github.com/Alhomaidi1)
LinkedIn: [https://www.linkedin.com/in/abdulrahman-alhomaidi](https://www.linkedin.com/in/abdulrahman-alhomaidi)

```

 