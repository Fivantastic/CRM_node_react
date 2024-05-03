import LogoutButton from "../../components/buttons/LogoutButton.jsx";
import { AuthContext } from "../../context/authContext.jsx"; 
import { useContext } from "react";

export const HomePage = () => {
  const { setUser } = useContext(AuthContext);

  return (
    <div>
      <h1>HomePage</h1>
      <LogoutButton setUser={setUser} />
    </div>
  );
};
