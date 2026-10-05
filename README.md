# NextAcademy - Modular Frontend Learning Application

A clean, modular 3-page web application built with Next.js 15 (App Router) and React 19, connected directly to public REST API endpoints from DummyJSON.

---

## Architecture and Learning Goals

### 1. Modular Components
- **Header** (`src/components/Header.jsx`): Top navigation bar with active route highlighting, user authentication status badge, and sign-out handler.
- **Footer** (`src/components/Footer.jsx`): Application footer displaying architecture concepts, navigation links, and external API documentation references.
- **HeroSection** (`src/components/HeroSection.jsx`): Reusable showcase banner receiving title, highlight text, description, call-to-action buttons, and statistics via props.
- **ProductCard** (`src/components/ProductCard.jsx`): Reusable child component rendering product properties such as thumbnail image, title, rating, category badge, discount percentage, pricing, and an interactive Add-to-Cart button.
- **UserCard** (`src/components/UserCard.jsx`): Reusable child component displaying user profile details including avatar, full name, username, email, phone number, company, and location.
- **Wrapper** (`src/components/Wrapper.jsx`): Generic layout container demonstrating the React composition pattern using the `children` prop with configurable max-width sizes (`sm`, `md`, `lg`, `full`).
- **StatusBanner** (`src/components/StatusBanner.jsx`): Reusable state banner handling loading indicators, error notices with retry actions, and empty search results.

### 2. Parent-Child Data Flow and Props
- **Top-Down Data Flow (Parent to Child)**:
  Parent pages (`products/page.js` and `profile/page.js`) perform API requests and pass clean JavaScript data objects down to child components via props:
  ```jsx
  <ProductCard
    key={product.id}
    product={product}
    onAddToCart={handleAddToCart}
  />
  ```
- **Bottom-Up Communication (Child to Parent)**:
  When a user clicks the Add-to-Cart button inside `ProductCard.jsx`, the child component invokes the parent-supplied `onAddToCart(product)` callback prop. The parent page updates its cart counter state and displays an action banner accordingly.

### 3. Asynchronous Operations
- Centralized service layer located in `src/lib/api.js`.
- Clean implementation of `async/await` syntax inside `useEffect` hooks with `try/catch/finally` blocks to prevent blocking or freezing the user interface.
- Explicit UI state handling for loading status (`isLoading`), error states (`errorMessage`), and successful data payloads.

### 4. Pages and Views
- **Page 1: Authentication / Login** (`src/app/login/page.js`):
  - Direct integration with `POST https://dummyjson.com/auth/login`.
  - Validates credentials asynchronously and persists user information and token in `AuthContext` and `localStorage`.
  - Automatically redirects to the Products Dashboard upon successful login.
  - Includes quick demo buttons for testing with preset credentials.
- **Page 2: Products Dashboard** (`src/app/products/page.js`):
  - Direct integration with `GET https://dummyjson.com/products`.
  - Live keyword search input with 300ms debounce.
  - Dynamic category filter dropdown using categories fetched from the API.
  - Renders each product using the reusable `ProductCard` child component.
- **Page 3: User Profiles and Directory** (`src/app/profile/page.js`):
  - Direct integration with `GET https://dummyjson.com/users`.
  - Displays authenticated user profile if signed in.
  - Interactive directory listing: selecting any `UserCard` child component updates the detailed user inspector panel.

---

## Project Structure

```text
nextjs_starter_kit/
├── .gitignore
├── next.config.mjs
├── package.json
├── README.md
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.js
    │   ├── page.js
    │   ├── login/
    │   │   └── page.js
    │   ├── products/
    │   │   └── page.js
    │   └── profile/
    │       └── page.js
    ├── components/
    │   ├── Footer.jsx
    │   ├── Header.jsx
    │   ├── HeroSection.jsx
    │   ├── ProductCard.jsx
    │   ├── StatusBanner.jsx
    │   ├── UserCard.jsx
    │   └── Wrapper.jsx
    ├── context/
    │   └── AuthContext.jsx
    └── lib/
        └── api.js
```

---

## Installation and Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## Test Credentials (DummyJSON)

The following public test credentials from DummyJSON can be used to authenticate on the login page:

- **Username**: `emilys`
- **Password**: `emilyspassword`

Alternative account:
- **Username**: `kminchelle`
- **Password**: `0lelkeyw`

---

## External API Endpoints Used

- **Login API**: `POST https://dummyjson.com/auth/login`
- **Products API**: `GET https://dummyjson.com/products`
- **Product Categories API**: `GET https://dummyjson.com/products/categories`
- **Users API**: `GET https://dummyjson.com/users`
