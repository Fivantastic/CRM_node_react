import LogoutButton from "../../components/buttons/LogoutButton.jsx";
import { useSetUser, useUser } from "../../context/authContext.jsx";
import { MainLayout } from "../../layout/MainLayout.jsx";

export const HomePage = () => {
  const user = useUser(); 
  const setUser = useSetUser();

  return (
    <MainLayout>
      <section>
        <h1>HomePage</h1>
        {user && <LogoutButton setUser={setUser} />}
      </section>
    </MainLayout>
  );
};
