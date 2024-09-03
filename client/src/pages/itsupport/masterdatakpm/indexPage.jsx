import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';

const IndexArmadaPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
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
    const [masterDataKPM, setMasterDataKPM] = useState([]);

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

    const deleteFilter = () => {
        setSelectedProvinsi('');
        setSelectedKabupaten('');
        setSelectedKecamatan('');
        setSelectedDesa('');
        setKabupatenOption([]);
        setKecamatanOption([]);
        setDesaOption([]);
    };

    const showFilter = (idalokasi, iddesa) => {
        if (idalokasi == null) {
            Swal.fire({
                title: 'Filter Data',
                text: 'Pilih Alokasi Terlebih Dahulu',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
                position: 'center',
                timerProgressBar: true
            });
        } else {
            if (iddesa == '') {
                const fetcMasterDataKPM = async () => {
                    try {
                        const response = await axios.get('http://localhost:5050/api/masterdatakpm/all');
                        const datamasterdatakpm = response.data.map((masterdatakpm, index) => ({
                            no: index + 1,
                            provinsi: masterdatakpm.nama_provinsi,
                            kabupatenkota: masterdatakpm.nama_kabupaten_kota,
                            kecamatan: masterdatakpm.nama_kecamatan,
                            desakelurahan: masterdatakpm.nama_desa_kelurahan,
                            namakpm: masterdatakpm.nama_kpm,
                            alamatkpm: masterdatakpm.alamat_kpm,
                            statuskpm: masterdatakpm.status_master_data_kpm
                        }));
                        setMasterDataKPM(datamasterdatakpm);
                    } catch (error) {
                        console.error('Error fetching', error);
                    }
                };
                fetcMasterDataKPM();
            } else {
                console.log(iddesa);
                const fetcMasterDataKPM = async () => {
                    try {
                        const response = await axios.get(`http://localhost:5050/api/masterdatakpm/iddesa/${iddesa.value}`);
                        const datamasterdatakpm = response.data.map((masterdatakpm, index) => ({
                            no: index + 1,
                            provinsi: masterdatakpm.nama_provinsi,
                            kabupatenkota: masterdatakpm.nama_kabupaten_kota,
                            kecamatan: masterdatakpm.nama_kecamatan,
                            desakelurahan: masterdatakpm.nama_desa_kelurahan,
                            namakpm: masterdatakpm.nama_kpm,
                            alamatkpm: masterdatakpm.alamat_kpm,
                            statuskpm: masterdatakpm.status_master_data_kpm
                        }));
                        setMasterDataKPM(datamasterdatakpm);
                    } catch (error) {
                        console.error('Error fetching', error);
                    }
                };
                fetcMasterDataKPM();
            }
        }
    };

    return (
        <div>
            {currentView === 'index' && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6 fw-bold">Master Data KPM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 mt-3">
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
                            <div className="col-md-3 col-sm-12 mb-3">
                                <label htmlFor="" className="form-label">FILTER</label>
                                <button type="button" className="btn btn-primary w-100" onClick={() => deleteFilter()} >HAPUS FILTER</button>
                            </div>
                            <div className="col-md-3 col-sm-12 mb-3">
                                <label htmlFor="" className="form-label">PROSES</label>
                                <button type="button" className="btn btn-primary w-100" onClick={() => showFilter(
                                    selectedAlokasi,
                                    selectedDesa
                                )} >TAMPILKAN</button>
                            </div>
                            <div className="col-md-12 mb-4 mb-md-0 mt-3">
                                <div className='table-responsive text-nowrap'>
                                    <table className="table" style={{ fontSize: "13px" }}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: "5px" }} >No</th>
                                                <th>Provinsi</th>
                                                <th>Kabupaten/Kota</th>
                                                <th>Kecamatan</th>
                                                <th>Desa/Kelurahan</th>
                                                <th>Nama KPM</th>
                                                <th>Alamat KPM</th>
                                                <th>Status KPM</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {masterDataKPM.map(mdKPM => (
                                                <tr key={mdKPM.no}>
                                                    <td>{mdKPM.no}</td>
                                                    <td>{mdKPM.provinsi}</td>
                                                    <td>{mdKPM.kabupatenkota}</td>
                                                    <td>{mdKPM.kecamatan}</td>
                                                    <td>{mdKPM.desakelurahan}</td>
                                                    <td>{mdKPM.namakpm}</td>
                                                    <td>{mdKPM.alamatkpm}</td>
                                                    <td>{mdKPM.statuskpm}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IndexArmadaPage;