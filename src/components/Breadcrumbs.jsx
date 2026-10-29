import { Link } from "react-router-dom";
import "./Breadcrumbs.css";

function Breadcrumbs({ productName }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {" > "}
      <Link to="/">Products</Link>
      {" > "}
      <span>{productName}</span>
    </nav>
  );
}

export default Breadcrumbs;