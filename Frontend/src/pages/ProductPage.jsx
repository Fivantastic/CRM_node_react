import { Link } from "react-router-dom";

import { MainLayout } from "../layout/MainLayout.jsx";

export const ProductPage = () => {

    return (
        <MainLayout>
        <div>
            <h1>Product Page</h1>
            <Link to="/home">Home</Link>
        </div>
        </MainLayout>
    );
}