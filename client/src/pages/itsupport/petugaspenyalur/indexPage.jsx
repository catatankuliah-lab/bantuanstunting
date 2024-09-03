import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';

const IndexDTTPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
    const [PetuagsPenyalur, setPetuagsPenyalur] = useState([]);

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

    const fetchPetuagsPenyalur = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/petugaspenyalur/all');
            const data = await response.json();
            console.log(data);
            setPetuagsPenyalur(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchPetuagsPenyalur();
    }, []);

    return (
        <>
            {currentView === 'index' && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6 fw-bold">Data DtT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="">
                            Klik <button className="fw-bold btn btn-link p-0" onClick={handleAddMobilClick}>disini</button> untuk menambahkan data DTT.
                        </div>
                    </div>
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="accordion mt-3" id="accordion_petugas_penyalur">
                            {PetuagsPenyalur.map(petugas_penyalur => (
                                <div key={petugas_penyalur.id_petugas_penyalur} className="card accordion-item">
                                    <h2 className="accordion-header px-2" id={`heading${petugas_penyalur.id_petugas_penyalur}`}>
                                        <button type="button" className="accordion-button accordion-button-primary collapsed text-primary" data-bs-toggle="collapse" data-bs-target={`#accordion${petugas_penyalur.id_petugas_penyalur}`} aria-expanded="false" aria-controls={`accordion${petugas_penyalur.id_petugas_penyalur}`}>
                                            {petugas_penyalur.user.nama_user}
                                        </button>
                                    </h2>
                                    <div id={`accordion${petugas_penyalur.id_petugas_penyalur}`} className="accordion-collapse collapse" data-bs-parent="#accordion_petugas_penyalur">
                                        <div className="accordion-body" style={{ marginTop: "-15px" }} >
                                            <div className="px-2">
                                                <hr />
                                                <div className="col-md-12 col-sm-12 mt-0 mt-md-3">
                                                    <p style={{ marginBottom: "2px" }}>
                                                        Nomor Telepon : {petugas_penyalur.user.nomor_telepon}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {petugas_penyalur.kantor_cabang.nama_kantor_cabang}
                                                    </p>
                                                    <p>
                                                        {petugas_penyalur.user.alamat_user}
                                                    </p>
                                                    <p className='d-none' >
                                                        <button className="btn btn-link p-0" onClick={() => handleEditDataClick(petugas_penyalur.id_petugas_penyalur)}>
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
            {currentView === 'add' && <AddPage currentView={currentView} handleBackClick={handleBackClick} refreshData={fetchPetuagsPenyalur} />}
            {currentView === 'detail' && detailId && <DetailPage id={detailId} />}
        </>
    );
};

export default IndexDTTPage;