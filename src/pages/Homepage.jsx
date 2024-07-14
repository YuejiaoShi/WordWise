import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <Link to="/pricing">Pricing Page</Link>
      <Link to="/produce">Produce Page</Link>
    </div>
  );
}

export default Homepage;
