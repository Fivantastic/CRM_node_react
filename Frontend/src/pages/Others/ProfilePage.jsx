import { useUser } from "../../context/authContext.jsx";
import ChangePasswordPop from "../../components/PagesComponents/Profile/ChangePasswordPop.jsx";
import { MainLayout } from "../../layout/MainLayout.jsx";

export const ProfilePage = () => {
    const user = useUser(); 

    return (
        <>
            <MainLayout>
            <h1>Profile Page</h1>
                {user && <ChangePasswordPop token={user} />}
            </MainLayout>
        </>
    );
};
