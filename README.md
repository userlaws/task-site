# Creative Task List

A modern, Next.js-based task management web application built with TypeScript, Tailwind CSS, and Radix UI components. This project was created using **V0**, showcasing how easy it is to generate and manage a functional task list application. This is primarily for personal use to keep track of tasks.

## Features

- **Task Management**: Create, edit, delete, and complete tasks.
- **Scheduling**: Set due dates and times with calendar support.
- **Status Indicators**: Visual cues for tasks that are on time, approaching deadlines, or late.
- **Local Storage Persistence**: Tasks are saved in your browser, ensuring your data remains intact on refresh.
- **Trash Bin**: Deleted tasks are stored temporarily and can be restored or permanently deleted.
- **Automatic Backup**: Generates a JSON backup of tasks whenever a new task is added.
- **Responsive UI**: Built with Radix UI and Tailwind CSS for an accessible, responsive design.

## Tech Stack

- **Next.js** (v14)
- **TypeScript**
- **Tailwind CSS**
- **Radix UI**
- **Date Utilities**: date-fns, dayjs, luxon, moment, and more for handling date and time functionalities.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/userlaws/task-site.git
   cd creative-task-list
   ```

2. **Install dependencies:**

   Using npm:
   ```bash
   npm install
   ```
   Or using Yarn:
   ```bash
   yarn install
   ```

### Running the Application

Start the development server:

```bash
npm run dev
```
or
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```plaintext
.
├── app
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Layout component
│   └── page.tsx            # Home page that renders the TaskList
├── components
│   ├── Task.tsx            # Component to display individual tasks
│   ├── TaskForm.tsx        # Form for creating tasks
│   ├── TaskList.tsx        # Component that displays all tasks and manages their state
│   ├── ExportButton.tsx    # Component to export tasks as JSON
│   └── theme-provider.tsx  # Theme provider for the UI
├── lib
│   └── utils.ts            # Utility functions (e.g., className merging)
├── public                  # Static assets (images, icons, etc.)
├── styles                  # Additional styling files
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── next.config.mjs         # Next.js configuration
```

## Customization

- **Styling**: Customize styles using the Tailwind configuration in `tailwind.config.js` or modify global styles in `app/globals.css`.
- **Components**: Update or extend functionality by editing components in the `components` folder.
- **Configuration**: Adjust Next.js settings in `next.config.mjs` and TypeScript settings in `tsconfig.json`.

## Acknowledgements

- Built with [V0](https://v0.dev/), [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [Radix UI](https://www.radix-ui.com/).
- Iconography provided by [Lucide](https://lucide.dev/).

