
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go back to Shop</Link>
    </div>
  );
}

export default NotFound;
