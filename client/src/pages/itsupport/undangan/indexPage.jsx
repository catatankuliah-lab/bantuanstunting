import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import 'jspdf-autotable';

const IndexPage = () => {
    const [currentPage, setCurrentPage] = useState('index');
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
    const [dataKPM, setDataKPM] = useState([]);
    const [isHidden, setIsHidden] = useState(true);
    const [formData, setFormData] = useState({});

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

    const fetcMasterDataKPM = async (iddesa) => {
        try {
            const response = await axios.get(`http://localhost:5050/api/dtt/iddesa/${iddesa.value}`);
            if (response.data == null) {
                Swal.fire({
                    title: 'Data DTT',
                    text: 'Data DTT Untuk Desa/Kelurahan ' + iddesa.label + ' Tidak Ditemukan',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000,
                    position: 'center',
                    timerProgressBar: true
                });
            } else {
                const datadtt = response.data.result.penerima.map((datadttall, index) => ({
                    no: index + 1,
                    provinsi: datadttall.nama_provinsi,
                    kabupatenkota: datadttall.nama_kabupaten_kota,
                    kecamatan: datadttall.nama_kecamatan,
                    desakelurahan: datadttall.nama_desa_kelurahan,
                    namakpm: datadttall.nama_kpm,
                    alamatkpm: datadttall.alamat_kpm,
                    qrkpm: datadttall.qr_kpm
                }));
                setDataKPM(datadtt);
            }
        } catch (error) {
            console.error('Error fetching', error);
        }
    };

    const generateQRCode = async (text) => {
        try {
            const canvas = await QRCode.toCanvas(text);
            return canvas.toDataURL('image/png');
        } catch (error) {
            console.error('Error generating QR code:', error);
            return '';
        }
    };

    const generatePDF = async (jamawal, jamakhir, tanggal, titikbagi) => {
        const doc = new jsPDF();
        const str = dataKPM[0].qrkpm;
        const lastHyphenIndex = str.lastIndexOf('-');
        doc.setFontSize(8);
        // Awal Dokumen BAST PBP
        for (let i = 0; i < dataKPM.length; i++) {
            let imageUrlKiri = `${process.env.PUBLIC_URL}/assets/img/logos/logosmall.png`;
            doc.addImage(imageUrlKiri, 'PNG', 10, 10, 40, 13);
            let qrImageDataBASTDTT = await generateQRCode(dataKPM[i].qrkpm);
            doc.addImage(qrImageDataBASTDTT, 'PNG', 183, 7, 20, 20);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            let title1 = 'PT DELAPAN DELAPAN LOGISTICS';
            let title2 = 'Jl. Raya Sidaraja – Lebaksiuh No. 81 Blok Jati Kidul Dusun Manis RT. 001 RW. 001';
            let title3 = 'Desa Sidaraja Kecamatan Ciawigebang Kabupaten Kuningan – JAWA BARAT (45911)';
            let title4 = 'Kontak Person : WA 082-217-740-459, Email : delapandelapanlogistics@gmail.com';
            doc.text(title1, 105, 13, { align: 'center' });
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.text(title2, 105, 18, { align: 'center' });
            doc.text(title3, 105, 22, { align: 'center' });
            doc.text(title4, 105, 26, { align: 'center' });
            doc.setLineWidth(1);
            doc.line(10, 33, 200, 33);
            const today = new Date();
            doc.setFontSize(10);
            doc.text("Kuningan, " + today.getDate() + "-" + today.getMonth() + 1 + "-" + today.getFullYear(), 200, 45, { align: 'right' });
            doc.text("Nomor      : 1", 10, 55, { align: 'left' });
            doc.text("Lampiran  : -", 10, 60, { align: 'left' });
            doc.text("Prihal        : UNDANGAN", 10, 65, { align: 'left' });
            doc.text("Kepada Yth.", 100, 55, { align: 'left' });
            doc.text(dataKPM[i].namakpm, 100, 60, { align: 'left' });
            doc.text(dataKPM[i].alamatkpm + " " + dataKPM[i].desakelurahan + " KECAMATAN " + dataKPM[i].kecamatan, 100, 65, { align: 'left' });
            doc.text("di", 100, 70, { align: 'left' });
            doc.text(dataKPM[i].kabupatenkota, 100, 75, { align: 'left' });
            doc.text("Mengharap kahadiran Bapak/Ibu/Saudara pada :", 10, 85, { align: 'left' });
            doc.text("Tanggal", 10, 95, { align: 'left' });
            doc.text("Jam", 10, 100, { align: 'left' });
            doc.text("Tempat", 10, 105, { align: 'left' });
            doc.text("Keperluan", 10, 110, { align: 'left' });
            doc.text("Persyaratan", 10, 115, { align: 'left' });
            doc.text(": " + tanggal, 40, 95, { align: 'left' });
            doc.text(": " + jamawal + " WIB sd " + jamakhir + " WIB", 40, 100, { align: 'left' });
            doc.text(": " + titikbagi, 40, 105, { align: 'left' });
            doc.text(": Mengambil Paket Bantuan Stunting Alokasi Oktober 2024", 40, 110, { align: 'left' });
            doc.text(": 1. Membawa Undangan Ini", 40, 115, { align: 'left' });
            doc.text("  2. Membawa Foto Copy KTP dan KK", 40, 120, { align: 'left' });
            doc.text("Demikian atas kehadirannya disampaikan terima kasih", 10, 130, { align: 'left' });
            doc.text("Hormat Kami,", 160, 150, { align: 'center' });
            doc.text("PT DELAPAN DELAPAN LOGISTICS", 160, 190, { align: 'center' });
            if (dataKPM.length - 1 != i) {
                doc.addPage();
            }
        }
        const filename = "UNDANGAN-" + dataKPM[0].kecamatan + "-" + dataKPM[0].desakelurahan;
        doc.save(filename);
    };

    const printDTT = (idalokasi, iddesa) => {
        fetcMasterDataKPM(iddesa);
        const str = formData.tanggal_pembagian;
        const strjam = formData.jam_pembagian;
        const parts = str.split('-');
        const partsjam = strjam.split(':');
        const tahun = parts[0];
        const bulan = parts[1];
        const tanggal = parts[2]
        const tanggalbagi = tanggal + "-" + bulan + "-" + tahun;
        const jamawal = formData.jam_pembagian;
        let jamakhir = (parseInt(partsjam[0]) + 4).toString();
        jamakhir = jamakhir.padStart(2, '0') + ":" + partsjam[1];
        generatePDF(jamawal, jamakhir, tanggalbagi, formData.titik_bagi);
    }

    const showFilter = (idalokasi, iddesa) => {
        if (idalokasi == null || iddesa == '') {
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
            fetcMasterDataKPM(iddesa);
            setIsHidden(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div>
            {currentPage === 'index' && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6 fw-bold">Data Undangan</span>
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
                                <label htmlFor="tanggal_pembagian" className="form-label">Tanggal Pembagian</label>
                                <input className="form-control text-uppercase" type="date" id="tanggal_pembagian" name='tanggal_pembagian' placeholder="" onChange={handleChange} required />
                            </div>
                            <div className="col-md-3 col-sm-12 mb-3">
                                <label htmlFor="jam_pembagian" className="form-label">Jam Pembagian</label>
                                <input className="form-control text-uppercase" type="time" id="jam_pembagian" name='jam_pembagian' placeholder="" onChange={handleChange} required />
                            </div>
                            <div className="col-md-3 col-sm-12 mb-3">
                                <label htmlFor="titik_bagi" className="form-label">Titik Bagi</label>
                                <input className="form-control text-uppercase" type="text" id="titik_bagi" name='titik_bagi' placeholder="TITIK BAGI" onChange={handleChange} required />
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
                            <div className={`col-md-3 col-sm-12 mb-3 ${isHidden ? 'd-none' : ''}`}>
                                <label htmlFor="" className="form-label">PRINT</label>
                                <button type="button" className="btn btn-primary w-100" onClick={() => printDTT(
                                    selectedAlokasi,
                                    selectedDesa
                                )} >PRINT</button>
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
                                                <th>Nama KRS</th>
                                                <th>Alamat KRS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataKPM.map(mdKPM => (
                                                <tr key={mdKPM.no}>
                                                    <td>{mdKPM.no}</td>
                                                    <td>{mdKPM.provinsi}</td>
                                                    <td>{mdKPM.kabupatenkota}</td>
                                                    <td>{mdKPM.kecamatan}</td>
                                                    <td>{mdKPM.desakelurahan}</td>
                                                    <td>{mdKPM.namakpm}</td>
                                                    <td>{mdKPM.alamatkpm}</td>
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

export default IndexPage;
