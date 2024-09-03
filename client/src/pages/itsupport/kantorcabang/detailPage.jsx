import React from 'react';
import PropTypes from 'prop-types'; // Import prop-types

const DetailPage = ({ id }) => {
    return (
        <div>
            <h2>Detail Data Mobil ID: {id}</h2>
            {/* Konten detail untuk mobil dengan ID tertentu */}
        </div>
    );
};

DetailPage.propTypes = {
    id: PropTypes.number.isRequired,
};

export default DetailPage;
