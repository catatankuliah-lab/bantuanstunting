import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';

const AddPage = ({ handlePageChange }) => {
    const [detailId, setDetailId] = useState('');
    const [alokasi, setAlokasi] = useState([]);
    const [selectedAlokasi, setSelectedAlokasi] = useState(null);
    const [gudangOption, setGudangOption] = useState([]);
    const [selectedGudang, setSelectedGudang] = useState('');
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchAlokasi = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/alokasi/all');
                const dataalokasi = response.data.map(alokasiall => ({
                    value: alokasiall.id_alokasi,
                    label: alokasiall.bulan_alokasi
                }));
                setAlokasi(dataalokasi);
            } catch (error) {
                console.error('Error fetching', error);
            }
        };
        fetchAlokasi();
    }, []);

    const handleAlokasiChange = (selectedOption) => {
        setSelectedAlokasi(selectedOption);
    };

    useEffect(() => {
        const fetchGudang = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/gudang/all');
                const datagudang = response.data.map(gudangall => ({
                    value: gudangall.id_gudang,
                    label: gudangall.nama_gudang
                }));
                setGudangOption(datagudang);
            } catch (error) {
                console.error('Error fetching', error);
            }
        };
        fetchGudang();
    }, []);

    const handleGudangChange = (selectedOption) => {
        setSelectedGudang(selectedOption);
    };

    useEffect(() => {
        if (detailId !== '') {
            console.log(detailId);
            handlePageChange('detail', detailId);
        }
    }, [detailId, handlePageChange]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSubmit = {
            ...formData,
            nomor_spm: 'SPM-88LOG-09-24-0001',
            qr_spm: 'SPM-88LOG-09-24-0001',
            id_gudang: selectedGudang.value
        };
        try {
            const response = await axios.post('http://localhost:5050/api/spm/add', dataToSubmit);
            Swal.fire({
                title: 'Data SPM',
                text: 'Data Berhasil Ditambahkan',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
                position: 'center',
                timerProgressBar: true
            }).then(() => {
                handlePageChange('detail', response.data.id_spm);
            });
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="mb-3">
                    <div className="divider text-start fw-bold">
                        <div className="divider-text">
                            <span className="menu-header-text fs-6">Tambah Data Surat Perintah Muat (SPM)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="">
                    Klik <button className="fw-bold btn btn-link p-0" onClick={() => handlePageChange('index')}>disini</button> untuk kembali ke menu utama Surat Perintah Muat (SPM).
                </div>
            </div>
            <div className="col-md-12 mt-3">
                <form id="form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-3 col-sm-12 col-sm-6 mb-3">
                            <label htmlFor="id_alokasi" className="form-label">ALOKASI</label>
                            <Select
                                id="id_alokasi"
                                name="id_alokasi"
                                value={selectedAlokasi}
                                onChange={handleAlokasiChange}
                                options={alokasi}
                                placeholder="PILIH ALOKASI"
                            />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="tanggal_spm" className="form-label">Tanggal Surat Perintah Muat (SPM)</label>
                            <input className="form-control text-uppercase" type="date" id="tanggal_spm" name='tanggal_spm' placeholder="Tanggal WO" onChange={handleChange} required />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="nomor_do" className="form-label">Nomor DO</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_do" name='nomor_do' placeholder="Nomor Telpon Driver" onChange={handleChange} required />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="nomor_so" className="form-label">Nomor SO</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_so" name='nomor_so' placeholder="Nomor Telpon Driver" onChange={handleChange} required />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="nomor_mobil" className="form-label">Nopol Mobil</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_mobil" name='nomor_mobil' placeholder="Nopol Mobil" onChange={handleChange} required />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="nama_driver" className="form-label">Nama Driver</label>
                            <input className="form-control text-uppercase" type="text" id="nama_driver" name='nama_driver' placeholder="Nama Driver" onChange={handleChange} required />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="nomor_driver" className="form-label">Nomor Telpon Driver</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_driver" name='nomor_driver' placeholder="Nomor Telpon Driver" onChange={handleChange} required />
                        </div>
                        <div className="col-md-3 col-sm-12 col-sm-6 mb-3">
                            <label htmlFor="id_gudang" className="form-label">GUDANG</label>
                            <Select
                                id="id_gudang"
                                name="id_gudang"
                                value={selectedGudang}
                                onChange={handleGudangChange}
                                options={gudangOption}
                                placeholder="PILIH GUDANG"
                            />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="simpan" className="form-label">PROSES</label>
                            <button type="submit" className="btn btn-primary w-100">BERIKUTNYA</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

AddPage.propTypes = {
    handlePageChange: PropTypes.func.isRequired,
};

export default AddPage;