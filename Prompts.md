# AI Debugging & Development Log (Prompts.md)

Project: ShopZone E-Commerce SPA  
Developer: Harsh Vardhan  
Sprint: 6 (Client-Side Routing, Global State, Protected Routes)

---

### Prompt 1: Fixing Page Reload on Navigation
**What I asked:**
> "Maine navbar me `<a href="/shop">Shop</a>` lagaya hai, par click karne par poora page reload ho raha hai aur console refresh ho jaata hai. React Router me bina page reload kiye navigate kaise karte hain aur react state destroy hone se kaise bachayein?"

**Issue:**
Standard HTML `<a>` tags browser ko full HTTP GET request bhejte hain jisse browser reload hota hai aur React ki in-memory state reset ho jaati hai.

**Fix Applied:**
`Navbar.jsx` me `<a>` hata kar React Router DOM ka `<NavLink>` aur `<Link>` component use kiya:
```jsx
// Pehle:
<a href="/shop">Shop</a>

// Fix kiya:
<NavLink to="/shop" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
  Shop
</NavLink>
```

---

### Prompt 2: Dynamic Route & useParams undefined issue
**What I asked:**
> "Product page par click karne par `/product/5` URL toh aa raha hai, par component ke andar `useParams()` se id fetch nahi ho rahi ya undefined aa rahi hai. DummyJSON API `https://dummyjson.com/products/${id}` ko dynamic ID ke sath call karne ka sahi tareeqa kya hai?"

**Issue:**
App.jsx ke Route definition me path parameter exact match hona chahiye `:id`, aur component ke andar exact same key destructure karni hoti hai.

**Fix Applied:**
In `App.jsx`:
```jsx
<Route path="/product/:id" element={<ProductDetail />} />
```
In `ProductDetail.jsx`:
```jsx
const { id } = useParams();

useEffect(() => {
  fetch(`https://dummyjson.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => setProduct(data))
    .catch((err) => setError(err.message));
}, [id]);
```

---

### Prompt 3: Duplicate Items in Cart State
**What I asked:**
> "Jab main ek hi product ko 2 baar 'Add to Cart' karta hoon toh cart me alag-alag do cards ban jaate hain same product ke. Mujhe duplicate nahi banana, bas us item ki quantity +1 karni hai. CartContext ka dispatch/setter logic kaise likhu?"

**Issue:**
Seedha `[...prevCart, product]` karne se har click par duplicate object cart array me append ho raha tha.

**Fix Applied:**
In `CartContext.jsx`, pehle `findIndex` se check kiya ki product id exist karti hai ya nahi:
```jsx
const addToCart = (product, quantity = 1) => {
  setCart((prevCart) => {
    const existingIndex = prevCart.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      return prevCart.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }
    return [...prevCart, { ...product, quantity }];
  });
};
```

---

### Prompt 4: Navbar Cart Badge Not Updating
**What I asked:**
> "Product detail page se item cart me add ho raha hai, par Navbar me cart icon ke upar badge count tab tak change nahi hota jab tak page reload na karu. Dynamic badge ko live sync kaise karein?"

**Issue:**
Navbar application tree me CartProvider ke bahar render ho raha tha, ya derived state calculate nahi ho rahi thi.

**Fix Applied:**
`main.jsx` me `<CartProvider>` ko `<App />` ke bahar wrap kiya, aur `Navbar.jsx` me custom hook `useCart()` se derived `totalItems` use kiya:
```jsx
// In CartContext.jsx
const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

// In Navbar.jsx
const { totalItems } = useCart();
<span className="cart-badge">{totalItems}</span>
```

---

### Prompt 5: Cart Data Lost on Browser Hard Refresh (F5)
**What I asked:**
> "Jab browser refresh (F5) karta hoon toh cart empty ho jaata hai. LocalStorage me cart save kaise karein aur initial state me load kaise karein taaki refresh karne par cart empty na ho?"

**Issue:**
State normal `useState([])` me define thi, jo page reload hote hi memory se delete ho jaati thi.

**Fix Applied:**
Lazy state initialization use kiya jo pehle `localStorage.getItem("cart")` check karta hai, aur `useEffect` se save karta hai:
```jsx
const [cart, setCart] = useState(() => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
```

---

### Prompt 6: Protected Checkout Route & Auto-redirect to Login
**What I asked:**
> "Mujhe `/checkout` route ko protect karna hai. Agar user login nahi hai aur seedha `/checkout` URL dale toh wo `/login` par chala jaye. Aur jab wo 'Login as Guest' dabaye toh wapas `/checkout` par kaise bhejein?"

**Issue:**
Manual if-else har page par lagane se code messy hota hai, reusable route protection wrapper chahiye tha.

**Fix Applied:**
`ProtectedRoute.jsx` banaya jo user ki target location ko save karke redirect karta hai:
```jsx
// ProtectedRoute.jsx
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useCart();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children;
}

// Login.jsx
const destination = location.state?.from || "/checkout";
const handleGuestLogin = () => {
  loginAsGuest();
  navigate(destination);
};
```

---

### Prompt 7: Vercel Deploy 404 NOT_FOUND on Route Refresh
**What I asked:**
> "Localhost par `/shop` ya `/cart` refresh karne par sab chal raha hai, lekin Vercel par deploy karne ke baad jab `/shop` par refresh karta hoon toh Vercel ka error aata hai: `404: NOT_FOUND`. Isko kaise fix karein?"

**Issue:**
Vercel server physical file dhoondhta hai `/shop` path par. Single Page Application (SPA) me saari routing client-side hoti hai Vite ki `index.html` se.

**Fix Applied:**
Root directory me `vercel.json` banakar rewrite rule add kiya:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

---

### Prompt 8: CSS Responsive Grid & Button Alignment
**What I asked:**
> "Mobile screen par cart page ka order summary aur item card overlap ho rahe hain, aur shop page par product cards ka button niche align nahi ho raha (alag-alag height ke descriptions ki wajah se). CSS flexbox aur grid se clean alignment kaise karein?"

**Issue:**
Description ka text kisi product me bada aur kisi me chota tha, jisse buttons upar-niche ho rahe the.

**Fix Applied:**
1. Product cards me flex column aur `margin-top: auto` / `flex: 1` lagaya aur `-webkit-line-clamp: 2` se description limit ki.
2. Media query add karke cart aur checkout ko 1 column me stack kiya:
```css
.product-description-snippet {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

@media (max-width: 800px) {
  .cart-grid,
  .checkout-grid,
  .detail-layout {
    grid-template-columns: 1fr;
  }
}
```
