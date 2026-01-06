# Reaction Server ⚡
> A full-stack application engineered with a decoupled architecture, utilizing the Repository Pattern to securely manage authentication, game metrics, and user persistence.

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) 
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/) [![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)
***
### 🔗 Quick Links
- **🚀 [Live Site](https://trainreaction.gg)** 
- **🎥 [Demo Video](https://michaelgreenl.net/#projects?slug=reaction&autoplay=true)** 
- **🖥️ [Frontend Repository](https://github.com/michaelgreenl/reaction-client)** 
- **💼 [Portfolio Link](https://michaelgreenl.net/#projects?slug=reaction&autoplay=false)** 

---
## 📖 Overview
> A production-ready Node.js/Express API designed to securely manage user authentication, game statistics, and player settings with a focus on modular architecture and robust security standards.

Built on Node.js and Express, this API leverages PostgreSQL as its primary data store, orchestrated via Sequelize for object-relational mapping. The architecture strictly follows the MVC pattern extended with a Repository Layer, ensuring a clean separation between HTTP handling, business logic, and database interactions.

---
## ⚡ Technical Highlights
#### Repository Pattern Implementation
Database queries are abstracted away from Controllers into dedicated Repositories (`src/db/repositories`), promoting cleaner code and easier testing.
#### Centralized Middleware Configuration
Unlike typical Express apps that clutter `app.js`, this project aggregates middleware (CORS, Helmet, Rate Limiting) into a modular configuration array in `src/config/index.js`.
#### Defense-in-Depth Security
Implements meaningful security layers including `helmet` for header hardening, `express-rate-limit` for DDoS protection, and `express-slow-down` to mitigate brute-force attacks.
#### Orchestrated Entity Initialization
The User creation flow (`user.controller.js`) automatically provisions dependent resources (Stats and Settings) in a unified sequence, ensuring data consistency for new accounts.

---
## 🏗️ Architecture & Design Decisions 
#### HTTP-Only Cookies for Auth
Instead of storing JWTs in LocalStorage (which is vulnerable to XSS), I use `Boxed Cookies` (HTTP-Only, Secure, SameSite). This decision prioritizes security over the slight convenience of client-side token access.
#### Declarative App Entry Point
`app.js` was intentionally kept minimal by offloading setup logic to `src/config`. This makes the application entry point readable at a glance and simplifies the addition of new global middleware.

---
### 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL, Sequelize ORM
- **Infrastructure:** Docker, Render

---
