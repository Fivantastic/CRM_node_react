import { Link } from "react-router-dom";
import { useUser } from "../context/authContext.jsx";

export const ProductPage = () => {
    const token = useUser();
    console.log(token);
    return (
        <div>
            <h1>Product Page</h1>
            <Link to="/home">Home</Link>
        </div>
    );
}