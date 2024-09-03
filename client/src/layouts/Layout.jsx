import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
// import Main from '../main';

const Layout = ({ children }) => {
  const [userRole, setUserRole] = useState('admin');

  useEffect(() => {
    // eslint-disable-next-line no-undef
    Main();
  }, []);

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidebar userRole={userRole} />
        <div className="layout-page">
          <Navbar />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              {children}
            </div>
            <Footer />
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
