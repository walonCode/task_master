
# TaskMaster - Ultimate Task Manager

TaskMaster is a **Next.js**-powered task management app with **MongoDB** for storage, **Tailwind CSS** for styling, and **Kinde Auth** for secure authentication. Track your tasks **weekly, daily, monthly, or as one-time** with an intuitive and modern UI.

---

## 🚀 Features

- **Task Tracking**: Categorize tasks as **daily, weekly, monthly, or one-time**.
- **Real-time Updates**: View tasks dynamically without refreshing the page.
- **Authentication**: Secure login/signup using **Kinde Auth**.
- **Task Prioritization**: Set priorities for each task to stay organized.
- **Fully Responsive**: Optimized for mobile, tablet, and desktop.
- **Database Integration**: Uses **MongoDB** for persistent data storage.
- **Dark Mode Support**: A sleek dark theme for comfortable viewing.
- **Drag & Drop**: Easily reorder tasks.

---

## 📌 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/taskmaster.git
   cd taskmaster
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:
   - Create a `.env.local` file and add:
     ```env
      ACCESS_TOKEN_SECRET=""
      DATABASE_URI=""
      domain=""
      KINDE_CLIENT_ID=""
      KINDE_CLIENT_SECRET=""
      KINDE_ISSUER_URL=""
      KINDE_SITE_URL=""
      KINDE_POST_LOGOUT_REDIRECT_URL=""
      KINDE_POST_LOGIN_REDIRECT_URL=""
      NEXT_PUBLIC_API_URL=""
     ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

- `app/`: Main app pages and components.
  - `page.tsx`: Task dashboard.
  - `api/`: API routes for tasks and authentication.
- `components/`: Reusable UI elements.
- `libs/`: Utilities and database configuration.
- `libs/models`: Mongoose models and schema.

---

## 🛠️ How It Works

### Frontend
- Built with **React + Next.js** for a fast, interactive UI.
- **Server-side rendering (SSR)** and **static site generation (SSG)** for performance.
- Uses **Tailwind CSS** for a modern and clean design.

### Backend
- **API routes** (`app/api/`) handle task operations.
- **MongoDB + Mongoose** for data storage.
- **Kinde Auth** for secure login.

---

## 🚀 Deployment

### Deploy on Vercel
The easiest way to deploy TaskMaster is via **Vercel**.

1. Push your code to **GitHub**.
2. Import the repo into **Vercel**.
3. Vercel automatically deploys the app.

### Other Platforms
TaskMaster can also be deployed on Netlify, AWS, or via Docker.

---

## 🏗️ Technologies Used

- **Next.js**: Full-stack React framework.
- **TypeScript**: Static typing.
- **Tailwind CSS**: Modern styling.
- **MongoDB + Mongoose**: Database.
- **Lucide-React + React-Icons**: Icons
- **Kinde Auth**: Secure authentication.
- **Vercel**: Deployment.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Added new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a **pull request**.

---

## 📜 License

TaskMaster is licensed under the **MIT License**. See the `License.txt` file for details.
