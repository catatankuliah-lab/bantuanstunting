import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';
import axios from 'axios';
import Select from 'react-select';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const IndexLOPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
    const [alokasiOption, setAlokasiOption] = useState([]);
    const [selectedAlokasi, setSelectedAlokasi] = useState(null);
    const [LO, setLO] = useState([]);

    const handlePageChange = (page, id = null) => {
        setCurrentView(page);
        if (id !== null) {
            setDetailId(id);
        }
    };

    const handleAdd = () => {
        setCurrentView('add');
    };

    const handleEditDataClick = (id) => {
        setDetailId(id);
        setCurrentView('detail');
    };

    const handleDeleteDataClick = async (id) => {
        try {
            await axios.get(`http://localhost:5050/api/wo2408/delete/${id}`);
            console.log('WO deleted successfully');
        } catch (error) {
            console.error('Error deleting WO:', error);
        }
        await fetchLO();
    };

    const handleBackClick = () => {
        setCurrentView('index');
        fetchLO();
    };

    const handleCreatePDFClick = () => {
        console.log("diclick");
        const doc = new jsPDF();
        let xLeft = 13;
        let y = 10;
        let halaman = 1;
        let halamanbaru = true;
        doc.setFontSize(8);

        // awal header
        const imageUrlKiri = `${process.env.PUBLIC_URL}/assets/img/logos/logosmall.png`;
        doc.addImage(imageUrlKiri, 'PNG', 10, 10, 40, 10);
        const imageUrlKanan = `${process.env.PUBLIC_URL}/assets/img/logos/bgr1.png`;
        doc.addImage(imageUrlKanan, 'PNG', 160, 10, 40, 12);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        // Mulai Header
        doc.setFont('helvetica', 'bold');
        const title1 = 'BERITA ACARA SERAH TERIMA';
        const title2 = 'BANTUAN STUNTING 2024';
        doc.setLineWidth(1);
        doc.rect(10, 25, 190, 0);
        doc.setLineWidth(0.1);
        doc.text(title1, 105, 15, { align: 'center' });
        doc.text(title2, 105, 21, { align: 'center' });
        // Akhir Header

        // Buat Tabel
        doc.rect(10, 30, 40, 10);
        doc.rect(50, 30, 55, 10);
        doc.rect(105, 30, 35, 10);
        doc.rect(140, 30, 60, 10);
        doc.rect(10, 40, 40, 10);
        doc.rect(50, 40, 55, 10);
        doc.rect(105, 40, 35, 10);
        doc.rect(140, 40, 60, 10);
        doc.rect(10, 50, 40, 10);
        doc.rect(50, 50, 55, 10);
        doc.rect(105, 50, 35, 10);
        doc.rect(140, 50, 60, 10);
        // Akhir Buat Tabel 

        // Buat Isi Tabel
        doc.setFont('helvetica', 'normal');
        doc.text("Nomor LO", 12, 36);
        doc.text("Nopol", 12, 46);
        doc.text("Telpon Driver", 12, 56);
        doc.text(":", 52, 36);
        doc.text(":", 52, 46);
        doc.text(":", 52, 56);
        doc.text("Tanggal", 107, 36);
        doc.text("Driver", 107, 46);
        doc.text("Titik Muat", 107, 56);
        doc.text(":", 142, 36);
        doc.text(":", 142, 46);
        doc.text(":", 142, 56);

        doc.rect(10, 70, 10, 10);
        doc.rect(20, 70, 60, 10);
        doc.rect(80, 70, 30, 10);
        doc.rect(110, 70, 30, 10);
        doc.rect(140, 70, 60, 10);
        doc.rect(10, 80, 10, 10);
        doc.rect(20, 80, 60, 10);
        doc.rect(80, 80, 30, 10);
        doc.rect(110, 80, 30, 10);
        doc.rect(140, 80, 60, 10);
        doc.rect(10, 90, 10, 10);
        doc.rect(20, 90, 60, 10);
        doc.rect(80, 90, 30, 10);
        doc.rect(110, 90, 30, 10);
        doc.rect(140, 90, 60, 10);
        doc.rect(10, 100, 10, 10);
        doc.rect(20, 100, 60, 10);
        doc.rect(80, 100, 30, 10);
        doc.rect(110, 100, 30, 10);
        doc.rect(140, 100, 60, 10);
        doc.rect(10, 110, 10, 10);
        doc.rect(20, 110, 60, 10);
        doc.rect(80, 110, 30, 10);
        doc.rect(110, 110, 30, 10);
        doc.rect(140, 110, 60, 10);
        doc.rect(10, 120, 10, 10);
        doc.rect(20, 120, 60, 10);
        doc.rect(80, 120, 30, 10);
        doc.rect(110, 120, 30, 10);
        doc.rect(140, 120, 60, 10);
        doc.rect(10, 130, 10, 10);
        doc.rect(20, 130, 60, 10);
        doc.rect(80, 130, 30, 10);
        doc.rect(110, 130, 30, 10);
        doc.rect(140, 130, 60, 10);
        doc.rect(10, 140, 10, 10);
        doc.rect(20, 140, 60, 10);
        doc.rect(80, 140, 30, 10);
        doc.rect(110, 140, 30, 10);
        doc.rect(140, 140, 60, 10);
        doc.rect(10, 150, 10, 10);
        doc.rect(20, 150, 60, 10);
        doc.rect(80, 150, 30, 10);
        doc.rect(110, 150, 30, 10);
        doc.rect(140, 150, 60, 10);
        doc.rect(10, 160, 10, 10);
        doc.rect(20, 160, 60, 10);
        doc.rect(80, 160, 30, 10);
        doc.rect(110, 160, 30, 10);
        doc.rect(140, 160, 60, 10);
        doc.rect(10, 170, 70, 10);
        doc.rect(80, 170, 30, 10);
        doc.rect(110, 170, 30, 10);
        doc.rect(140, 170, 60, 10);
        doc.text("No", 15, 76, { align: 'center' });
        doc.text("Item", 50, 76, { align: 'center' });
        doc.text("Jumlah", 95, 76, { align: 'center' });
        doc.text("Keterangan", 125, 76, { align: 'center' });
        doc.text("Titik Bagi", 170, 76, { align: 'center' });

        //TOTAL
        doc.text("Total", 45, 176, { align: 'center' });
        doc.text("00000", 95, 176, { align: 'center' });

        // ISI TABEL
        doc.text("1", 15, 86, { align: 'center' });
        doc.text("Ayam Karkas 0,9 - 1,0 kg", 50, 86, { align: 'center' });
        doc.text("000", 95, 86, { align: 'center' });
        doc.text("Kondisi Baik", 125, 86, { align: 'center' });
        doc.text("Nama Kantor Bagi", 170, 86, { align: 'center' })

        doc.text("Pihak yang menyerahkan dan pihak yang menerima telah sepakat bahwa jumlah dan kondisi barang sesuai dengan", 10, 186);
        doc.text("sesuai dengan rician diatas", 10, 190);

        doc.rect(10, 200, 63.3, 15);
        doc.rect(73.3, 200, 63.3, 15);
        doc.rect(136.6, 200, 63.3, 15);
        doc.rect(10, 215, 63.3, 35);
        doc.rect(73.3, 215, 63.3, 35);
        doc.rect(136.6, 215, 63.3, 35);
        doc.rect(10, 250, 63.3, 15);
        doc.rect(73.3, 250, 63.3, 15);
        doc.rect(136.6, 250, 63.3, 15);

        //ttd
        doc.text("Diserahkan Oleh", 40, 205, { align: 'center' });
        doc.text("Diverivikasi Oleh", 105, 205, { align: 'center' });
        doc.text("Diterima Oleh", 170, 205, { align: 'center' });
        doc.text("PT. BGR Logistics Indonesia", 40, 210, { align: 'center' });
        doc.text("PT. Delapan Delapan Logistics", 105, 210, { align: 'center' });
        doc.text("Driver", 170, 210, { align: 'center' });
        doc.text("Nama Lengkap", 40, 255, { align: 'center' });
        doc.text("Telp.", 24, 260, { align: 'center' });
        doc.text("Nama Lengkap", 105, 255, { align: 'center' });
        doc.text("Telp.", 89, 260, { align: 'center' });
        doc.text("Nama Lengkap", 170, 255, { align: 'center' });
        doc.text("Telp.", 154, 260, { align: 'center' });
        doc.addPage();
        // Akhir Dokumen BAST

        // Awal Dokumen SJT
        const imageUrlKiriSjt = `${process.env.PUBLIC_URL}/assets/img/logos/logosmall.png`;
        doc.addImage(imageUrlKiriSjt, 'PNG', 10, 10, 40, 10);
        const imageUrlKananSjt = `${process.env.PUBLIC_URL}/assets/img/logos/bgr1.png`;
        doc.addImage(imageUrlKananSjt, 'PNG', 160, 10, 40, 12);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        // Mulai Header
        doc.setFont('helvetica', 'bold');
        const title1Sjt = 'SURAT JALAN';
        const title2SJT = 'BANTUAN STUNTING 2024';
        doc.setLineWidth(1);
        doc.rect(10, 25, 190, 0);
        doc.setLineWidth(0.1);
        doc.text(title1Sjt, 105, 16, { align: 'center' });
        doc.text(title2SJT, 105, 21, { align: 'center' });
        // Akhir Header

        // Buat Tabel
        doc.rect(10, 30, 40, 10);
        doc.rect(50, 30, 55, 10);
        doc.rect(105, 30, 35, 10);
        doc.rect(140, 30, 60, 10);
        doc.rect(10, 40, 40, 10);
        doc.rect(50, 40, 55, 10);
        doc.rect(105, 40, 35, 10);
        doc.rect(140, 40, 60, 10);
        doc.rect(10, 50, 40, 10);
        doc.rect(50, 50, 55, 10);
        doc.rect(105, 50, 35, 10);
        doc.rect(140, 50, 60, 10);
        doc.rect(10, 60, 40, 10);
        doc.rect(50, 60, 55, 10);
        doc.rect(105, 60, 35, 10);
        doc.rect(140, 60, 60, 10);
        // Akhir Buat Tabel 

        // Buat Isi Tabel
        doc.setFont('helvetica', 'normal');
        doc.text("Nomor Surat", 12, 36);
        doc.text("Nopol", 12, 46);
        doc.text("Telepon Driver", 12, 56);
        doc.text("Kabupaten", 12, 66);
        doc.text("Tanggal Jalan", 107, 36);
        doc.text("Driver", 107, 46);
        doc.text("Titik Muat", 107, 56);
        doc.text("Titik Bagi", 107, 66);
        doc.text(":", 52, 36);
        doc.text(":", 52, 46);
        doc.text(":", 52, 56);
        doc.text(":", 52, 66);
        doc.text(":", 142, 36);
        doc.text(":", 142, 46);
        doc.text(":", 142, 56);
        doc.text(":", 142, 66);

        // Membuat Konten
        doc.rect(10, 80, 10, 10);
        doc.rect(20, 80, 45, 10);
        doc.rect(65, 80, 45, 10);
        doc.rect(110, 80, 30, 10);
        doc.rect(140, 80, 60, 10);

        doc.rect(10, 80, 10, 110);
        doc.rect(20, 80, 45, 110);
        doc.rect(65, 80, 45, 110);
        doc.rect(110, 80, 30, 110);
        doc.rect(140, 80, 60, 110);

        doc.rect(10, 190, 100, 10);
        doc.rect(110, 190, 30, 10);
        doc.rect(140, 190, 60, 10);

        doc.text("No", 15, 86, { align: 'center' });
        doc.text("Kecamatan", 43, 86, { align: 'center' });
        doc.text("Kelurahan", 88, 86, { align: 'center' });
        doc.text("Jumlah", 125, 86, { align: 'center' });
        doc.text("Keterangan", 170, 86, { align: 'center' });

        // ISI TABEL
        doc.text("No", 15, 96, { align: 'center' });
        doc.text("Nama Kecamatan", 43, 96, { align: 'center' });
        doc.text("Nama Keluarahan", 88, 96, { align: 'center' });
        doc.text("0000", 125, 96, { align: 'center' });

        //TOTAL
        doc.text("Total", 60, 196, { align: 'center' });
        doc.text("0000", 125, 196, { align: 'center' });

        doc.text("Pihak yang menyerahkan dan pihak yang menerima telah sepakat bahwa jumlah dan kondisi barang sesuai dengan", 10, 206);
        doc.text("sesuai dengan rician diatas", 10, 210);

        doc.rect(10, 215, 63.3, 15);
        doc.rect(73.3, 215, 63.3, 15);
        doc.rect(136.6, 215, 63.3, 15);
        doc.rect(10, 230, 63.3, 25);
        doc.rect(73.3, 230, 63.3, 25);
        doc.rect(136.6, 230, 63.3, 25);
        doc.rect(10, 255, 63.3, 15);
        doc.rect(73.3, 255, 63.3, 15);
        doc.rect(136.6, 255, 63.3, 15);

        //ttd
        doc.text("Mengetahui", 40, 220, { align: 'center' });
        doc.text("Diserahkan Oleh", 105, 220, { align: 'center' });
        doc.text("Diterima Oleh", 170, 220, { align: 'center' });
        doc.text("PT. Delapan Delapan Logistics", 40, 225, { align: 'center' });
        doc.text("Driver", 105, 225, { align: 'center' });
        doc.text("Petugas", 170, 225, { align: 'center' });
        doc.text("Nama Lengkap", 40, 260, { align: 'center' });
        doc.text("Telp.", 24, 265, { align: 'center' });
        doc.text("Nama Lengkap", 105, 260, { align: 'center' });
        doc.text("Telp.", 89, 265, { align: 'center' });
        doc.text("Nama Lengkap", 170, 260, { align: 'center' });
        doc.text("Telp.", 154, 265, { align: 'center' });

        doc.save('tes.pdf');

    };

    useEffect(() => {
        const fetchAlokasiOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/alokasi/all');
                const options = response.data.map(alokasi => ({
                    value: alokasi.id_alokasi,
                    label: `${alokasi.bulan_alokasi} ${alokasi.tahun_alokasi}`
                }));
                setAlokasiOption(options);
            } catch (error) {
                console.error('Error fetching Alokasi options:', error);
            }
        };
        fetchAlokasiOptions();
    }, []);

    const handleAlokasiChange = (selectedOption) => {
        setSelectedAlokasi(selectedOption);
        fetchLO();
    };


    const fetchLO = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/lo2408/getallbyidadminkancabayam/1');
            const data = await response.json();
            console.log(data);
            setLO(data);
        } catch (error) {
            console.error('Error fetching data:', error);
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
                                    <span className="menu-header-text fs-6 fw-bold">Data Surat Perintah Muat (SPM)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="">
                            Klik <button className="fw-bold btn btn-link p-0" onClick={handleAdd}>disini</button> untuk menambahkan data Surat Perintah Muat (SPM).
                        </div>
                    </div>
                    <div className="col-lg-12 mt-3">
                        <div className="row">
                            <div className="col-md-4 col-sm-12 col-sm-6 mb-3">
                                <label htmlFor="id_alokasi" className="form-label">Alokasi</label>
                                <Select
                                    id="id_alokasi"
                                    name="id_alokasi"
                                    value={selectedAlokasi}
                                    onChange={handleAlokasiChange}
                                    options={alokasiOption}
                                    placeholder="Pilih Alokasi"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="accordion mt-3" id="accordion_wo">
                            {LO.map(lo => (
                                <div key={lo.id_lo} className="card accordion-item">
                                    <h2 className="accordion-header px-2" id={`heading${lo.id_lo}`}>
                                        <button type="button" className="accordion-button accordion-button-primary collapsed text-primary" data-bs-toggle="collapse" data-bs-target={`#accordion${lo.id_lo}`} aria-expanded="false" aria-controls={`accordion${lo.id_lo}`}>
                                            {lo.tanggal_lo} | {lo.nomor_lo}
                                        </button>
                                    </h2>
                                    <div id={`accordion${lo.id_lo}`} className="accordion-collapse collapse" data-bs-parent="#accordion_lo">
                                        <div className="accordion-body" style={{ marginTop: "-15px" }} >
                                            <div className="px-2">
                                                <hr />
                                                <div className="col-md-12 col-sm-12 mt-0 mt-md-3">
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {lo.tanggal_lo.slice(0, 10)}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {/* {lo.gudang.kantor_cabang.nama_kantor_cabang} */}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {/* GUDANG : {lo.gudang.nama_gudang} */}
                                                    </p>
                                                    <button className="btn btn-link p-0" onClick={() => handleEditDataClick(lo.id_lo)}>
                                                        <i className="tf-icons bx bx-edit me-2"></i> DETAIL
                                                    </button>
                                                    <button className="btn btn-link text-danger p-0 ms-3" onClick={() => handleDeleteDataClick(lo.id_lo)}>
                                                        <i className="tf-icons bx bx-message-square-x me-2"></i> DELETE
                                                    </button>
                                                    <button className="btn btn-link text-success p-0 ms-3" onClick={() => handleCreatePDFClick(lo.id_lo)}>
                                                        <i className="tf-icons bx bx-download me-2"></i> DOWNLOAD
                                                    </button>

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
            {currentView === 'add' && <AddPage handlePageChange={handlePageChange} />}
            {currentView === 'detail' && <DetailPage handlePageChange={handlePageChange} detailId={detailId} />}
        </div>
    );
};

export default IndexLOPage;