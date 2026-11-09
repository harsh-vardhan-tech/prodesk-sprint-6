# ShopZone - E-Commerce Single Page Application

Frontend e-commerce web application built using React and React Router DOM.

## Features
- Multi-route client side navigation without full page reloads (`/`, `/shop`, `/product/:id`, `/cart`, `/contact`, `/login`, `/checkout`).
- Product browsing consuming the `https://dummyjson.com/products` API.
- Dynamic single product view utilizing `useParams` for data fetching.
- Global cart state powered by React Context API.
- Cart persistence using `localStorage`.
- Mock guest authentication and protected checkout route.
- Contact form UI.
- Fully responsive styling.

## Tech Stack
- React
- React Router DOM
- Vite

## Setup & Running Locally
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```
