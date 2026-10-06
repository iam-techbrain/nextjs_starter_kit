# DummyHub Next.js Learning Application

A clean, modular 3-page learning application built with Next.js (App Router), React Context API, and modern CSS consuming public APIs from DummyJSON.

## Description

DummyHub is a production-structured Next.js frontend web application designed to demonstrate core React and Next.js engineering principles. It features client-side and server-side asynchronous data fetching, centralized global state management via `AuthContext`, modular reusable components (`Header`, `Footer`, `ProductCard`, `HeroSection`), and clean API abstraction in `src/lib/api.js`. The application integrates with public endpoints from DummyJSON to provide a multi-page experience including an asynchronous Login flow with token persistence, a real-time Products catalog with interactive cards, and a comprehensive user profile view, all seamlessly wrapped inside a responsive root layout.

## Getting Started

### Dependencies

* Operating System: Windows 10/11, macOS, or Linux
* Runtime: Node.js (v18.17.0 or higher recommended, tested on v24.x)
* Package Manager: npm (v9.0.0 or higher) or yarn / pnpm
* Core Packages:
  * `next` (^14.x or ^15.x) - React Framework with App Router
  * `react` (^18.x or ^19.x) - Frontend library
  * `react-dom` - React DOM rendering engine
  * `lucide-react` (optional) - Modern UI icons

### Installing

* Clone or navigate to the project directory:
  ```bash
  cd "e:\Starter Kit\nextjs_starter_kit"
  ```
* Install all required project dependencies:
  ```bash
  npm install
  ```
* Environment Configuration:
  * Create or verify `.env.local` in the project root:
    ```env
    NEXT_PUBLIC_DUMMYJSON_URL=https://dummyjson.com
    ```

### Executing program

* Running the Next.js Development Server:
  ```bash
  npm run dev
  ```
* Building for Production:
  ```bash
  npm run build
  ```
* Starting the Production Server:
  ```bash
  npm start
  ```
* Accessing the Application:
  * Open your web browser and navigate to:
    ```text
    http://localhost:3000
    ```
* Available Application Routes:
  * `/` — Home / Landing page
  * `/login` — Login portal calling `POST https://dummyjson.com/auth/login`
  * `/products` — Products catalog calling `GET https://dummyjson.com/products`
  * `/profile` — User profile details view calling `GET https://dummyjson.com/users`
* Testing Authentication:
  * Use predefined DummyJSON test credentials on the `/login` page:
    * Username: `emilys`
    * Password: `emilyspass`
    * Alternative: `michaelw` / `michaelwpass`

## Help

* Port 3000 already in use:
  * If port 3000 is occupied, Next.js will automatically suggest another port (e.g., `http://localhost:3001`), or specify a custom port manually:
    ```bash
    npm run dev -- -p 3005
    ```
* Node Version Compatibility:
  * Check your installed version using `node -v`. Next.js requires Node.js v18.17 or higher.
* Invalid Credentials on Login:
  * DummyJSON only accepts registered test accounts. Ensure you use valid credentials such as `emilys` / `emilyspass`.
* Hydration Errors:
  * Ensure browser-only properties like `localStorage` or `window` are accessed inside `useEffect` or client components marked with `'use client'`.

## Authors

* Development Team
* Project Contributor: [@Developer](https://github.com/)

## Version History

* 0.2
  * Added global `AuthContext` for user session management
  * Integrated API service layer in `src/lib/api.js` for DummyJSON communication
  * Implemented responsive ProductCard grid and filter controls
  * Refactored into Next.js App Router (`src/app`) modular architecture
* 0.1
  * Initial project setup with Next.js boilerplate and baseline routing

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

* [DummyJSON](https://dummyjson.com) - Public REST API for realistic mock data and authentication services
* [Next.js Documentation](https://nextjs.org/docs) - App Router and React Server Components documentation
* [PurpleBooth / README-Template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) - Standard project documentation structure inspiration
* [awesome-readme](https://github.com/matiassingers/awesome-readme) - Documentation best practices
