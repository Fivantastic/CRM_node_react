import { useState } from 'react';
import { Link } from 'react-router-dom';
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
                    <Link to="/" className="logo-wrapper">
                        <img className="iconSidebar crm" src="./crm.png" alt="Logo" />
                        <h2 className="hidden">COSMIC</h2>
                    </Link>
                    <button className="toggle-btn" onClick={toggleSidebar}>
                        <img className="iconSidebar" src="./expand.svg" alt="expand button" />
                    </button>
                </div>

                <div className="sidebar-links">
                    <Link to="/home" className="linkPage ">
                        <img className="iconSidebar" src="./home.svg" alt="" />
                        <span className="hidden">Home</span>
                    </Link>
                <Link to="/user" className="linkPage active">
                    <img className="iconSidebar profileBar" src="./profile-copy.svg" alt=""  />
                    <span className="hidden">User</span>
                </Link>
                <Link to="/customer" className="linkPage ">
                    <img className="iconSidebar" src="./tasks.svg" alt="" />
                    <span className="hidden">Customer</span>
                </Link> 
                <Link to="/product" className="linkPage ">
                    <img className="iconSidebar" src="./projects.svg" alt="" />
                    <span className="hidden">Product</span>
                </Link>
                <Link to="/visit" className="linkPage ">
                    <img className="iconSidebar" src="./settings.svg" alt="" />
                    <span className="hidden">Visits</span>
                </Link>
                <Link to="/sale" className="linkPage ">
                    <img className="iconSidebar" src="./dashboard.svg" alt="" />
                    <span className="hidden">Sales Orders</span>
                </Link>
                <Link to="/deliveryNote" className="linkPage ">
                    <img className="iconSidebar" src="./projects.svg" alt="" />
                    <span className="hidden">Delivery Note</span>
                </Link>
                <Link to="/invoice" className="linkPage">
                    <img className="iconSidebar" src="./projects.svg" alt="" />
                    <span className="hidden">Invoices</span>
                </Link>
                <Link to="/payment" className="linkPage">
                    <img className="iconSidebar" src="./projects.svg" alt="" />
                    <span className="hidden">Payments</span>
                </Link>
                <Link to="/shipment" className="linkPage">
                    <img className="iconSidebar" src="./projects.svg" alt="" />
                    <span className="hidden">Shipments</span>
                </Link>
            </div>
        </nav>
        </header>
    );
}

