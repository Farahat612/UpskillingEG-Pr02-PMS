
# Project Management System (PMS)

## Introduction

This Project Management System (PMS) is a web-based application developed as part of the UpSkillingEG Front-end Job Simulation Bootcamp. It aims to provide a comprehensive solution for managing projects, tasks, and team members.

## Demo

You may watch the following video demo:

[Pms-Demo.webm](https://github.com/user-attachments/assets/9bfdd463-e553-48bd-8495-b81016406043)

> Or you can try the live demo yourself [here](https://upskilling-pms.netlify.app/).

## Features

### User Authentication and Authorization

- **User Authentication:** Secure login and registration system to manage user access.
- **User Roles:** Differentiated user roles, including Manager and Employee users, to control access levels within the application.

### Task Management

- **Browse Tasks:** Users can browse through a list of tasks, with options to filter by categories or tags.
- **Recipe Details:** View detailed information about a recipe, including ingredients, preparation steps, and images.
- **Add and Edit Tasks:** Users with appropriate permissions can add new tasks or edit existing ones, including uploading images and specifying categories and tags.
- **Favorites:** Users can mark tasks as favorites for easy access later.

### Dashboard

- **Admin Dashboard:** A dashboard for SuperAdmin users to manage tasks, categories, and tags, and view system statistics.
- **User Dashboard:** A personalized dashboard for regular users to view their favorite tasks and recent activity.

## Project Structure

The project structure is as follows:

- `src/`: Source code for the application.
  - `assets/`: Static assets.
  - `components/`: Reusable components.
  - `contexts/`: React context for state management.
  - `hooks/`: Custom React hooks.
  - `layouts/`: UI layouts.
  - `pages/`: Application pages.
  - `types/`: TypeScript interfaces and types.
  - `utils/`: Utility functions.
- `public/`: Static assets.
- `.eslintrc.cjs`: ESLint configuration.
- `index.html`: Entry point for the application.
- `package.json`: Project metadata and dependencies.

## Technologies Used

- **React.js:** For building the user interface.
- **React-hook-form:** For form validation.
- **React Bootstrap:** For styling.
- **React Toastify:** For toast notifications.
- **React Icons:** For icons.
- **Context API:** For managing application state across components.
- **React-Pro-Sidebar:** For sidebar.
- **Chart.js:** For dashboard charts.
- **Framer-motion:** For drag and drop animation.

## Skills and Techniques Covered

- **React Development**: Utilizing functional components, hooks (e.g., `useState`, `useEffect`, `useContext`), and `the context API` for state management across the application.

- **Routing and Navigation**: Implemented client-side routing using `react-router-dom` with route protection to manage navigation between different parts of the application.

- **Form Handling and Validation**: Leverageing `react-hook-form` for efficient form handling and validation, ensuring a smooth user experience when submitting data.

- **API Integration**: Used `axios` for making HTTP requests to protected and public endpoints, as seen in the [`apiProtected`](src/utils/api.ts) and [`apiPublic`](src/utils/api.ts) utilities.

- **Custom Hooks**: Showcases the creation and use of `custom hooks` (e.g., [`usePieChartData`](src/hooks/other/usePieChartData.ts)) to encapsulate and reuse logic across components.

- **Error Handling and Notifications**: Implements error handling strategies and user notifications using `react-toastify`, enhancing the user interface and experience.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- A modern web browser

### Installation

To get the application running locally on your machine, follow these steps:

1. Clone the repo

   ```sh
   git clone https://github.com/Farahat612/UpskillingEG-Pr02-PMS
   ```

2. Change directory

   ```shell
   cd UpskillingEG-Pr02-PMS
   ```

3. Install dependencies

   ```shell
   npm install
   ```

4. Start the development server

   ```shell
   npm run dev
   ```

5. Visit `http://127.0.0.1:5173/` in your browser.

## Acknowledgment

> This applicetion was developed and built as part of UpSkillingEG `frontend job simulation bootcamp`, following their `Figma` design guidelines and `API` docs.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
