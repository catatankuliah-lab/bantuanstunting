import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';

const IndexWoPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
    const [WO, setWO] = useState([]);

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

    const fetchWO = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/wo/all');
            const data = await response.json();
            console.log(data);
            setWO(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchWO();
    }, []);

    return (
        <>
            {currentView === 'index' && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6 fw-bold">Data Working Order</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="">
                            Klik <button className="fw-bold btn btn-link p-0" onClick={handleAddMobilClick}>disini</button> untuk menambahkan data WO.
                        </div>
                    </div>
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="accordion mt-3" id="accordion_wo">
                            {WO.map(wo => (
                                <div key={wo.id_wo} className="card accordion-item">
                                    <h2 className="accordion-header px-2" id={`heading${wo.id_wo}`}>
                                        <button type="button" className="accordion-button accordion-button-primary collapsed text-primary" data-bs-toggle="collapse" data-bs-target={`#accordion${wo.id_wo}`} aria-expanded="false" aria-controls={`accordion${wo.id_wo}`}>
                                            {wo.nomor_wo} | {wo.gudang.kantor_cabang.nama_kantor_cabang} | {wo.total_tonase} KPM
                                        </button>
                                    </h2>
                                    <div id={`accordion${wo.id_wo}`} className="accordion-collapse collapse" data-bs-parent="#accordion_wo">
                                        <div className="accordion-body" style={{ marginTop: "-15px" }} >
                                            <div className="px-2">
                                                <hr />
                                                <div className="col-md-12 col-sm-12 mt-0 mt-md-3">
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {wo.tanggal_wo.slice(0,10)}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {wo.gudang.kantor_cabang.nama_kantor_cabang}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        GUDANG : {wo.gudang.nama_gudang}
                                                    </p>
                                                    <p>
                                                        {wo.total_tonase} KPM
                                                    </p>
                                                    <p className='' >
                                                        <button className="btn btn-link p-0" onClick={() => handleEditDataClick(wo.id_wo)}>
                                                            <i className="tf-icons bx bx-edit me-2"></i> DETAIL
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
            {currentView === 'add' && <AddPage currentView={currentView} handleBackClick={handleBackClick} refreshData={fetchWO} />}
            {currentView === 'detail' && detailId && <DetailPage id={detailId} handleBackClick={handleBackClick} />}
        </>
    );
};

export default IndexWoPage;
