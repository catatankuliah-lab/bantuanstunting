import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';

const ITSupportIndexAdminKantorCabangPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
    const [adminKantorCabang, setAdminKantorCabang] = useState([]);

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

    const fetchAdminKantorCabang = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/adminkancab/all');
            const data = await response.json();
            console.log(data);
            setAdminKantorCabang(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchAdminKantorCabang();
    }, []);

    return (
        <>
            {currentView === 'index' && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6 fw-bold">Data Admin Kantor Cabang</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="">
                            Klik <button className="fw-bold btn btn-link p-0" onClick={handleAddMobilClick}>disini</button> untuk menambahkan data Admin Kantor Cabang.
                        </div>
                    </div>
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="accordion mt-3" id="accordion_kantor_cabang">
                            {adminKantorCabang.map(adminkantorcabang => (
                                <div key={adminkantorcabang.id_admin_kancab} className="card accordion-item">
                                    <h2 className="accordion-header px-2" id={`heading${adminkantorcabang.id_admin_kancab}`}>
                                        <button type="button" className="accordion-button accordion-button-primary collapsed text-primary" data-bs-toggle="collapse" data-bs-target={`#accordion${adminkantorcabang.id_admin_kancab}`} aria-expanded="false" aria-controls={`accordion${adminkantorcabang.id_admin_kancab}`}>
                                            {adminkantorcabang.user.nama_user}
                                        </button>
                                    </h2>
                                    <div id={`accordion${adminkantorcabang.id_admin_kancab}`} className="accordion-collapse collapse" data-bs-parent="#accordion_kantor_cabang">
                                        <div className="accordion-body" style={{ marginTop: "-15px" }} >
                                            <div className="px-2">
                                                <hr />
                                                <div className="col-md-12 col-sm-12 mt-0 mt-md-3" >
                                                    <p style={{ marginBottom: "2px" }}>
                                                        Nomor Telepon : {adminkantorcabang.user.nomor_telepon}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {adminkantorcabang.kantor_cabang.nama_kantor_cabang}
                                                    </p>
                                                    <p>{adminkantorcabang.user.alamat_user}</p>
                                                    <p className='d-none' >
                                                        <button className="btn btn-link p-0" onClick={() => handleEditDataClick(adminkantorcabang.id_admin_kancab)}>
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
            {currentView === 'add' && <AddPage currentView={currentView} handleBackClick={handleBackClick} refreshData={fetchAdminKantorCabang} />}
            {currentView === 'detail' && detailId && <DetailPage id={detailId} />}
        </>
    );
};

export default ITSupportIndexAdminKantorCabangPage;