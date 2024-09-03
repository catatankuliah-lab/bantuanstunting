import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';


const DetailPage = ({ handlePageChange, detailId }) => {
    const [selectedAlokasi, setSelectedAlokasi] = useState(null);
    const [alokasi, setAlokasi] = useState([]);
    const [provinsiOption, setProvinsiOption] = useState([]);
    const [selectedProvinsi, setSelectedProvinsi] = useState('');
    const [kabupatenOption, setKabupatenOption] = useState([]);
    const [selectedKabupaten, setSelectedKabupaten] = useState('');
    const [kecamatanOption, setKecamatanOption] = useState([]);
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [desaOption, setDesaOption] = useState([]);
    const [selectedDesa, setSelectedDesa] = useState('');
    const [gudangOption, setGudangOption] = useState([]);
    const [selectedGudang, setSelectedGudang] = useState('');
    const [spm, setSPM] = useState('');
    const [formData, setFormData] = useState({
    });
    const inputRef = useRef(null);

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
        const fetchProvinsiOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/provinsi/all');
                const dataprovinsi = response.data.map(provinsiall => ({
                    value: provinsiall.id_provinsi,
                    label: provinsiall.nama_provinsi
                }));
                setProvinsiOption(dataprovinsi);
            } catch (error) {
                console.error('Error fetching', error);
            }
        };
        fetchProvinsiOptions();
    }, []);

    const handleProvinsiChange = (selectedOption) => {
        setSelectedProvinsi(selectedOption);
    };

    useEffect(() => {
        const fetchKabupatenOptions = async (provinsiId) => {
            try {
                const response = await axios.get(`http://localhost:5050/api/provinsi/details/${provinsiId.value}`);
                const datakabupatenkota = response.data.kabupaten_by_provinsi.map(kabupatenkotaall => ({
                    value: kabupatenkotaall.id_kabupaten_kota,
                    label: kabupatenkotaall.nama_kabupaten_kota
                }));
                setKabupatenOption(datakabupatenkota);
            } catch (error) {
                console.error('Error fetching', error);
            }
        };
        if (selectedProvinsi) {
            fetchKabupatenOptions(selectedProvinsi);
        }
    }, [selectedProvinsi]);

    const handleKabupatenChange = (selectedOption) => {
        setSelectedKabupaten(selectedOption);
    };

    useEffect(() => {
        const fetchKecamatanOptions = async (kabupatenID) => {
            try {
                const response = await axios.get(`http://localhost:5050/api/kabupaten/details/${kabupatenID.value}`);
                const datakecamatan = response.data.kecamatan_by_kabupaten.map(kecamatanall => ({
                    value: kecamatanall.id_kecamatan,
                    label: kecamatanall.nama_kecamatan
                }));
                setKecamatanOption(datakecamatan);
            } catch (error) {
                console.error('Error fetching', error);
            }
        };
        if (selectedKabupaten) {
            fetchKecamatanOptions(selectedKabupaten);
        }
    }, [selectedKabupaten]);

    const handleKecamatanChange = (selectedOption) => {
        setSelectedKecamatan(selectedOption);
    };

    useEffect(() => {
        const fetchDesaOptions = async (kecamatanID) => {
            try {
                const response = await axios.get(`http://localhost:5050/api/kecamatan/details/${kecamatanID.value}`);
                console.log(response.data.desa_kelurahan_by_kecamatan);
                const datadesa = response.data.desa_kelurahan_by_kecamatan.map(desaall => ({
                    id_lo: detailId,
                    id_desa_kelurahan: desaall.id_desa_kelurahan,
                    nama_desa_kelurahan: desaall.nama_desa_kelurahan,
                    jumlah_alokasi_desa_sisa: desaall.jumlah_alokasi_desa_sisa,
                }));
                setDesaOption(datadesa);
            } catch (error) {
                console.error('Error fetching', error);
            }
        };
        if (selectedKecamatan) {
            fetchDesaOptions(selectedKecamatan);
        }
    }, [selectedKecamatan]);

    const handleDesaChange = (selectedOption) => {
        setSelectedDesa(selectedOption);
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
        const fetchSPM = async (detailId) => {
            console.log(detailId);
            try {
                const response = await axios.get(`http://localhost:5050/api/spm/detail/${detailId}`);
                console.log(response.data);
                setSPM(response.data);
                // const datadesa = response.data.desa_kelurahan_by_kecamatan.map(desaall => ({
                //     value: desaall.id_desa_kelurahan,
                //     label: desaall.nama_desa_kelurahan
                // }));
                // setDesaOption(datadesa);
            } catch (error) {
                console.error('Error fetching', error);
            }
        };
        if (detailId) {
            fetchSPM(detailId);
        }
    }, [detailId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleSaveTonase = (idlo, iddesa, jumlah) => {
        console.log(idlo, iddesa, jumlah);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="mb-3">
                    <div className="divider text-start fw-bold">
                        <div className="divider-text">
                            <span className="menu-header-text fs-6">Detail Data Surat Perintah Muat (SPM)</span>
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
                    <div className='row'>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="id_alokasi" className="form-label">ALOKASI</label>
                            <input className="form-control text-uppercase" type="text" id="id_alokasi" name='id_alokasi' placeholder="Tanggal WO" onChange={handleChange} value={"OKTOBER"} required readOnly />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="tanggal_spm" className="form-label">Tanggal Surat Perintah Muat (SPM)</label>
                            <input className="form-control text-uppercase" type="date" id="tanggal_spm" name='tanggal_spm' placeholder="Tanggal WO" onChange={handleChange} ref={inputRef} defaultValue={spm?.tanggal_spm || ""} required />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="nomor_do" className="form-label">Nomor DO</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_do" name='nomor_do' placeholder="Nomor Telpon Driver" onChange={handleChange} ref={inputRef} defaultValue={spm?.nomor_do || ""} required />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="nomor_so" className="form-label">Nomor SO</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_so" name='nomor_so' placeholder="Nomor Telpon Driver" onChange={handleChange} ref={inputRef} defaultValue={spm?.nomor_so || ""} required />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="nomor_mobil" className="form-label">Nopol Mobil</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_mobil" name='nomor_mobil' placeholder="Nopol Mobil" onChange={handleChange} ref={inputRef} defaultValue={spm?.nomor_mobil || ""} required />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="nama_driver" className="form-label">Nama Driver</label>
                            <input className="form-control text-uppercase" type="text" id="nama_driver" name='nama_driver' placeholder="Nama Driver" onChange={handleChange} ref={inputRef} defaultValue={spm?.nama_driver || ""} required />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="nomor_driver" className="form-label">Nomor Telpon Driver</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_driver" name='nomor_driver' placeholder="Nomor Telpon Driver" onChange={handleChange} ref={inputRef} defaultValue={spm?.nomor_driver || ""} required />
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
                            <button type="submit" className="btn btn-primary w-100">SIMPAN PEUBAHAN</button>
                        </div>
                        <div className="col-md-3 col-sm-12 col-sm-6 mb-3">
                            <label htmlFor="id_provinsi" className="form-label">PROVINSI</label>
                            <Select
                                id="id_provinsi"
                                name="id_provinsi"
                                value={selectedProvinsi}
                                onChange={handleProvinsiChange}
                                options={provinsiOption}
                                placeholder="PILIH PROVINSI"
                            />
                        </div>
                        <div className="col-md-3 col-sm-12 col-sm-6 mb-3">
                            <label htmlFor="id_kabupaten_kota" className="form-label">KABUPATEN/KOTA</label>
                            <Select
                                id="id_kabupaten_kota"
                                name="id_kabupaten_kota"
                                value={selectedKabupaten}
                                onChange={handleKabupatenChange}
                                options={kabupatenOption}
                                placeholder="PILIH KABUPATEN/KOTA"
                            />
                        </div>
                        <div className="col-md-3 col-sm-12 col-sm-6 mb-3">
                            <label htmlFor="id_kecamatan" className="form-label">KECAMATAN</label>
                            <Select
                                id="id_kecamatan"
                                name="id_kecamatan"
                                value={selectedKecamatan}
                                onChange={handleKecamatanChange}
                                options={kecamatanOption}
                                placeholder="PILIH KECAMATAN"
                            />
                        </div>
                        <div className="col-md-12 mb-4 mb-md-0 mt-3">
                            <div className='table-responsive text-nowrap'>
                                <table className="table" style={{ fontSize: "13px" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "5px" }} >No</th>
                                            <th>Desa/Kelurahan</th>
                                            <th style={{ width: "3px" }} >KRS</th>
                                            <th style={{ width: "3px" }} ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {desaOption.map((desa, index) => (
                                            <tr key={index} className={`${desa.jumlah_alokasi_desa_sisa == 0 ? 'd-none' : ''}`} >
                                                <td>{index + 1}</td>
                                                <td>{desa.nama_desa_kelurahan}</td>
                                                <td>{desa.jumlah_alokasi_desa_sisa}</td>
                                                <td>
                                                    <button className="btn btn-link text-start" type="button" id="button-addon2" onClick={() => handleSaveTonase(desa.id_lo, desa.id_desa_kelurahan, desa.jumlah_alokasi_desa_sisa)}><i className="tf-icons bx bx-plus-circle"></i></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

DetailPage.propTypes = {
    handlePageChange: PropTypes.func.isRequired,
    detailId: PropTypes.number.isRequired,
    gudang: PropTypes.number.isRequired
};

export default DetailPage;
