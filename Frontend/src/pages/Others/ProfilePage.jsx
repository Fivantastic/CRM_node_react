import { MainLayout } from "../../layout/MainLayout.jsx";
import { useUser } from "../../context/authContext.jsx";
import ChangePasswordPop from "../../components/PagesComponents/Profile/ChangePasswordPop.jsx";

export const ProfilePage = () => {
    const user = useUser(); 

    return (
        <MainLayout>
            <section id='profile_container' className='mainContainer'>
                <h1 id='profile_title' className=' mainTitle'>User settings</h1>
                {user && <ChangePasswordPop token={user} />}
            </section>
         </MainLayout>

    );
};
