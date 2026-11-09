# AI Debugging Sessions Log - Prompts.md

Project: ShopZone E Commerce SPA
Intern: Harsh Vardhan

---

### Prompt 1
how to stop page reload in react router when clicking on navbar links my cart state keeps getting reset

Solution:
Replaced regular a tags with NavLink and Link from react-router-dom in Navbar.jsx so it does client side navigation instead of hard refresh.

---

### Prompt 2
my useparams is returning undefined in product detail page how to extract the id from url and fetch single product from dummyjson

Solution:
Added :id parameter in App.jsx route path and used useParams hook inside ProductDetail.jsx to fetch from https://dummyjson.com/products/id correctly.

---

### Prompt 3
in my add to cart function duplicate items are getting added to cart array how to check if item already exists and just increase quantity

Solution:
Used findIndex on previous cart state to check if product id already exists. If found it updates quantity by 1, otherwise it appends the new item.

---

### Prompt 4
navbar cart badge count is not updating in real time when i add item from product page until i refresh

Solution:
Moved CartProvider to wrap App component in main.jsx and used useCart custom hook in Navbar to calculate total items directly from cart state.

---

### Prompt 5
cart data is getting cleared when i refresh the browser how to save cart in localstorage with react state

Solution:
Initialized useState with a callback reading from localStorage.getItem and added a useEffect to save cart to localStorage whenever cart state changes.

---

### Prompt 6
how to protect checkout route in react router v6 so unauthenticated users get redirected to login page and back to checkout after login

Solution:
Created ProtectedRoute component using Navigate and useLocation to remember the previous path and redirect back to checkout after clicking login as guest.

---

### Prompt 7
my react app works on localhost but on vercel deployment refreshing shop or cart page gives 404 not found error how to fix it

Solution:
Created vercel.json file in root directory with rewrites rule pointing all requests to index.html to allow client side routing.

---

### Prompt 8
add to cart buttons are not aligned at the bottom of product cards because some product descriptions are long and some are short css fix

Solution:
Added flex column with webkit line clamp on description and used margin top auto so buttons always stay aligned at the bottom.
