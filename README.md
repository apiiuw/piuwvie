# 🎬 PiuwVie — Movie App

PiuwVie is a Movie web application built with **React + TypeScript** that integrates **TheMovieDB (TMDB) API** as initial data and supports full state-based CRUD operations, bookmark system, sorting, filtering, pagination, and dark/light mode.

This project was developed as part of a Frontend Developer Technical Test.

---

## 🛠 Tech Stack

**Frontend**
- React 19
- TypeScript 5
- Vite 7
- React Router DOM 7

**State Management**
- React Context API

**Styling**
- TailwindCSS 3

**UI & Utilities**
- Lucide React Icons
- TheMovieDB API

---

## 📌 Features

### 🎥 Movie Management
- Fetch movie data from TMDB as initial state
- Create new movies (state-based)
- Update existing movies
- Delete movies
- All data manipulation is handled in local state (no refetch after initialization)

### 🔍 Search, Sort, Filter, Pagination
- Search movies by title
- Sort movies (rating, title, etc.)
- Filter by genre
- Filter by minimum rating
- Pagination (previous / next navigation)

### 🔖 Bookmark System
- Toggle bookmark for movies
- Dedicated Bookmark page
- Animated toast notifications for feedback

### 🎨 UI / UX
- Fully responsive design
- Hero carousel
- Custom modals (Edit & Delete)
- Animated toast notifications
- Rating slider
- Modern card layout

### 🌗 Dark / Light Mode
- Theme toggle (Dark / Light)
- Persisted in localStorage
- Fully theme-aware components

---

## 🧠 Architecture

- TMDB API is used only for initial data loading
- All subsequent Create, Update, and Delete operations are handled via Context API (state-based)
- No Redux used (lightweight state management with Context)
- Modular and scalable folder structure

---

## 📂 Project Structure
```bash
src/
│
├── api/
│   └── tmdb.ts
│
├── components/
│   ├── feedback/
│   │   └── Toast.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   │
│   └── movie/
│       ├── MovieCard.tsx
│       ├── GenreFilter.tsx
│       ├── HeroCarousel.tsx
│       └── modals/
│           ├── CustomizeMovieModal.tsx
│           └── DeleteMovieModal.tsx
│
├── context/
│   └── MovieContext.tsx
│
├── layout/
│   └── index.tsx
│
├── pages/
│   ├── Home.tsx
│   ├── Bookmark.tsx
│   ├── CreateMovie.tsx
│   └── MovieDetail.tsx
│
├── types/
│   └── movie.ts
│
├── utils/
│   └── setPageTitle.ts
│
├── App.tsx
│
└── main.tsx
```
