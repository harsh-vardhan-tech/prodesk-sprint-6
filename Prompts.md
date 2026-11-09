# AI Debugging & Architectural Prompts Log

### Session 1: Client-Side Routing Architecture
**Prompt:**
> How to properly configure client-side routing in React 18 using `react-router-dom` v6 so page navigations do not trigger full browser reloads?

**Key Takeaways & Implementation:**
- Wrapped application inside `<BrowserRouter>` in `main.jsx`.
- Configured routes using `<Routes>` and `<Route>` components in `App.jsx`.
- Replaced conventional `<a>` tags with `<Link to="...">` in `Navbar.jsx` to prevent server roundtrips and preserve in-memory React state.

---

### Session 2: Global State Architecture with Context API
**Prompt:**
> How to create a clean CartContext in React without external state libraries like Redux, while supporting quantity updates and dynamic cart badges?

**Key Takeaways & Implementation:**
- Used `createContext` and `useState` in `src/context/CartContext.jsx`.
- Implemented item checking before adding to cart: if item already exists, increment `quantity`; otherwise append with `quantity: 1`.
- Calculated dynamic derived values (`totalItems`, `totalPrice`) directly from state.

---

### Session 3: State Persistence with localStorage
**Prompt:**
> How to synchronize React Context state with `localStorage` so cart and auth states survive page reloads?

**Key Takeaways & Implementation:**
- Initialized state lazily using a callback reading from `localStorage.getItem()`.
- Added `useEffect` hooks to write changes back to `localStorage.setItem()` whenever `cart` or `isLoggedIn` changes.

---

### Session 4: Route Interception and Protection
**Prompt:**
> What is the recommended way in React Router v6 to protect private routes like `/checkout` and redirect unauthorized guests to `/login`?

**Key Takeaways & Implementation:**
- Created a `ProtectedRoute` wrapper component taking `children`.
- Evaluated `isLoggedIn` flag from `CartContext`.
- Used `<Navigate to="/login" replace />` when unauthorized.

---

### Session 5: Vercel SPA Routing Configuration
**Prompt:**
> Why does refreshing a nested route (e.g. `/shop` or `/cart`) on Vercel result in a 404 error, and how to resolve it?

**Key Takeaways & Implementation:**
- Created `vercel.json` with rewrites forwarding all paths `/(.*)` to `/` index file.

