import React, { useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';

const AddPage = ({ handlePageChange }) => {
    const [detailId, setDetailId] = useState('');
    const [alokasi, setAlokasi] = useState([]);
    const [selectedAlokasi, setSelectedAlokasi] = useState(null);
    const [provinsiOption, setProvinsiOption] = useState([]);
    const [selectedProvinsi, setSelectedProvinsi] = useState('');
    const [kabupatenOption, setKabupatenOption] = useState([]);
    const [selectedKabupaten, setSelectedKabupaten] = useState('');
    const [kecamatanOption, setKecamatanOption] = useState([]);
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [desaOption, setDesaOption] = useState([]);
    const [selectedDesa, setSelectedDesa] = useState('');
    const [kpmOption, setkpmOption] = useState([]);
    const [selectedKPM, setSelectedKPM] = useState('');
    const [detailKPM, setDetailKPM] = useState('');
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
                const datadesa = response.data.desa_kelurahan_by_kecamatan.map(desaall => ({
                    value: desaall.id_desa_kelurahan,
                    label: desaall.nama_desa_kelurahan
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
        const fetchKPMOptions = async (desaID) => {
            try {
                const response = await axios.get(`http://localhost:5050/api/masterdatakpm/iddesa/${desaID.value}`);
                const datakpm = response.data.map(kpmdesa => ({
                    value: kpmdesa.id_master_data_kpm,
                    label: kpmdesa.nama_kpm
                }));
                setkpmOption(datakpm);
                console.log(datakpm);
            } catch (error) {
                console.error('Error fetching', error);
            }
        };
        if (selectedDesa) {
            fetchKPMOptions(selectedDesa);
        }
    }, [selectedDesa]);

    const handleKPMChange = (selectedOption) => {
        setSelectedKPM(selectedOption);
    };

    useEffect(() => {
        const fetchDetailKPM = async (KPMID) => {
            try {
                const response = await axios.get(`http://localhost:5050/api/masterdatakpm/detail/${KPMID.value}`);
                setDetailKPM(response.data);
            } catch (error) {
                console.error('Error fetching', error);
            }
        };
        if (selectedKPM) {
            fetchDetailKPM(selectedKPM);
        }
    }, [selectedKPM]);

    const deleteFilter = () => {
        setSelectedProvinsi('');
        setSelectedKabupaten('');
        setSelectedKecamatan('');
        setSelectedDesa('');
        setKabupatenOption([]);
        setKecamatanOption([]);
        setDesaOption([]);
    };

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
            id_master_data_kpm: selectedKPM && typeof selectedKPM !== 'string' ? selectedKPM.value : '',
            id_desa_kelurahan: selectedDesa && typeof selectedDesa !== 'string' ? selectedDesa.value : '',
            id_user: 1,
            status_kpm_pengganti: "AKTIF",
            status_master_data_kpm: "DIGANTI"

        };
        console.log(dataToSubmit);
        try {
            await axios.post('http://localhost:5050/api/kpmpengganti/add', dataToSubmit);
            await axios.put(`http://localhost:5050/api/masterdatakpm/updatestatus/${dataToSubmit.id_master_data_kpm}`, dataToSubmit);
            Swal.fire({
                title: 'KPM Pengganti',
                text: 'Data KPM Pengganti Berhasil Ditambahkan',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
                position: 'center',
                timerProgressBar: true
            }).then(() => {
                // handlePageChange('index');
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
                            <span className="menu-header-text fs-6 fw-bold">Tambah KPM Pengganti</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="">
                    Klik <button className="fw-bold btn btn-link p-0" onClick={() => handlePageChange('index')}>disini</button> untuk kembali ke menu utama KPM Pengganti.
                </div>
            </div>
            <div className="col-md-12 mt-3">
                <form id="form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="tanggal_penggantian" className="form-label">Tanggal Pergantian</label>
                            <input className="form-control text-uppercase" type="date" id="tanggal_penggantian" name='tanggal_penggantian' placeholder="" onChange={handleChange} required />
                        </div>
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
                        <div className="col-md-3 col-sm-12 col-sm-6 mb-3">
                            <label htmlFor="id_desa_kelurahan" className="form-label">DESA/KELURAHAN</label>
                            <Select
                                id="id_desa_kelurahan"
                                name="id_desa_kelurahan"
                                value={selectedDesa}
                                onChange={handleDesaChange}
                                options={desaOption}
                                placeholder="PILIH DESA/KELURAHAN"
                            />
                        </div>
                        <div className="col-md-3 col-sm-12 col-sm-6 mb-3">
                            <label htmlFor="id_master_data_kpm" className="form-label">KPM AWAL</label>
                            <Select
                                id="id_master_data_kpm"
                                name="id_master_data_kpm"
                                value={selectedKPM}
                                onChange={handleKPMChange}
                                options={kpmOption}
                                placeholder="PILIH KPM AWAL"
                            />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="alamat_kpm" className="form-label">Alamat KPM Awal</label>
                            <input className="form-control text-uppercase" type="text" id="alamat_kpm" name='alamat_kpm' placeholder="ALAMAT KPM AWAL" value={detailKPM.alamat_kpm} required readOnly />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="nama_kpm_pengganti" className="form-label">Nama KPM Pengganti</label>
                            <input className="form-control text-uppercase" type="text" id="nama_kpm_pengganti" name='nama_kpm_pengganti' placeholder="NAMA KPM PENGGANTI" onChange={handleChange} required />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="alamat_kpm_pengganti" className="form-label">Alamat KPM Pengganti</label>
                            <input className="form-control text-uppercase" type="text" id="alamat_kpm_pengganti" name='alamat_kpm_pengganti' placeholder="ALAMAT KPM PENGGANTI" onChange={handleChange} required />
                        </div>
                        <div className="col-md-3 col-sm-12 mb-3">
                            <label htmlFor="" className="form-label">PROSES</label>
                            <button type="submit" className="btn btn-primary w-100">SIMPAN</button>
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