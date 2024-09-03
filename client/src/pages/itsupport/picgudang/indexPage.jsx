import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';

const IndexPICGudangPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
    const [PICGudang, setPICGudang] = useState([]);

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

    const fetchPICGudang = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/picgudang/all');
            const data = await response.json();
            console.log(data);
            setPICGudang(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchPICGudang();
    }, []);

    return (
        <>
            {currentView === 'index' && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6 fw-bold">Data PIC Gudang</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="">
                            Klik <button className="fw-bold btn btn-link p-0" onClick={handleAddMobilClick}>disini</button> untuk menambahkan data PIC Gudang.
                        </div>
                    </div>
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="accordion mt-3" id="accordion_gudang">
                            {PICGudang.map(gudang => (
                                <div key={gudang.id_gudang} className="card accordion-item">
                                    <h2 className="accordion-header px-2" id={`heading${gudang.id_gudang}`}>
                                        <button type="button" className="accordion-button accordion-button-primary collapsed text-primary" data-bs-toggle="collapse" data-bs-target={`#accordion${gudang.id_gudang}`} aria-expanded="false" aria-controls={`accordion${gudang.id_gudang}`}>
                                            {gudang.user.nama_user}
                                        </button>
                                    </h2>
                                    <div id={`accordion${gudang.id_gudang}`} className="accordion-collapse collapse" data-bs-parent="#accordion_gudang">
                                        <div className="accordion-body" style={{ marginTop: "-15px" }} >
                                            <div className="px-2">
                                                <hr />
                                                <div className="col-md-12 col-sm-12 mt-0 mt-md-3">
                                                    <p style={{ marginBottom: "2px" }}>
                                                        Nomor telpon : {gudang.user.nomor_telepon}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {gudang.gudang.kantor_cabang.nama_kantor_cabang}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {gudang.gudang.nama_gudang}
                                                    </p>
                                                    <p>
                                                        {gudang.user.alamat_user}
                                                    </p>
                                                    <p className='d-none' >
                                                        <button className="btn btn-link p-0" onClick={() => handleEditDataClick(gudang.id_gudang)}>
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
            {currentView === 'add' && <AddPage currentView={currentView} handleBackClick={handleBackClick} refreshData={fetchPICGudang} />}
            {currentView === 'detail' && detailId && <DetailPage id={detailId} />}
        </>
    );
};

export default IndexPICGudangPage;