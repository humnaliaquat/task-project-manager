# Task & Project Manager (Client)

This is the **frontend client** for the Task & Project Manager application, built with **React + TypeScript + Vite**.

---

## 🚀 Tech Stack
- React 19
- TypeScript
- Vite 7
- ESLint (for linting)

---

## 📂 Folder Structure

```
client/
│── public/           # Static assets
│── src/
│   ├── assets/       # Images, fonts, global styles
│   ├── components/   # Reusable UI components
│   ├── features/     # Feature-based modules (tasks, projects, auth, etc.)
│   ├── hooks/        # Custom React hooks
│   ├── layouts/      # App layouts (Dashboard, Auth, etc.)
│   ├── lib/          # API clients, utils, helpers
│   ├── pages/        # App pages
│   ├── routes/       # App routing config
│   ├── store/        # State management (Zustand/Redux)
│   ├── types/        # TypeScript types/interfaces
│   ├── App.tsx       # Main app entry
│   └── main.tsx      # React DOM entry
│── package.json
│── tsconfig.json
│── vite.config.ts
```

---

## ⚙️ Setup & Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd client
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Preview production build
```bash
npm run preview
```

---

## 🧹 Linting

Run ESLint to check for issues:
```bash
npm run lint
```

---

## 📌 Notes
- Make sure **Node.js (>=18)** is installed.
- This project uses **TypeScript strict mode**.
- Keep feature-specific logic inside `src/features/` for scalability.

---

## 📄 License
MIT License
