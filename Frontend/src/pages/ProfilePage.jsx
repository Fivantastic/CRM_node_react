import { useUser } from "../context/authContext.jsx";
import ChangePasswordPop from "../components/PagesComponents/Profile/ChangePasswordPop.jsx";
import { Link } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout.jsx";

export const ProfilePage = () => {
    const user = useUser(); 

    return (
        <>
            <MainLayout>
                <li><Link to="/">Home</Link></li>
                <div>UserPage</div>
                {user && <ChangePasswordPop token={user} />}
            </MainLayout>
        </>
    );
};
