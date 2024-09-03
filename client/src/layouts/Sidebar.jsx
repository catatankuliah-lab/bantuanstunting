// Sidebar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import menuData from '../data/menuData.json';
import PropTypes from 'prop-types'; // Import prop-types

const MenuItem = ({ item }) => {
    const location = useLocation();
    const isActive = location.pathname === item.link;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isSubmenuActive = hasSubmenu && item.submenu.some(subitem => location.pathname === subitem.link);

    return (
        <li className={`menu-item ${isActive || isSubmenuActive ? 'active' : ''} ${hasSubmenu && isSubmenuActive ? 'open' : ''}`}>
            {item.link && (
                <NavLink
                    aria-label={`Navigate to ${item.text} ${!item.available ? 'Pro' : ''}`}
                    to={item.link}
                    className={`menu-link ${item.submenu ? 'menu-toggle' : ''}`}
                    target={item.link.includes('http') ? '_blank' : undefined}
                >
                    <i className={`menu-icon tf-icons ${item.icon}`}></i>
                    <div>{item.text}</div> {item.available === false && (
                        <div className="badge bg-label-primary fs-tiny rounded-pill ms-auto">Pro</div>
                    )}
                </NavLink>
            )}
            {item.submenu && (
                <ul className="menu-sub">{item.submenu.map((subitem, index) => (
                    <MenuItem key={index} item={subitem} />
                ))}</ul>
            )}
        </li>
    );
};

// Validasi prop-types
MenuItem.propTypes = {
    item: PropTypes.shape({
        link: PropTypes.string,
        submenu: PropTypes.arrayOf(PropTypes.object),
        icon: PropTypes.string,
        text: PropTypes.string,
        available: PropTypes.bool
    }).isRequired
};

const Sidebar = () => {
    return (
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
            <div className="app-brand demo">
                <span className="app-brand-logo demo">
                        <img src="/assets/img/logos/logo.png" style={{width: '200px'}} alt="sneat-logo" aria-label='Sneat logo image' />
                </span>
            </div>
            <div className="menu-inner-shadow"></div>
            <ul className="menu-inner py-1">
                {menuData.map((section, index) => (
                    <React.Fragment key={index}>
                        {section.header && (
                            <li className="menu-header small text-uppercase">
                                <span className="menu-header-text">{section.header}</span>
                            </li>
                        )}
                        {section.items.map((item, itemIndex) => (
                            <MenuItem key={itemIndex} item={item} />
                        ))}
                    </React.Fragment>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
