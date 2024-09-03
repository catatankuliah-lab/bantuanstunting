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

    const generatePDF = async () => {
        const doc = new jsPDF();
        let xLeft = 13;
        let y = 10;
        let halaman = 1;
        let halamanbaru = true;
        let total_halaman = Math.ceil(dataKPM.length / 28);
        const str = dataKPM[0].qrkpm;
        const lastHyphenIndex = str.lastIndexOf('-');
        doc.setFontSize(8);
        // Awal Dokumen BAST PBP
        let imageUrlKiri = `${process.env.PUBLIC_URL}/assets/img/logos/bulog.png`;
        doc.addImage(imageUrlKiri, 'PNG', 10, 10, 35, 15);
        let imageUrlKanan = `${process.env.PUBLIC_URL}/assets/img/logos/logosmall.png`;
        doc.addImage(imageUrlKanan, 'PNG', 160, 10, 40, 12, 'myImageAlias', 'MEDIUM');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        let title1 = 'BERITA ACARA SERAH TERIMA (BAST)';
        let title2 = 'PENERIMA BANTUAN STUNTING - OKTOBER 2024';
        let title3 = str.substring(0, lastHyphenIndex);
        doc.text(title1, 105, 13, { align: 'center' });
        doc.text(title2, 105, 18, { align: 'center' });
        doc.text(title3, 105, 23, { align: 'center' });
        doc.rect(10, 30, 35, 10);
        doc.rect(45, 30, 60, 10);
        doc.rect(105, 30, 35, 10);
        doc.rect(140, 30, 60, 10);
        doc.rect(10, 40, 35, 10);
        doc.rect(45, 40, 60, 10);
        doc.rect(105, 40, 35, 10);
        doc.rect(140, 40, 60, 10);
        doc.rect(10, 50, 35, 10);
        doc.rect(45, 50, 60, 10);
        doc.rect(105, 50, 35, 10);
        doc.rect(140, 50, 60, 10);
        doc.setFont('helvetica', 'normal');
        doc.text("Provinsi", 12, 36);
        doc.text("Kabupaten/Kota", 12, 46);
        doc.text("Kecamatan", 12, 56);
        doc.text(dataKPM[0].provinsi, 47, 36);
        doc.text(dataKPM[0].kabupatenkota, 47, 46);
        doc.text(dataKPM[0].kecamatan, 47, 56);
        doc.text("Kelurahan/Desa", 107, 36);
        doc.text("Jumlah KRS", 107, 46);
        doc.text("Total Paket", 107, 56);
        doc.text(dataKPM[0].desakelurahan, 142, 36);
        doc.text(dataKPM.length + " KRS", 142, 46);
        doc.text(dataKPM.length + " Paket", 142, 56);
        doc.rect(10, 65, 190, 10);
        doc.text("Paket Bantuan Stunting diterima dan disalurkan kepada KRS dibantu oleh pejabat setempat dan Pendamping KRS", 12, 71);
        doc.rect(10, 80, 190, 10);
        doc.text("* Nama Jelas TTD dan Stampel Jika Ada", 12, 86);
        doc.text("KUNINGAN, ", 150, 86);
        doc.rect(10, 90, 95, 50);
        doc.rect(105, 90, 95, 50);
        doc.text("Aparat Setempat", 57, 96, { align: 'center' });
        doc.text("Delapan Delapan Logistics", 150, 96, { align: 'center' });
        doc.text("*", 12, 140, { align: 'center' });
        doc.text("*", 107, 140, { align: 'center' });
        doc.rect(10, 150, 10, 10);
        doc.rect(20, 150, 70, 10);
        doc.rect(90, 150, 75, 10);
        doc.rect(165, 150, 35, 10);
        doc.text("No", 12, 156);
        doc.text("Nama Pendamping", 22, 156);
        doc.text("Nomor Telpon Pendamping", 92, 156);
        doc.text("TTD Pendamping", 167, 156);
        doc.rect(10, 160, 10, 20);
        doc.rect(20, 160, 70, 20);
        doc.rect(90, 160, 75, 20);
        doc.rect(165, 160, 35, 20);
        doc.rect(10, 180, 10, 20);
        doc.rect(20, 180, 70, 20);
        doc.rect(90, 180, 75, 20);
        doc.rect(165, 180, 35, 20);
        doc.rect(10, 200, 10, 20);
        doc.rect(20, 200, 70, 20);
        doc.rect(90, 200, 75, 20);
        doc.rect(165, 200, 35, 20);
        doc.rect(10, 220, 10, 20);
        doc.rect(20, 220, 70, 20);
        doc.rect(90, 220, 75, 20);
        doc.rect(165, 220, 35, 20);
        doc.rect(10, 240, 10, 20);
        doc.rect(20, 240, 70, 20);
        doc.rect(90, 240, 75, 20);
        doc.rect(165, 240, 35, 20);
        let qrImageDataBASTDTT = await generateQRCode(str.substring(0, lastHyphenIndex));
        doc.addImage(qrImageDataBASTDTT, 'PNG', 5, 277, 15, 15);
        doc.addPage();
        // AWAL DTT
        for (let i = 0; i < dataKPM.length; i++) {
            if (halamanbaru == true) {
                doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                doc.rect(10, 50, 55, 10);
                doc.rect(65, 50, 20, 10);
                doc.rect(85, 50, 20, 10);
                doc.text("DATA KRS", 13, 56);
                doc.text("QR CODE", 68.5, 56);
                doc.text("TTD", 87, 56);
                doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                doc.rect(105, 50, 55, 10);
                doc.rect(160, 50, 20, 10);
                doc.rect(180, 50, 20, 10);
                doc.text("DATA KRS", 108, 56);
                doc.text("QR CODE", 163.5, 56);
                doc.text("TTD", 182, 56);
                halamanbaru = false;
                i--;
                y = 60.2;
            } else {
                if (i % 2 == 0) {
                    const masterdatakpm = dataKPM[i];
                    const qrText = `${masterdatakpm.qrkpm}`;
                    const qrImageData = await generateQRCode(qrText);
                    doc.rect(10, y, 55, 15);
                    doc.rect(65, y, 20, 15);
                    doc.rect(85, y, 20, 15);
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.text(masterdatakpm.namakpm, xLeft, y + 5);
                    doc.setFont('helvetica', 'normal');
                    doc.text(masterdatakpm.alamatkpm, xLeft, y + 10);
                    doc.text(`${i + 1}`, 88.5, y + 5);
                    if (qrImageData) {
                        doc.addImage(qrImageData, 'PNG', 68.5, y + 1, 13, 13);
                    } else {
                        console.error('Gagal menghasilkan data gambar QR code untuk:', masterdatakpm.namakpm);
                    }
                } else {
                    const masterdatakpm = dataKPM[i];
                    const qrText = `${masterdatakpm.qrkpm}`;
                    const qrImageData = await generateQRCode(qrText);
                    doc.rect(105, y, 55, 15);
                    doc.rect(160, y, 20, 15);
                    doc.rect(180, y, 20, 15);
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.text(masterdatakpm.namakpm, 108, y + 5);
                    doc.setFont('helvetica', 'normal');
                    doc.text(masterdatakpm.alamatkpm, 108, y + 10);
                    doc.text(`${i + 1}`, 182, y + 5);
                    if (qrImageData) {
                        doc.addImage(qrImageData, 'PNG', 163.5, y + 1, 13, 13);
                    } else {
                        console.error('Gagal menghasilkan data gambar QR code untuk:', masterdatakpm.namakpm);
                    }
                    y += 15;
                }
            }
            if (y > 270) {
                doc.addPage();
                halamanbaru = true;
                y = 10;
                halaman++;
            }

            const imageUrlKiri = `${process.env.PUBLIC_URL}/assets/img/logos/bulog.png`;
            doc.addImage(imageUrlKiri, 'PNG', 10, 10, 35, 15);
            const imageUrlKanan = `${process.env.PUBLIC_URL}/assets/img/logos/logosmall.png`;
            doc.addImage(imageUrlKanan, 'PNG', 160, 10, 40, 12);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            const title1 = 'DATA TANDA TERIMA (DTT)';
            const title2 = 'PENERIMA BANTUAN STUNTING - OKTOBER 2024';
            const title3 = str.substring(0, lastHyphenIndex);
            doc.text(title1, 105, 13, { align: 'center' });
            doc.text(title2, 105, 18, { align: 'center' });
            doc.text(title3, 105, 23, { align: 'center' });
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            const provinsi_1 = 'PROVINSI';
            const kabupaten_kota_1 = 'KABUPATEN/KOTA';
            const kecamatan_1 = 'KECAMATAN';
            const kelurahan_desa_1 = 'DESA/KELURAHAN';
            const provinsi_2 = ': ' + dataKPM[0].provinsi;
            const kabupaten_kota_2 = ': ' + dataKPM[0].kabupatenkota;
            const kecamatan_2 = ': ' + dataKPM[0].kecamatan;
            const kelurahan_desa_2 = ': ' + dataKPM[0].desakelurahan;
            const kantor_serah_1 = 'TEMPAT SERAH';
            const tanggal_serah_1 = 'TANGGAL SERAH';
            const jumlah_kpm_1 = 'JUMLAH KPM';
            const halaman_1 = 'HALAMAN';
            const kantor_serah_2 = ': DESA/KELURAHAN ' + dataKPM[0].desakelurahan;
            const tanggal_serah_2 = ': 01/06/2024';
            const jumlah_kpm_2 = ': ' + dataKPM.length;
            const halaman_2 = ': ' + halaman + ' DARI ' + total_halaman + ' HALAMAN';
            doc.text(provinsi_1, 10, 32);
            doc.text(kabupaten_kota_1, 10, 36);
            doc.text(kecamatan_1, 10, 40);
            doc.text(kelurahan_desa_1, 10, 44);
            doc.text(provinsi_2, 40, 32);
            doc.text(kabupaten_kota_2, 40, 36);
            doc.text(kecamatan_2, 40, 40);
            doc.text(kelurahan_desa_2, 40, 44);
            doc.text(kantor_serah_1, 105, 32);
            doc.text(tanggal_serah_1, 105, 36);
            doc.text(jumlah_kpm_1, 105, 40);
            doc.text(halaman_1, 105, 44);
            doc.text(kantor_serah_2, 135, 32);
            doc.text(tanggal_serah_2, 135, 36);
            doc.text(jumlah_kpm_2, 135, 40);
            doc.text(halaman_2, 135, 44);
        }
        // AKHIR DTT
        doc.addPage();
        imageUrlKiri = `${process.env.PUBLIC_URL}/assets/img/logos/bulog.png`;
        doc.addImage(imageUrlKiri, 'PNG', 10, 10, 35, 15);
        imageUrlKanan = `${process.env.PUBLIC_URL}/assets/img/logos/logosmall.png`;
        doc.addImage(imageUrlKanan, 'PNG', 160, 10, 40, 12);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        title1 = 'BERITA ACARA SERAH TERIMA (BAST)';
        title2 = 'PENERIMA BANTUAN STUNTING PERWAKILAN - JULI 2024';
        title3 = str.substring(0, lastHyphenIndex);
        doc.text(title1, 105, 13, { align: 'center' });
        doc.text(title2, 105, 18, { align: 'center' });
        doc.text(title3, 105, 23, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.text("Provinsi", 10, 36);
        doc.text("Kabupaten/Kota", 10, 41);
        doc.text("Kecamatan", 10, 46);
        doc.text("Kelurahan/Desa", 10, 51);
        doc.text(": " + dataKPM[0].provinsi, 47, 36);
        doc.text(": " + dataKPM[0].kabupatenkota, 47, 41);
        doc.text(": " + dataKPM[0].kecamatan, 47, 46);
        doc.text(": " + dataKPM[0].desakelurahan, 47, 51);
        doc.text("Kami yang bertanda tangan dibawah ini adalah sebagai perwakilan KRS yang ditunjuk oleh aparat setempat menyatakan", 10, 61);
        doc.text("dengan sebenar-benarnya bahwa kami telah menerima paket bantuan stunting dengan kondisi dan kualitas baik.", 10, 66);
        doc.rect(10, 76, 10, 20);
        doc.text("No", 12, 87);
        doc.rect(20, 76, 35, 20);
        doc.text("Nama KRS", 37, 84.5, { align: 'center' });
        doc.text("Berhalangan Hadir", 37, 89.5, { align: 'center' });
        doc.rect(55, 76, 70, 10);
        doc.text("Perwakilan KRS", 89, 83, { align: 'center' });
        doc.rect(55, 86, 35, 10);
        doc.text("Nama Lengkap", 72, 92, { align: 'center' });
        doc.rect(90, 86, 35, 10);
        doc.text("Nomor Telpon", 106, 92, { align: 'center' });
        doc.rect(125, 76, 40, 20);
        doc.text("Sebab Diwakilkan", 131, 87);
        doc.rect(165, 76, 35, 20);
        doc.text("Tanda Tangan", 182, 84.5, { align: 'center' });
        doc.text("Perwaikan KRS", 182, 89.5, { align: 'center' });
        doc.rect(10, 96, 10, 15);
        doc.rect(20, 96, 35, 15);
        doc.rect(55, 96, 35, 15);
        doc.rect(90, 96, 35, 15);
        doc.rect(125, 96, 40, 15);
        doc.rect(165, 96, 35, 15);
        doc.rect(10, 111, 10, 15);
        doc.rect(20, 111, 35, 15);
        doc.rect(55, 111, 35, 15);
        doc.rect(90, 111, 35, 15);
        doc.rect(125, 111, 40, 15);
        doc.rect(165, 111, 35, 15);
        doc.rect(10, 126, 10, 15);
        doc.rect(20, 126, 35, 15);
        doc.rect(55, 126, 35, 15);
        doc.rect(90, 126, 35, 15);
        doc.rect(125, 126, 40, 15);
        doc.rect(165, 126, 35, 15);
        doc.rect(10, 141, 10, 15);
        doc.rect(20, 141, 35, 15);
        doc.rect(55, 141, 35, 15);
        doc.rect(90, 141, 35, 15);
        doc.rect(125, 141, 40, 15);
        doc.rect(165, 141, 35, 15);
        doc.rect(10, 156, 10, 15);
        doc.rect(20, 156, 35, 15);
        doc.rect(55, 156, 35, 15);
        doc.rect(90, 156, 35, 15);
        doc.rect(125, 156, 40, 15);
        doc.rect(165, 156, 35, 15);
        doc.rect(10, 180, 155, 10);
        doc.rect(165, 180, 35, 10);
        doc.rect(10, 210, 190, 10);
        doc.text("Jumlah", 12, 186);
        doc.text("Demikian Berita Acara ini dibuat dengan sebenar-benarnya untuk dapat digunakan sebagaimana mestinya.", 10, 200);
        doc.text("* Nama Jelas TTD dan Stampel Jika Ada", 12, 216);
        doc.text("KUNINGAN, ", 150, 216);
        doc.rect(10, 220, 95, 50);
        doc.rect(105, 220, 95, 50);
        doc.text("Aparat Setempat", 57, 226, { align: 'center' });
        doc.text("Delapan Delapan Logistics", 150, 226, { align: 'center' });
        doc.text("*", 12, 270, { align: 'center' });
        doc.text("*", 107, 270, { align: 'center' });
        qrImageDataBASTDTT = await generateQRCode(str.substring(0, lastHyphenIndex));
        doc.addImage(qrImageDataBASTDTT, 'PNG', 5, 277, 15, 15);
        // Akhir Dokumen BAST Perwakilan

        // Awal Dokumen BAST PBP Penggantain
        doc.addPage();
        imageUrlKiri = `${process.env.PUBLIC_URL}/assets/img/logos/bulog.png`;
        doc.addImage(imageUrlKiri, 'PNG', 10, 10, 35, 15);
        imageUrlKanan = `${process.env.PUBLIC_URL}/assets/img/logos/logosmall.png`;
        doc.addImage(imageUrlKanan, 'PNG', 160, 10, 40, 12);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        title1 = 'BERITA ACARA SERAH TERIMA (BAST)';
        title2 = 'PENERIMA BANTUAN STUNTING PENGGANTI - JULI 2024';
        title3 = str.substring(0, lastHyphenIndex);
        doc.text(title1, 105, 13, { align: 'center' });
        doc.text(title2, 105, 18, { align: 'center' });
        doc.text(title3, 105, 23, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.text("Provinsi", 10, 36);
        doc.text("Kabupaten/Kota", 10, 41);
        doc.text("Kecamatan", 10, 46);
        doc.text("Kelurahan/Desa", 10, 51);
        doc.text(": " + dataKPM[0].provinsi, 47, 36);
        doc.text(": " + dataKPM[0].kabupatenkota, 47, 41);
        doc.text(": " + dataKPM[0].kecamatan, 47, 46);
        doc.text(": " + dataKPM[0].desakelurahan, 47, 51);
        doc.text("Kami yang bertanda tangan dibawah ini adalah sebagai KRS Pengganti yang ditunjuk oleh aparat setempat menyatakan", 10, 61);
        doc.text("dengan sebenar-benarnya bahwa kami telah menerima paket bantuan stunting dengan kondisi dan kualitas baik.", 10, 66);
        doc.rect(10, 76, 10, 20);
        doc.text("No", 12, 87);
        doc.rect(20, 76, 35, 20);
        doc.text("Nama KRS", 37, 84.5, { align: 'center' });
        doc.text("Tidak Ditemukan", 37, 89.5, { align: 'center' });
        doc.rect(55, 76, 70, 10);
        doc.text("KPM Pengganti", 89, 83, { align: 'center' });
        doc.rect(55, 86, 35, 10);
        doc.text("Nama Lengkap", 72, 92, { align: 'center' });
        doc.rect(90, 86, 35, 10);
        doc.text("Nomor Telpon", 106, 92, { align: 'center' });
        doc.rect(125, 76, 40, 20);
        doc.text("Sebab Penggantian", 131, 87);
        doc.rect(165, 76, 35, 20);
        doc.text("Tanda Tangan", 182, 84.5, { align: 'center' });
        doc.text("KPM Pengganti", 182, 89.5, { align: 'center' });
        doc.rect(10, 96, 10, 15);
        doc.rect(20, 96, 35, 15);
        doc.rect(55, 96, 35, 15);
        doc.rect(90, 96, 35, 15);
        doc.rect(125, 96, 40, 15);
        doc.rect(165, 96, 35, 15);
        doc.rect(10, 111, 10, 15);
        doc.rect(20, 111, 35, 15);
        doc.rect(55, 111, 35, 15);
        doc.rect(90, 111, 35, 15);
        doc.rect(125, 111, 40, 15);
        doc.rect(165, 111, 35, 15);
        doc.rect(10, 126, 10, 15);
        doc.rect(20, 126, 35, 15);
        doc.rect(55, 126, 35, 15);
        doc.rect(90, 126, 35, 15);
        doc.rect(125, 126, 40, 15);
        doc.rect(165, 126, 35, 15);
        doc.rect(10, 141, 10, 15);
        doc.rect(20, 141, 35, 15);
        doc.rect(55, 141, 35, 15);
        doc.rect(90, 141, 35, 15);
        doc.rect(125, 141, 40, 15);
        doc.rect(165, 141, 35, 15);
        doc.rect(10, 156, 10, 15);
        doc.rect(20, 156, 35, 15);
        doc.rect(55, 156, 35, 15);
        doc.rect(90, 156, 35, 15);
        doc.rect(125, 156, 40, 15);
        doc.rect(165, 156, 35, 15);
        doc.rect(10, 180, 155, 10);
        doc.rect(165, 180, 35, 10);
        doc.rect(10, 210, 190, 10);
        doc.text("Jumlah", 12, 186);
        doc.text("Demikian Berita Acara ini dibuat dengan sebenar-benarnya untuk dapat digunakan sebagaimana mestinya.", 10, 200);
        doc.text("* Nama Jelas TTD dan Stampel Jika Ada", 12, 216);
        doc.text("KUNINGAN, ", 150, 216);
        doc.rect(10, 220, 95, 50);
        doc.rect(105, 220, 95, 50);
        doc.text("Aparat Setempat", 57, 226, { align: 'center' });
        doc.text("Delapan Delapan Logistics", 150, 226, { align: 'center' });
        doc.text("*", 12, 270, { align: 'center' });
        doc.text("*", 107, 270, { align: 'center' });
        // AKHIR PERGANTIAN
        qrImageDataBASTDTT = await generateQRCode(str.substring(0, lastHyphenIndex));
        doc.addImage(qrImageDataBASTDTT, 'PNG', 5, 277, 15, 15);
        const filename = str.substring(0, lastHyphenIndex) + "-" + dataKPM[0].desakelurahan;
        doc.save(filename);
    };

    const printDTT = (idalokasi, iddesa) => {
        fetcMasterDataKPM(iddesa);
        generatePDF();
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

    return (
        <div>
            {currentPage === 'index' && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6 fw-bold">Data DTT</span>
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
