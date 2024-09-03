import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';

const IndexMobilPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
    const [mobilData, setMobilData] = useState([]);

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

    const fetchMobilData = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/mobil/all');
            const data = await response.json();
            console.log(data);
            setMobilData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchMobilData();
    }, []);

    return (
        <>
            {currentView === 'index' && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6">Data Mobil</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="">
                            Klik <button className="fw-bold btn btn-link p-0" onClick={handleAddMobilClick}>disini</button> untuk menambahkan data mobil.
                        </div>
                    </div>
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="accordion mt-3" id="accordion_mobil">
                            {mobilData.map(mobil => (
                            <div key={mobil.id_mobil} className="card accordion-item">
                                <h2 className="accordion-header px-2" id={`heading${mobil.id_mobil}`}>
                                    <button type="button" className="accordion-button accordion-button-primary collapsed text-primary" data-bs-toggle="collapse" data-bs-target={`#accordion${mobil.id_mobil}`} aria-expanded="false" aria-controls={`accordion${mobil.id_mobil}`}>
                                        {mobil.nopol}
                                    </button>
                                </h2>
                                <div id={`accordion${mobil.id_mobil}`} className="accordion-collapse collapse" data-bs-parent="#accordion_mobil">
                                    <div className="accordion-body">
                                        <div className="row p-2">
                                            <div className="col-md-3 col-sm-12 mt-3">
                                                <p>Tampak Depan Mobil</p>
                                                <img src={`http://localhost:5050/uploads/mobil/${mobil.foto_tampak_depan}`} alt="Tampak Depan Mobil" style={{ width: '100%', height: 'auto' }} />
                                            </div>
                                            <div className="col-md-3 col-sm-12 mt-3">
                                                <p>Tampak Belakang Mobil</p>
                                                <img src={`http://localhost:5050/uploads/mobil/${mobil.foto_tampak_belakang}`} alt="Tampak Belakang Mobil" style={{ width: '100%', height: 'auto' }} />
                                            </div>
                                            <div className="col-md-3 col-sm-12 mt-3">
                                                <p>Tampak Kanan Mobil</p>
                                                <img src={`http://localhost:5050/uploads/mobil/${mobil.foto_tampak_kanan}`} alt="Tampak Kanan Mobil" style={{ width: '100%', height: 'auto' }} />
                                            </div>
                                            <div className="col-md-3 col-sm-12 mt-3">
                                                <p>Tampak Kiri Mobil</p>
                                                <img src={`http://localhost:5050/uploads/mobil/${mobil.foto_tampak_kiri}`} alt="Tampak Kiri Mobil" style={{ width: '100%', height: 'auto' }} />
                                            </div>
                                            <div className="col-md-12 col-sm-12 mt-4">
                                                <p >Merek <span className='fw-bold'>{mobil.merk_mobil}</span></p>
                                                <p>Tipe & Model Kendaraan <span className='fw-bold'>{mobil.jenis_kendaraan.nama_jenis_kendaraan}</span></p>
                                                <p>
                                                    <button className="btn btn-link p-0" onClick={() => handleEditDataClick(mobil.id_mobil)}>
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
            {currentView === 'add' && <AddPage currentView={currentView} handleBackClick={handleBackClick} refreshData={fetchMobilData}/>}
            {currentView === 'detail' && detailId && <DetailPage id={detailId} />}
        </>
    );
};

export default IndexMobilPage;