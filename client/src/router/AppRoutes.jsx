import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import ITSupportIndexKantorCabangPage from '../pages/itsupport/kantorcabang/indexPage';
import ITSupportIndexAdminKantorCabangPage from '../pages/itsupport/adminkantorcabang/indexPage';
import IndexPetugasPenyalurPage from '../pages/itsupport/petugaspenyalur/indexPage';
import ITSupportIndexGudangPage from '../pages/itsupport/gudang/indexPage';
import ITSupportIndexPICGudangPage from '../pages/itsupport/picgudang/indexPage';
import ITSupportIndexCheckerGudangPage from '../pages/itsupport/checkergudang/indexPage';
import IndexMasterDataKPMPage from '../pages/itsupport/masterdatakpm/indexPage';
import IndexKPMPenggantiPage from '../pages/itsupport/pengganti/indexPage';
import IndexDTTPage from '../pages/itsupport/dtt/indexPage';
import IndexUndanganPage from '../pages/itsupport/undangan/indexPage';
// import IndexDTTPage from '../pages/itsupport/dtt/backup/indexPage';
import IndexWoPage from '../pages/itsupport/wo/indexPage';
import IndexSPMPage from '../pages/itsupport/spm/indexPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/kantorcabang" element={<ITSupportIndexKantorCabangPage />} />
            <Route path="/adminkantorcabang" element={<ITSupportIndexAdminKantorCabangPage />} />
            <Route path="/petugaspenyalur" element={<IndexPetugasPenyalurPage />} />
            <Route path="/gudang" element={<ITSupportIndexGudangPage />} />
            <Route path="/picgudang" element={<ITSupportIndexPICGudangPage />} />
            <Route path="/checkergudang" element={<ITSupportIndexCheckerGudangPage />} />
            <Route path="/kpm" element={<IndexMasterDataKPMPage />} />
            <Route path="/kpmpengganti" element={<IndexKPMPenggantiPage />} />
            <Route path="/dtt" element={<IndexDTTPage />} />
            <Route path="/undangan" element={<IndexUndanganPage />} />
            <Route path="/spm" element={<IndexSPMPage />} />
            <Route path="/wo" element={<IndexWoPage />} />
        </Routes>
    );
};

export default AppRoutes;
