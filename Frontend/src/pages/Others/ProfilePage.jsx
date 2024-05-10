import { useUser } from '../../context/authContext.jsx';
import ChangePasswordPop from '../../components/PagesComponents/Profile/ChangePasswordPop.jsx';
import { MainLayout } from '../../layout/MainLayout.jsx';

import '../../components/PagesComponents/Profile/changeAvatar.css';
import { ChangeAvatar } from '../../components/PagesComponents/Profile/ChangeAvatar.jsx';
import { ChanegeEmail } from '../../components/PagesComponents/Profile/ChanegeEmail.jsx';
import { ChangeName } from '../../components/PagesComponents/Profile/ChangeName.jsx';
import { HelpMe } from '../../components/PagesComponents/Profile/HelpMe.jsx';

export const ProfilePage = () => {
  const user = useUser();

  return (
    <MainLayout>
      <section id="profile_container" className="mainContainer">
        <h1 id="profile_title" className=" mainTitle">
          Settings
        </h1>
        <section id="account">
          {user && <ChangePasswordPop token={user} />}
          <ChangeAvatar />
          <ChanegeEmail />
          <ChangeName />
          <HelpMe />
        </section>
      </section>
    </MainLayout>
  );
};
