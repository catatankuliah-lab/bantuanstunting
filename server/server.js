const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { sequelize, connectDB } = require('./config/database');

const alokasiRoutes = require('./routes/alokasiRoutes');
const provinsiRoutes = require('./routes/provinsiRoutes');
const kabupatenRoutes = require('./routes/kabupatenRoutes');
const kecamatanRoutes = require('./routes/kecamatanRoutes');
const desaRoutes = require('./routes/desaRoutes');
const hakAksesRoutes = require('./routes/hakAksesRoutes');
const userRoutes = require('./routes/userRoutes');
const adminKancabRoutes = require('./routes/adminKancabRoutes');
const petugasPenyalurRoutes = require('./routes/petugasPenyalurRoutes');
const picGUdangRoutes = require('./routes/picGudangRoutes');
const checkerGudangRoutes = require('./routes/checkerGudangRoutes');
const kantorCabangRoutes = require('./routes/kantorCabangRoutes');
const gudangRoutes = require('./routes/gudangRoutes');
const woRoutes = require('./routes/woRoutes');
const loRoutes = require('./routes/loRoutes');
const doRoutes = require('./routes/doRoutes');
const sjtRoutes = require('./routes/sjtRoutes');
const itemWoRoutes = require('./routes/itemWoRoutes');
const dttRoutes = require('./routes/dttRoutes');
const masterdatakpmRoutes = require("./routes/masterDataKpmRoutes");
const kpmPenggantiRoutes = require("./routes/kpmPenggantiRoutes");
const kpmRoutes = require("./routes/kpmRoutes");
const spmRoutes = require("./routes/spmRoutes");

const path = require('path');

const app = express();
const PORT = 5050;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  "/uploads/mobil",
  express.static(path.join(__dirname, "uploads/mobil"))
);

// Menggunakan routes
app.use('/api/alokasi', alokasiRoutes);
app.use('/api/provinsi', provinsiRoutes);
app.use('/api/kabupaten', kabupatenRoutes);
app.use('/api/kecamatan', kecamatanRoutes);
app.use('/api/desa', desaRoutes);
app.use('/api/hakakses', hakAksesRoutes);
app.use('/api/user', userRoutes);
app.use('/api/adminkancab', adminKancabRoutes);
app.use('/api/petugaspenyalur', petugasPenyalurRoutes);
app.use('/api/picgudang', picGUdangRoutes);
app.use('/api/checkergudang', checkerGudangRoutes);
app.use('/api/kantorcabang', kantorCabangRoutes);
app.use('/api/gudang', gudangRoutes);
app.use('/api/dtt', dttRoutes);
app.use('/api/masterdatakpm', masterdatakpmRoutes);
app.use('/api/wo', woRoutes);
app.use('/api/lo', loRoutes);
app.use('/api/do', doRoutes);
app.use('/api/sjt', sjtRoutes);
app.use('/api/itemwo', itemWoRoutes);
app.use('/api/kpm', kpmRoutes);
app.use('/api/kpmpengganti', kpmPenggantiRoutes);
app.use('/api/spm', spmRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});