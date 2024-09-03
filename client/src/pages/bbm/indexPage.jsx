import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';

const IndexBbmPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
    const [bbmData, setBbmData] = useState([]);

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

    const fetchBbmData = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/bbm/all');
            const data = await response.json();
            setBbmData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchBbmData();
    }, []);

    return (
        <>
            {currentView === 'index' && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6">Data BBM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="">
                            Klik <button className="fw-bold btn btn-link p-0" onClick={handleAddMobilClick}>disini</button> untuk menambahkan data BBM.
                        </div>
                    </div>
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="accordion mt-3" id="accordion_mobil">
                            {bbmData.map(bbm => (
                            <div key={bbm.id_bbm} className="card accordion-item">
                                <h2 className="accordion-header px-2" id={`heading${bbm.id_bbm}`}>
                                    <button type="button" className="accordion-button accordion-button-primary collapsed text-primary" data-bs-toggle="collapse" data-bs-target={`#accordion${bbm.id_bbm}`} aria-expanded="false" aria-controls={`accordion${bbm.id_bbm}`}>
                                        {bbm.nama_bbm}
                                    </button>
                                </h2>
                                <div id={`accordion${bbm.id_bbm}`} className="accordion-collapse collapse" data-bs-parent="#accordion_mobil">
                                    <div className="accordion-body">
                                        <div className="row p-2">
                                            <div className="col-md-2 col-sm-12">
                                                <img className='rounded' src="https://img.freepik.com/free-psd/3d-rendering-firefighter-icon_23-2149859772.jpg?w=1060&t=st=1718771154~exp=1718771754~hmac=1304c247531cac6cf18bf540b60ad616c3b09b7e9aaf916e3a0c3d640c4981fe" alt="Image Mobil"  style={{ width: '100%', height: 'auto' }} />
                                            </div>
                                            <div className="col-md-10 col-sm-12 mt-3 mt-md-0">
                                                <p>Harga /Liter Rp.{bbm.harga_bbm},-</p>
                                                <p style={{ marginTop: "-10px" }}>Terakhir Diperbaharui : {bbm.updatedAt}</p>
                                                <p style={{ marginTop: "-10px" }}>
                                                    <button className="btn btn-link p-0" onClick={() => handleEditDataClick(bbm.id_bbm)}>
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
            {currentView === 'add' && <AddPage currentView={currentView} handleBackClick={handleBackClick} refreshData={fetchBbmData}/>}
            {currentView === 'detail' && detailId && <DetailPage id={detailId} />}
        </>
    );
};

export default IndexBbmPage;