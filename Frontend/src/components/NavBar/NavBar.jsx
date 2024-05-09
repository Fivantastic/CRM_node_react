import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LogoCosmicBlanco } from '../../assets/creado/logoCosmic.jsx';
import { LogC } from '../../assets/creado/LogC.jsx';
import './NavBar.css';


export const NavBar = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };

    return (
        <header className="body-wrapper"> 
            <nav className={`sidebar-bottom ${isActive ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <NavLink exact="true" to="/" className="logo-wrapper">
                        <LogoCosmicBlanco className="hidden" />
                        <LogC className="iconSidebar crm"  />
                    </NavLink>
                    <button className="toggle-btn" onClick={toggleSidebar}>
                        <img className="iconSidebar expand" src="./expand.svg" alt="expand button" />
                    </button>
                </div>
                <div className="sidebar-left"></div>

                <div className="sidebar-links">
                    <NavLink exact="true" to="/home" className="linkPage" activeClassName="active">
                        <img className="iconSidebar" src="./home.svg" alt="" />
                        <span className="hidden">Home</span>
                    </NavLink>
                    <NavLink to="/user" className="linkPage" activeClassName="active">
                        <img className="iconSidebar profileBar" src="./profile-copy.svg" alt="" />
                        <span className="hidden">User</span>
                    </NavLink>
                    <NavLink to="/customer" className="linkPage" activeClassName="active">
                        <img className="iconSidebar" src="./tasks.svg" alt="" />
                        <span className="hidden">Customer</span>
                    </NavLink> 
                    <NavLink to="/product" className="linkPage" activeClassName="active">
                        <img className="iconSidebar" src="./projects.svg" alt="" />
                        <span className="hidden">Product</span>
                    </NavLink>
                    <NavLink to="/visit" className="linkPage" activeClassName="active">
                        <img className="iconSidebar" src="./settings.svg" alt="" />
                        <span className="hidden">Visits</span>
                    </NavLink>
                    <NavLink to="/sale" className="linkPage" activeClassName="active">
                        <img className="iconSidebar" src="./dashboard.svg" alt="" />
                        <span className="hidden">Sales Orders</span>
                    </NavLink>
                    <NavLink to="/deliveryNote" className="linkPage" activeClassName="active">
                        <img className="iconSidebar" src="./projects.svg" alt="" />
                        <span className="hidden">Delivery Note</span>
                    </NavLink>
                    <NavLink to="/invoice" className="linkPage" activeClassName="active">
                        <img className="iconSidebar" src="./projects.svg" alt="" />
                        <span className="hidden">Invoices</span>
                    </NavLink>
                    <NavLink to="/payment" className="linkPage" activeClassName="active">
                        <img className="iconSidebar" src="./projects.svg" alt="" />
                        <span className="hidden">Payments</span>
                    </NavLink>
                    <NavLink to="/shipment" className="linkPage" activeClassName="active">
                        <img className="iconSidebar" src="./projects.svg" alt="" />
                        <span className="hidden">Shipments</span>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}
