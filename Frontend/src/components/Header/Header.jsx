// import { Magnifier } from "./Magnifier.jsx"
import { ProfileHeader } from "./ProfileHeader.jsx";
import './Magnifier.css';
import './Header.css';


export const Header = () => {
    return (
        <header className="header-container">
            {/* <Magnifier /> */}
            <ProfileHeader />
        </header>
    )
}