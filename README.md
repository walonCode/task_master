
# TaskMaster - Ultimate Task Manager

TaskMaster is a **Next.js**-powered task management app with **MongoDB** for storage, **Tailwind CSS** for styling, and **Custom Auth** for secure authentication. Track your tasks **weekly, daily, monthly, or as one-time** with an intuitive and modern UI.

---

## 🚀 Features

- **Task Tracking**: Categorize tasks as **daily, weekly, monthly, or one-time**.
- **Real-time Updates**: View tasks dynamically without refreshing the page.
- **Authentication**: Secure login/signup using **Custom Auth**.
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
     DATABASE_URL=your_mongodb_url
     NEXT_PUBLIC_API_URL=http://localhost:3000/api
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
- `database/`: Mongoose models and schema.

---

## 🛠️ How It Works

### Frontend
- Built with **React + Next.js** for a fast, interactive UI.
- **Server-side rendering (SSR)** and **static site generation (SSG)** for performance.
- Uses **Tailwind CSS** for a modern and clean design.

### Backend
- **API routes** (`app/api/`) handle task operations.
- **MongoDB + Mongoose** for data storage.
- **Custom authentication** for secure login.

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
- **Custom Auth**: Secure authentication.
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
