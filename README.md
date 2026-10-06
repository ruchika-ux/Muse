# Muse 🌿

> A little world of you.

Muse is a modern personal life and goals dashboard built with React and JavaScript. It provides a beautiful space to organize goals, interests, memories, and milestones in one place.

The project focuses on practical React development, clean component architecture, CRUD operations, responsive UI, and a polished user experience.

## ✨ Features

- 📝 Create, edit and delete personal items
- 🎯 Manage Goals, Interests, Memories and Milestones
- 🔍 Search items by title, description, location and tags
- 🏷️ Filter items by category
- 📅 Chronological timeline view
- 📖 Individual item detail pages
- 💾 LocalStorage-based data persistence
- 🧭 Category-aware navigation using URL parameters
- 📱 Responsive design for desktop and mobile
- 🎨 Modern editorial-style UI
- ✨ Smooth animations and transitions
- 🖼️ Dynamic background image slideshow
- 🚫 Custom 404 / Not Found page

## 🛠️ Tech Stack

- **React.js** — UI development
- **JavaScript (ES6+)** — Application logic
- **Vite** — Development and build tooling
- **React Router** — Client-side routing
- **Tailwind CSS** — Styling and responsive design
- **Framer Motion** — Animations and transitions
- **LocalStorage** — Client-side persistence

## 📂 Project Structure

```text
src/
├── components/
│   ├── common/
│   ├── items/
│   └── layout/
├── pages/
│   ├── Home.jsx
│   ├── Explore.jsx
│   ├── Timeline.jsx
│   ├── ItemDetail.jsx
│   └── NotFound.jsx
├── hooks/
│   └── useItems.js
├── services/
│   └── storageService.js
├── data/
│   ├── seedData.js
│   └── heroImages.js
├── utils/
└── styles/
