import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

export const Blank = ({ children }) => {
    return (
        <>
            <Link aria-label='Go to Home Page' to="/">
                {children}
            </Link>
        </>
    )
}

Blank.propTypes = {
    children: PropTypes.node.isRequired
};