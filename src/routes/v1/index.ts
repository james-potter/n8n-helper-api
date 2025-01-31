import { Router } from 'express';
import urlRoutes from "./url.routes";
import qrcodeRoutes from "./qrcode.routes";
import { url } from 'inspector';

const router = Router();

router.use("/", urlRoutes);
router.use("/", qrcodeRoutes);

export default router;