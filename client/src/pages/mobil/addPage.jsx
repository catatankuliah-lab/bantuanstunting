import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';


const DropzoneField = ({ fieldName, label, formData, setFormData }) => {
    const onDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [fieldName]: acceptedFiles[0]
            }));
        } else {
            alert('Hanya file gambar yang diizinkan!');
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        maxFiles: 1
    });

    return (
        <div className="col-md-6 col-sm-12 mb-3">
            <label htmlFor={fieldName} className="form-label">{label}</label>
            <div {...getRootProps()} className="dropzone form-control">
                <input {...getInputProps()} />
                {!formData[fieldName] ? (
                    <p className='mt-3 text-center'>Pilih atau Drag n Drop {label.toLowerCase()}</p>
                ) : (
                    <div className='mt-3'>
                        <p>{formData[fieldName].name}</p>
                        <img
                            src={URL.createObjectURL(formData[fieldName])}
                            alt="Preview"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

DropzoneField.propTypes = {
    fieldName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
};

const AddPage = ({ currentView, handleBackClick, refreshData }) => {

    const [formData, setFormData] = useState({
        nopol: '',
        merk_mobil: '',
        id_jenis_kendaraan: '',
        warna_mobil: '',
        warna_tnkb_mobil: '',
        tahun_pembuatan_mobil: '',
        tahun_registrasi_mobil: '',
        ukuran_silinder_mobil: '',
        id_bbm: '',
        nomor_mesin_mobil: '',
        nomor_rangka_mobil: '',
        nomor_bpkb_mobil: '',
        nomor_stnk_mobil: '',
        masa_berlaku_stnk_mobil: '',
        bobot_mobil: '',
        nomor_kir_mobil: '',
        masa_berlaku_kir_mobil: '',
        status_mobil: '',
        foto_tampak_depan: null,
        foto_tampak_belakang: null,
        foto_tampak_kanan: null,
        foto_tampak_kiri: null,
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
            data.append('foto_tampak_depan', formData.foto_tampak_depan);
            data.append('foto_tampak_belakang', formData.foto_tampak_belakang);
            data.append('foto_tampak_kanan', formData.foto_tampak_kanan);
            data.append('foto_tampak_kiri', formData.foto_tampak_kiri);
            data.append('nopol', formData.nopol);
            data.append('merk_mobil', formData.merk_mobil);
            data.append('id_jenis_kendaraan', formData.id_jenis_kendaraan);
            data.append('warna_mobil', formData.warna_mobil);
            data.append('warna_tnkb_mobil', formData.warna_tnkb_mobil);
            data.append('tahun_pembuatan_mobil', formData.tahun_pembuatan_mobil);
            data.append('tahun_registrasi_mobil', formData.tahun_registrasi_mobil);
            data.append('ukuran_silinder_mobil', formData.ukuran_silinder_mobil);
            data.append('id_bbm', formData.id_bbm);
            data.append('nomor_mesin_mobil', formData.nomor_mesin_mobil);
            data.append('nomor_rangka_mobil', formData.nomor_rangka_mobil);
            data.append('nomor_bpkb_mobil', formData.nomor_bpkb_mobil);
            data.append('nomor_stnk_mobil', formData.nomor_stnk_mobil);
            data.append('masa_berlaku_stnk_mobil', formData.masa_berlaku_stnk_mobil);
            data.append('bobot_mobil', formData.bobot_mobil);
            data.append('nomor_kir_mobil', formData.nomor_kir_mobil);
            data.append('masa_berlaku_kir_mobil', formData.masa_berlaku_kir_mobil);
            data.append('status_mobil', formData.status_mobil);

            const response = await axios.post('http://localhost:5050/api/mobil/add', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Response:', response.data);
            alert('Data mobil berhasil ditambahkan!');
            refreshData();
            handleBackClick();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Gagal menambahkan data mobil.');
        }
    };

    useEffect(() => {
        const fetchBbmOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/bbm/all');
                setBbmOptions(response.data);
            } catch (error) {
                console.error('Error fetching BBM options:', error);
            }
        };

        const fetchJenisKendaraanOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/jeniskendaraan/all');
                setJenisKendaraanOptions(response.data);
            } catch (error) {
                console.error('Error fetching vehicle options:', error);
            }
        };

        fetchBbmOptions();
        fetchJenisKendaraanOptions();
    }, []);

    const [bbmOptions, setBbmOptions] = useState([]);
    const [jenisKendaraanOptions, setJenisKendaraanOptions] = useState([]);

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="mb-3">
                    <div className="divider text-start">
                        <div className="divider-text">
                            <span className="menu-header-text fs-6">Tambah Data Mobil</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="">
                    Klik <button className="fw-bold btn btn-link p-0" onClick={handleBackClick}>disini</button> untuk kembali ke menu utama Mobil.
                </div>
            </div>
            <div className="col-md-12 mt-3">
                <form id="form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="nopol" className="form-label">Plat Nomor Mobil</label>
                            <input className="form-control text-uppercase" type="text" id="nopol" name='nopol' placeholder="X 0000 XX" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="merk_mobil" className="form-label">Merk Mobil</label>
                            <input className="form-control text-uppercase" type="text" id="merk_mobil" name='merk_mobil' placeholder="Merk Mobil" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="id_jenis_kendaraan" className="form-label">Jenis & Type</label>
                            <select className="form-control" id="id_jenis_kendaraan" name="id_jenis_kendaraan" onChange={handleChange} required>
                                <option value="0" disabled selected>Pilih Tipe Jenis & Mobil</option>
                                {jenisKendaraanOptions.map((jeniskendaraan) => (
                                    <option key={jeniskendaraan.id_jenis_kendaraan} value={jeniskendaraan.id_jenis_kendaraan}>{jeniskendaraan.nama_jenis_kendaraan}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="id_bbm" className="form-label">Jenis BBM</label>
                            <select className="form-control" id="id_bbm" name="id_bbm" onChange={handleChange} required>
                                <option value="0" disabled selected>Pilih Jenis BBM</option>
                                {bbmOptions.map((bbm) => (
                                    <option key={bbm.id_bbm} value={bbm.id_bbm}>{bbm.nama_bbm}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="warna_mobil" className="form-label">Warna Mobil</label>
                            <input className="form-control text-uppercase" type="text" id="warna_mobil" name='warna_mobil' placeholder="Tipe Mobil" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="warna_tnkb_mobil" className="form-label">Warna TNKB</label>
                            <input className="form-control text-uppercase" type="text" id="warna_tnkb_mobil" name='warna_tnkb_mobil' placeholder="Tipe Mobil" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="tahun_pembuatan_mobil" className="form-label">Tahun Pembuatan</label>
                            <input className="form-control text-uppercase" type="number" id="tahun_pembuatan_mobil" name='tahun_pembuatan_mobil' placeholder="0000" onChange={handleChange} required min="1900" max="2099" />
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="tahun_registrasi_mobil" className="form-label">Tahun Registrasi</label>
                            <input className="form-control text-uppercase" type="number" id="tahun_registrasi_mobil" name='tahun_registrasi_mobil' placeholder="0000" onChange={handleChange} required min="1900" max="2099" />
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="ukuran_silinder_mobil" className="form-label">Ukuran Silinder</label>
                            <div className="input-group">
                                <input className="form-control text-uppercase" type="number" id="ukuran_silinder_mobil" name='ukuran_silinder_mobil' placeholder="0000" onChange={handleChange} required />
                                <span className="input-group-text">CC</span>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="nomor_mesin_mobil" className="form-label">Nomor Mesin</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_mesin_mobil" name='nomor_mesin_mobil' placeholder="00000000000000000" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="nomor_rangka_mobil" className="form-label">Nomor Rangka</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_rangka_mobil" name='nomor_rangka_mobil' placeholder="00000000000000000" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="nomor_bpkb_mobil" className="form-label">Nomor BPKB</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_bpkb_mobil" name='nomor_bpkb_mobil' placeholder="00000000000000000" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="nomor_stnk_mobil" className="form-label">Nomor STNK</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_stnk_mobil" name='nomor_stnk_mobil' placeholder="00000000000000000" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="masa_berlaku_stnk_mobil" className="form-label">Masa Berlaku STNK</label>
                            <input className="form-control text-uppercase" type="date" id="masa_berlaku_stnk_mobil" name='masa_berlaku_stnk_mobil' onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="bobot_mobil" className="form-label">Bobot</label>
                            <div className="input-group">
                                <input className="form-control text-uppercase" type="number" id="bobot_mobil" name='bobot_mobil' placeholder="0000" onChange={handleChange} required />
                                <span className="input-group-text">Kg</span>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="nomor_kir_mobil" className="form-label">Nomor KIR</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_kir_mobil" name='nomor_kir_mobil' placeholder="00000000000000000" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="masa_berlaku_kir_mobil" className="form-label">Masa Berlaku KIR</label>
                            <input className="form-control text-uppercase" type="date" id="masa_berlaku_kir_mobil" name='masa_berlaku_kir_mobil' onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 col-sm-12 mb-3">
                            <label htmlFor="status_mobil" className="form-label">Status Mobil</label>
                            <select className="form-control" id="status_mobil" name="status_mobil" onChange={handleChange} required>
                                <option value="0" disabled selected>Pilih Status Mobil</option>
                                <option value="on duty">On Duty</option>
                                <option value="avaliable">Avaliable</option>
                                <option value="under maintenance">Under Maintenance</option>
                            </select>
                        </div>
                        <DropzoneField fieldName="foto_tampak_depan" label="Tampak Depan Mobil" formData={formData} setFormData={setFormData} />
                        <DropzoneField fieldName="foto_tampak_belakang" label="Tampak Belakang Mobil" formData={formData} setFormData={setFormData} />
                        <DropzoneField fieldName="foto_tampak_kanan" label="Tampak Kanan Mobil" formData={formData} setFormData={setFormData} />
                        <DropzoneField fieldName="foto_tampak_kiri" label="Tampak Kiri Mobil" formData={formData} setFormData={setFormData} />
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