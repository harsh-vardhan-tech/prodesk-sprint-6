import { Navigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useCart();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default ProtectedRoute;
