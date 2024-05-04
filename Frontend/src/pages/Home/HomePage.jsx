import LogoutButton from "../../components/buttons/LogoutButton.jsx";
import { useSetUser, useUser } from "../../context/authContext.jsx";

export const HomePage = () => {
  const user = useUser(); 
  const setUser = useSetUser();

  return (
    <div>
      <h1>HomePage</h1>
      {user && <LogoutButton setUser={setUser} />}
    </div>
  );
};
