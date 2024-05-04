import { useUser } from "../context/authContext.jsx";
import ChangePasswordPop from "../components/userActions/ChangePasswordPop.jsx";
import { Link } from "react-router-dom";

export const UserPage = () => {
    const user = useUser(); 
    return (
        <>
            <li><Link to="/">Home</Link></li>
            <div>UserPage</div>
            {user && <ChangePasswordPop />}
        </>
  );
};
  