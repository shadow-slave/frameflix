
# 🎬 FrameFlix
[Live Demo](https://shadow-slave.github.io/frameflix/index.html)

FrameFlix is a sleek, responsive web application that fetches and displays movie data from [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api).
Users can view popular, top-rated, and trending movies, search by title, and filter by genre. Clicking on a movie reveals detailed information and an embedded trailer.

---

## 📑 Table of Contents

* [Features](#-features)
* [Installation](#-installation)
* [Usage](#-usage)
* [Configuration](#-configuration)
* [Dependencies](#-dependencies)
* [File Structure](#-file-structure)
* [Screenshots](#-screenshots)
* [Troubleshooting](#-troubleshooting)
* [Contributors](#-contributors)
* [License](#-license)

---

## ✨ Features

* Fetches real-time data from TMDB API.
* Filter movies by genre (button or dropdown).
* View popular, top-rated, and trending movie lists.
* Responsive layout and interactive animations (via GSAP).
* Detailed movie view with trailer embedding.
* Local storage used for data transfer between pages.

---

## 💾 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/frameflix.git
   ```
2. Navigate to the project directory:

   ```bash
   cd frameflix
   ```
3. Open `index.html` in a web browser.

---

## 🚀 Usage

1. On load, FrameFlix shows popular movies.
2. Use the top menu to switch to "Top⭐" or "Trending🔥".
3. Filter by genre using buttons or dropdown.
4. Search movies by title.
5. Click on any movie card to view detailed info and trailer.

---

## ⚙️ Configuration

* Replace the placeholder TMDB API key in `script.js`:

  ```js
  const API_KEY = "YOUR_TMDB_API_KEY";
  ```

---

## 📦 Dependencies

* [TMDB API](https://www.themoviedb.org/)
* [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)

CDN:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
```

---

## 📁 File Structure

```
├── index.html              # Main movie listing UI
├── movie-details.html      # Movie details and trailer page
├── styles.css              # All custom styling
├── script.js               # Core JavaScript logic (API calls, filtering, DOM updates)
```

---

## 🖼️ Screenshots

![Screenshot 2025-06-22 002734](https://github.com/user-attachments/assets/2d621564-932b-4cd7-89e4-a0ba7fdabc23)
![Screenshot 2025-06-22 002812](https://github.com/user-attachments/assets/2114c053-41a5-4123-84cf-4fdc2b0b1463)
![Screenshot 2025-06-21 200827](https://github.com/user-attachments/assets/ad941a95-49f7-41c7-9965-261cabfc698d)


---

## 🛠️ Troubleshooting

* **Movies not showing**: Ensure you have a valid API key.
* **CORS issues**: Run via local server (e.g. `Live Server` extension in VSCode) to avoid CORS blocks.
* **Trailer not appearing**: Some movies may not have trailers available on YouTube.

---

## 👥 Contributors

* Aswin - [GitHub](https://github.com/shadow-slave)

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

