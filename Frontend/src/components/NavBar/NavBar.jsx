import { useRole } from '../../context/authContext.jsx';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LogC } from '../../assets/creado/LogC.jsx';
import { LogoCosmicBlanco } from '../../assets/creado/logoCosmic.jsx';
import './NavBar.css';

export const NavBar = () => {
    const [isActive, setIsActive] = useState(false);
    const role = useRole();

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };

    return (
        <header className="body-wrapper"> 
            <nav className={`sidebar-bottom ${isActive ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <NavLink exact to="/" className="logo-wrapper">
                        <LogoCosmicBlanco className="hidden" />
                        <LogC className="iconSidebar crm"  />
                    </NavLink>
                    <button className="toggle-btn" onClick={toggleSidebar}>
                        <img className="iconSidebar expand" src="./expand.svg" alt="expand button" />
                    </button>
                </div>
                <div className="sidebar-left"></div>

                <div className="sidebar-links">
                    <NavLink exact to="/home" className="linkPage" activeClassName="active">
                        <img className="iconSidebar" src="./dashboard2.svg" alt="" />
                        <span className="hidden">Dashboard</span>
                    </NavLink>
                    {role === 'admin' && (
                        <>
                            <NavLink to="/user" className="linkPage" activeClassName="active">
                                <img className="iconSidebar profileBar" src="./user.svg" alt="" />
                                <span className="hidden">User</span>
                            </NavLink>
                            <NavLink to="/customer" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./customer.svg" alt="" />
                                <span className="hidden">Customer</span>
                            </NavLink>
                            <NavLink to="/product" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./product.svg" alt="" />
                                <span className="hidden">Product</span>
                            </NavLink> 
                            <NavLink to="/visit" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./visit.svg" alt="" />
                                <span className="hidden">Visits</span>
                            </NavLink>
                            <NavLink to="/sale" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./sale.svg" alt="" />
                                <span className="hidden">Sales Orders</span>
                            </NavLink>
                            <NavLink to="/invoice" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./delivery.svg" alt="" />
                                <span className="hidden">Invoices</span>
                            </NavLink>
                            <NavLink to="/payment" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./payment.svg" alt="" />
                                <span className="hidden">Payments</span>
                            </NavLink>
                            <NavLink to="/deliveryNote" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./note.svg" alt="" />
                                <span className="hidden">Delivery Note</span>
                            </NavLink>
                            <NavLink to="/shipment" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./shipment.svg" alt="" />
                                <span className="hidden">Shipments</span>
                            </NavLink>
                        </>
                    )}
                    {role === 'salesAgent' && (
                        <>
                            <NavLink to="/customer" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./customer.svg" alt="" />
                                <span className="hidden">Customer</span>
                            </NavLink>
                            <NavLink to="/visit" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./visit.svg" alt="" />
                                <span className="hidden">Visits</span>
                            </NavLink>
                            <NavLink to="/sale" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./sale.svg" alt="" />
                                <span className="hidden">Sales Orders</span>
                            </NavLink>
                            <NavLink to="/invoice" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./delivery.svg" alt="" />
                                <span className="hidden">Invoices</span>
                            </NavLink>
                            <NavLink to="/payment" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./payment.svg" alt="" />
                                <span className="hidden">Payments</span>
                            </NavLink>
                        </>
                    )}
                    {role === 'deliverer' && (
                        <>
                            <NavLink to="/customer" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./customer.svg" alt="" />
                                <span className="hidden">Customer</span>
                            </NavLink>
                            <NavLink to="/deliveryNote" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./note.svg" alt="" />
                                <span className="hidden">Delivery Note</span>
                            </NavLink>
                            <NavLink to="/shipment" className="linkPage" activeClassName="active">
                                <img className="iconSidebar" src="./shipment.svg" alt="" />
                                <span className="hidden">Shipments</span>
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
