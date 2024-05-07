import { Link } from "react-router-dom";

export const ProductPage = () => {
    return (
        <div>
            <h1>Product Page</h1>
            <Link to="/products/create">Product Page</Link>
        </div>
    );
}