import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddPage = ({ currentView, handleBackClick , refreshData}) => {

    const [formData, setFormData] = useState({
        nama_jenis_kendaraan: '',
        rumus_bbm_ac_off: '',
        rumus_bbm_ac_on: '',
        rumus_bbm_per_ton: '',
        rumus_standby_ac_on: ''
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
            data.append('nama_jenis_kendaraan', formData.nama_jenis_kendaraan);
            data.append('rumus_bbm_ac_off', formData.rumus_bbm_ac_off);
            data.append('rumus_bbm_ac_on', formData.rumus_bbm_ac_on);
            data.append('rumus_bbm_per_ton', formData.rumus_bbm_per_ton);
            data.append('rumus_standby_ac_on', formData.rumus_standby_ac_on);

            const response = await axios.post('http://localhost:5050/api/jeniskendaraan/add', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response.data);
            alert('Data Jenis Kendaraan berhasil ditambahkan!');
            refreshData();
            handleBackClick();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Gagal menambahkan data Jenis Kendaraan.');
        }
    };

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="mb-3">
                    <div className="divider text-start">
                    <div className="divider-text">
                        <span className="menu-header-text fs-6">Data Jenis/Tipe Mobil</span>
                    </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="">
                    Klik <button className="fw-bold btn btn-link p-0" onClick={handleBackClick}>disini</button> untuk kembali ke menu utama Jenis/Tipe Mobil.
                </div>
            </div>
            <div className="col-md-12 mt-3">
                <form id="form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="nama_jenis_kendaraan" className="form-label">Jenis/Tipe Mobil</label>
                                <input className="form-control text-uppercase" type="text" id="nama_jenis_kendaraan" name='nama_jenis_kendaraan' placeholder="Jenis/Tipe Mobil" onChange={handleChange} required/>
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="rumus_bbm_ac_off" className="form-label">BBM AC OFF (KM/Liter)</label>
                                <input className="form-control text-uppercase" type="number" id="rumus_bbm_ac_off" name='rumus_bbm_ac_off' placeholder="00000" onChange={handleChange} step="0.1" required/>
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="rumus_bbm_ac_on" className="form-label">BBM AC ON (KM/Liter)</label>
                                <input className="form-control text-uppercase" type="number" id="rumus_bbm_ac_on" name='rumus_bbm_ac_on' placeholder="00000" onChange={handleChange} step="0.1" required/>
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="rumus_bbm_per_ton" className="form-label">BBM PER TON (KM/Liter)</label>
                                <input className="form-control text-uppercase" type="number" id="rumus_bbm_per_ton" name='rumus_bbm_per_ton' placeholder="00000" onChange={handleChange} step="0.1" required/>
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="rumus_standby_ac_on" className="form-label">STANDBY AC ON (KM/Liter)</label>
                                <input className="form-control text-uppercase" type="number" id="rumus_standby_ac_on" name='rumus_standby_ac_on' placeholder="00000" onChange={handleChange} step="0.1" required/>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <label htmlFor="" className="form-label">&nbsp;</label>
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