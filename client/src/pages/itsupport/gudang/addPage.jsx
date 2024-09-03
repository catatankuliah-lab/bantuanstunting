import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddPage = ({ currentView, handleBackClick , refreshData}) => {

    const [formData, setFormData] = useState({
        nama_bbm: '',
        harga_bbm: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('nama_bbm', formData.nama_bbm);
            data.append('harga_bbm', formData.harga_bbm);

            const response = await axios.post('http://localhost:5050/api/bbm/add', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response.data);
            alert('Data BBM berhasil ditambahkan!');
            refreshData();
            handleBackClick();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Gagal menambahkan data BBM.');
        }
    };

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="mb-3">
                    <div className="divider text-start">
                    <div className="divider-text">
                        <span className="menu-header-text fs-6">Tambah Data BBM</span>
                    </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="">
                    Klik <button className="fw-bold btn btn-link p-0" onClick={handleBackClick}>disini</button> untuk kembali ke menu utama BBM.
                </div>
            </div>
            <div className="col-md-12 mt-3">
                <form id="form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="nama_bbm" className="form-label">Nama BBM</label>
                                <input className="form-control text-uppercase" type="text" id="nama_bbm" name='nama_bbm' placeholder="Nama BBM" onChange={handleChange} required/>
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="harga_bbm" className="form-label">Harga /Liter (Rupiah)</label>
                                <input className="form-control text-uppercase" type="number" id="harga_bbm" name='harga_bbm' placeholder="00000" onChange={handleChange} required/>
                        </div>
                        <div className="col-md-6 col-sm-12 mt-2">
                            <button type="submit" className="btn btn-primary w-100">Simpan</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

AddPage.propTypes = {
    currentView: PropTypes.string.isRequired,
    handleBackClick: PropTypes.func.isRequired,
    refreshData: PropTypes.func.isRequired
};

export default AddPage;