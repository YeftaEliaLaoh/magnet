import { configureStore } from '@reduxjs/toolkit';
import { mainSlice } from '../features/main/mainSlice';
import { personalSlice } from '../features/Personal/personalSlice';
import { taSlice } from '../features/TypeAccount/taSlice';
import { ktSlice } from '../features/KetentuanTrading/ktSlice';
import { pernyataanSlice } from '../features/Pernyataan/pernyataanSlice';
import { ppSlice } from '../features/ProfilePerusahaan/ppSlice';
import { setoranSlice } from '../features/Setoran/setoranSlice';
import { rejectDocSlice } from '../features/RejectDocument/rejectDocSlice';
import { penarikanSlice } from '../features/Penarikan/penarikanSlice';
import { transferSlice } from '../features/Transfer/transferSlice';
import { ybSlice } from '../features/YukBelajar/ybSlice';

export const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    personal: personalSlice.reducer,
    typeAcc: taSlice.reducer,
    dtSetting: ktSlice.reducer,
    dtPernyataan: pernyataanSlice.reducer,
    companyProfile: ppSlice.reducer,
    setoran: setoranSlice.reducer,
    rejDoc: rejectDocSlice.reducer,
    penarikan: penarikanSlice.reducer,
    transfer: transferSlice.reducer,
    yukBelajar: ybSlice.reducer
  },
});
