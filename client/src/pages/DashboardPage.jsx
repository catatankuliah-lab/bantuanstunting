import React, { useState } from 'react';

const DashboardPage = () => {
    console.clear();
    return (
        <>
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
                </div>
                <div className="col-md-12 mb-4 mb-md-0">
                    <div className="accordion mt-3" id="accordion_konselor">
                        <div className="card accordion-item">
                            <h2 className="accordion-header px-2" id="headingOne">
                                <button type="button" className="accordion-button accordion-button-primary collapsed text-primary" data-bs-toggle="collapse" data-bs-target="#accordion1" aria-expanded="false" aria-controls="accordion1">
                                    E 88 LOG
                                </button>
                            </h2>
                            <div id="accordion1" className="accordion-collapse collapse" data-bs-parent="#accordion_konselor">
                                <div className="accordion-body">
                                    <div className="row p-2">
                                        <div className="col-md-2 col-sm-12">
                                            <img src="https://via.placeholder.com/150" alt="Image Mobil" />
                                        </div>
                                        <div className="col-md-10 col-sm-12 mt-3 mt-md-0">
                                            <p>
                                                {/* Informasi lainnya tentang mobil */}
                                            </p>
                                            <p style={{ marginTop: "-10px" }}>
                                                {/* Informasi lainnya tentang mobil */}
                                            </p>
                                            <p style={{ marginTop: "-10px" }}>
                                                <button className="btn btn-link p-0">
                                                    <i className="tf-icons bx bx-edit"></i> Edit Data
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card accordion-item">
                            <h2 className="accordion-header px-2" id="headingOne">
                                <button type="button" className="accordion-button accordion-button-primary collapsed text-primary" data-bs-toggle="collapse" data-bs-target="#accordion2" aria-expanded="false" aria-controls="accordion2">
                                    E 88 LOG
                                </button>
                            </h2>
                            <div id="accordion2" className="accordion-collapse collapse" data-bs-parent="#accordion_konselor">
                                <div className="accordion-body">
                                    <div className="row p-2">
                                        <div className="col-md-2 col-sm-12">
                                            <img src="https://via.placeholder.com/150" alt="Image Mobil" />
                                        </div>
                                        <div className="col-md-10 col-sm-12 mt-3 mt-md-0">
                                            <p>
                                                {/* Informasi lainnya tentang mobil */}
                                            </p>
                                            <p style={{ marginTop: "-10px" }}>
                                                {/* Informasi lainnya tentang mobil */}
                                            </p>
                                            <p style={{ marginTop: "-10px" }}>
                                                <button className="btn btn-link p-0">
                                                    <i className="tf-icons bx bx-edit"></i> Edit Data
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;