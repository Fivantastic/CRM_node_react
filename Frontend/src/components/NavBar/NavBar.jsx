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
            <nav className={`sidebar-bottom ${isActive? 'active' : ''}`}>
                <div className="sidebar-header">
                    <NavLink to="/" className="logo-wrapper">
                        <LogoCosmicBlanco className="hidden" />
                        <LogC className="iconSidebar crm"  />
                    </NavLink>
                    <button className="toggle-btn" onClick={toggleSidebar}>
                        <img className="iconSidebar expand" src="/expand.svg" alt="expand button" />
                    </button>
                </div>
                <div className="sidebar-left"></div>

                <div className="sidebar-links">
                    <NavLink to="/home" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                        <img className="iconSidebar" src="/dashboard2.svg" alt="" />
                        <span className="hidden">Dashboard</span>
                    </NavLink>
                    {role === 'admin' && (
                        <>
                            <NavLink to="/user" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar profileBar" src="/user.svg" alt="" />
                                <span className="hidden">Usuarios</span>
                            </NavLink>
                            <NavLink to="/customer" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/customer.svg" alt="" />
                                <span className="hidden">Clientes</span>
                            </NavLink>
                            <NavLink to="/product" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img id='iconSidebarProduct' className="iconSidebar" src="/product.svg" alt="" />
                                <span className="hidden">Productos</span>
                            </NavLink>
                            <NavLink to="/visit" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/visit.svg" alt="" />
                                <span className="hidden">Visitas</span>
                            </NavLink>
                            <NavLink to="/sale" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/sale.svg" alt="" />
                                <span className="hidden">Ordenes de venta</span>
                            </NavLink>
                            <NavLink to="/deliveryNote" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/note.svg" alt="" />
                                <span className="hidden">Albaranes</span>
                            </NavLink>
                            <NavLink to="/shipment" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/shipment.svg" alt="" />
                                <span className="hidden">Envíos</span>
                            </NavLink>
                            <NavLink to="/route" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/route.svg" alt="" />
                                <span className="hidden">Rutas</span>
                            </NavLink>
                            <NavLink to="/invoice" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/delivery.svg" alt="" />
                                <span className="hidden">Facturas</span>
                            </NavLink>
                            <NavLink to="/payment" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/payment.svg" alt="" />
                                <span className="hidden">Pagos</span>
                            </NavLink>
                        </>
                    )}
                    {role === 'salesAgent' && (
                        <>
                            <NavLink to="/customer" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/customer.svg" alt="" />
                                <span className="hidden">Clientes</span>
                            </NavLink>
                            <NavLink to="/visit" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/visit.svg" alt="" />
                                <span className="hidden">Visitas</span>
                            </NavLink>
                            <NavLink to="/sale" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/sale.svg" alt="" />
                                <span className="hidden">Ordenes de ventas</span>
                            </NavLink>
                            <NavLink to="/invoice" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/delivery.svg" alt="" />
                                <span className="hidden">Facturas</span>
                            </NavLink>
                            <NavLink to="/payment" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/payment.svg" alt="" />
                                <span className="hidden">Pagos</span>
                            </NavLink>
                        </>
                    )}
                    {role === 'deliverer' && (
                        <>
                            <NavLink to="/customer" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/customer.svg" alt="" />
                                <span className="hidden">Clientes</span>
                            </NavLink>
                            <NavLink to="/deliveryNote" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/note.svg" alt="" />
                                <span className="hidden">Albaranes</span>
                            </NavLink>
                            <NavLink to="/shipment" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/shipment.svg" alt="" />
                                <span className="hidden">Envíos</span>
                            </NavLink>
                            <NavLink to="/route" className={({ isActive }) => isActive? "linkPage active" : "linkPage"}>
                                <img className="iconSidebar" src="/route.svg" alt="" />
                                <span className="hidden">Rutas</span>
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
