# AI Debugging & Architectural Prompts Log

## Sprint 6: ShopZone E-Commerce Single Page Application
**Employee ID / Developer:** Harsh Vardhan  
**Topic:** Client-Side Routing, Global Context State, LocalStorage Persistence & Protected Routes

---

### Session 1: Client-Side Routing & SPA Architecture (Phase 1)
**User Prompt:**
> "I am migrating my multi-page React components to an SPA using `react-router-dom` v6. How do I configure BrowserRouter with routes for Home (`/`), Shop (`/shop`), Contact (`/contact`), and dynamic Product Detail (`/product/:id`) so navigation does not reload the page or drop React state?"

**Key Architectural Insights & Fixes:**
- Wrapped root component inside `<BrowserRouter>` in `src/main.jsx`.
- Replaced standard HTML anchor tags (`<a href="...">`) with `<NavLink>` and `<Link>` to prevent browser server round-trips that wipe in-memory state.
- Configured dynamic route path `/product/:id` and utilized `useParams()` to dynamically pull the product ID and query `https://dummyjson.com/products/${id}`.

---

### Session 2: Global State Management with Context API (Phase 2)
**User Prompt:**
> "How do I instantiate a global `CartContext` to maintain cart state without using Redux or prop drilling? Specifically, how do I prevent duplicate cart items and instead increment quantity, while calculating derived totals?"

**Key Architectural Insights & Fixes:**
- Created `CartContext` and `CartProvider` wrapping the entire application inside `main.jsx`.
- Handled state mutation by checking `prevCart.findIndex(item => item.id === product.id)`. If present, created an updated copy incrementing `quantity`; otherwise appended new item with initial quantity.
- Computed `totalItems` and `totalPrice` as derived state using `reduce()`.
- Exposed helper actions: `addToCart`, `removeFromCart`, `updateQuantity`, and `clearCart`.

---

### Session 3: Dynamic Navbar Badge & UI Synchronization (Phase 2)
**User Prompt:**
> "My navbar needs to display a live shopping cart badge that synchronizes across all routes whenever items are added or removed. How to implement this cleanly with useContext?"

**Key Architectural Insights & Fixes:**
- Integrated `useCart()` custom hook inside `Navbar.jsx`.
- Used `totalItems` directly inside the badge counter so re-renders fire automatically on any cart change.
- Placed `Navbar` inside `App.jsx` above `<Routes>` to persist across route transitions.

---

### Session 4: State Persistence via localStorage (Phase 3)
**User Prompt:**
> "When the user hard-refreshes the browser, my cart state gets wiped out. How do I synchronize my Context state with localStorage reliably without triggering infinite render loops?"

**Key Architectural Insights & Fixes:**
- Used lazy initialization in `useState(() => { const saved = localStorage.getItem('cart'); return saved ? JSON.parse(saved) : []; })`.
- Utilized `useEffect` with dependency array `[cart]` to serialize and store cart payload to `localStorage` on mutation.
- Applied the same persistent strategy for `isLoggedIn` authentication state.

---

### Session 5: Route Interception & Mock Authentication (Phase 3)
**User Prompt:**
> "How to build a protected `/checkout` route that automatically redirects unauthenticated users to `/login`, and redirects them back to checkout once they click 'Login as Guest'?"

**Key Architectural Insights & Fixes:**
- Created a `ProtectedRoute` component checking `isLoggedIn` from `CartContext`.
- Used `<Navigate to="/login" state={{ from: location.pathname }} replace />` to remember where the user was heading.
- In `Login.jsx`, retrieved `location.state?.from` and pushed the user directly to checkout upon login.

---

### Session 6: Vercel SPA 404 Rewrite Configuration
**User Prompt:**
> "On local development all routes work, but on Vercel refreshing `/shop` or `/cart` yields a 404 Not Found error. How do I configure Vercel routing for client-side single page applications?"

**Key Architectural Insights & Fixes:**
- Created `vercel.json` in the root project folder.
- Configured wildcard rewrite `{ "source": "/(.*)", "destination": "/" }` so Vercel forwards all route requests to Vite's root `index.html`.
