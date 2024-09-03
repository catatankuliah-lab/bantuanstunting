import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';

const IndexJenisKendaraanPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
    const [jenisKendaraanData, setjenisKendaraanData] = useState([]);

    const handleAddMobilClick = () => {
        setCurrentView('add');
    };

    const handleEditDataClick = (id) => {
        setDetailId(id);
        setCurrentView('detail');
    };

    const handleBackClick = () => {
        setCurrentView('index');
    };

    const fetchjenisKendaraanData = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/jeniskendaraan/all');
            const data = await response.json();
            setjenisKendaraanData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchjenisKendaraanData();
    }, []);

    return (
        <>
            {currentView === 'index' && (
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
                            Klik <button className="fw-bold btn btn-link p-0" onClick={handleAddMobilClick}>disini</button> untuk menambahkan data Jenis/Tipe Mobil.
                        </div>
                    </div>
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="accordion mt-3" id="accordion_mobil">
                            {jenisKendaraanData.map(jenisKendaraan => (
                            <div key={jenisKendaraan.id_jenis_kendaraan} className="card accordion-item">
                                <h2 className="accordion-header px-2" id={`heading${jenisKendaraan.id_jenis_kendaraan}`}>
                                    <button type="button" className="accordion-button accordion-button-primary collapsed text-primary" data-bs-toggle="collapse" data-bs-target={`#accordion${jenisKendaraan.id_jenis_kendaraan}`} aria-expanded="false" aria-controls={`accordion${jenisKendaraan.id_jenis_kendaraan}`}>
                                        {jenisKendaraan.nama_jenis_kendaraan}
                                    </button>
                                </h2>
                                <div id={`accordion${jenisKendaraan.id_jenis_kendaraan}`} className="accordion-collapse collapse" data-bs-parent="#accordion_mobil">
                                    <div className="accordion-body">
                                        <div className="row p-2">
                                            <div className="col-md-12 col-sm-12 mt-3 mt-md-0">
                                                <p>BBM AC Off {jenisKendaraan.rumus_bbm_ac_off} KM/Liter</p>
                                                <p>BBM AC On {jenisKendaraan.rumus_bbm_ac_on} KM/Liter</p>
                                                <p>BBM PER Ton {jenisKendaraan.rumus_bbm_per_ton} KM/Liter</p>
                                                <p>Standby AC On {jenisKendaraan.rumus_standby_ac_on} KM/Liter</p>
                                                <p>Terakhir Diperbaharui : {jenisKendaraan.updatedAt}</p>
                                                <p>
                                                    <button className="btn btn-link p-0" onClick={() => handleEditDataClick(jenisKendaraan.id_jenis_kendaraan)}>
                                                        <i className="tf-icons bx bx-edit me-2"></i> EDIT DATA
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            )}
            {currentView === 'add' && <AddPage currentView={currentView} handleBackClick={handleBackClick} refreshData={fetchjenisKendaraanData}/>}
            {currentView === 'detail' && detailId && <DetailPage id={detailId} />}
        </>
    );
};

export default IndexJenisKendaraanPage;