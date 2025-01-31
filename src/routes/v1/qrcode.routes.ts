import { Router } from 'express';
import QrcodeController from '../../controllers/qrcode.controller';
import { validateQrcodeMiddleware} from '../../middlewares/validation.middleware';

const router = Router();

/**
 * @swagger
 * /getqrcode:
 *   get:
 *     summary: Generates a QR Code
 *     tags: [QR Code]
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *         description: The URL to fetch
 *     responses:
 *       200:
 *         description: Successfully fetched URL content
 *       400:
 *         description: Missing URL parameter
 *       500:
 *         description: Failed to fetch URL
 */
router.get('/getqrcode', validateQrcodeMiddleware, QrcodeController.generateQrcode);

export default router;