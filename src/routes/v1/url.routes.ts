import { Router } from 'express';
import {UrlController} from '../../controllers/url.controller';
import {validateUrlMiddleware, validateCssMiddleware} from '../../middlewares/validation.middleware';

const router = Router();
const urlController = new UrlController();

/**
 * @swagger
 * /url/fetch:
 *   get:
 *     summary: Fetch content from a URL
 *     tags: [URL]
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *         description: The URL to fetch
 *       - in: query
 *         name: readab
 *         required: false
 *         schema:
 *           type: string
 *           default: "false"
 *         description: Optional parameter; defaults to 'false' to enable readability extraction.
 *       - in: query
 *         name: className
 *         required: false
 *         schema:
 *           type: string
 *           default: ""
 *         description: Optional parameter; extracts elements if className is provided.
 *     responses:
 *       200:
 *         description: Successfully fetched URL content
 *       400:
 *         description: Missing URL parameter
 *       500:
 *         description: Failed to fetch URL
 */
router.get('/url/fetch', validateUrlMiddleware, urlController.getUrl);
router.post('/url/fetch', validateUrlMiddleware, urlController.getUrl);
router.post('/url/metadata', validateUrlMiddleware, urlController.getReadability);
router.post('/url/cssextract', validateCssMiddleware, urlController.getCssExtract);


//If fetching full content → /url/fetch
//If retrieving metadata → /url/metadata

export default router;