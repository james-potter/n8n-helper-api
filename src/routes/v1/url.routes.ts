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
 *     responses:
 *       200:
 *         description: Successfully fetched URL content
 *       400:
 *         description: Missing URL parameter
 *       500:
 *         description: Failed to fetch URL
 */
router.get('/url/fetch', validateUrlMiddleware, urlController.getUrl);

/**
 * @swagger
 * /url/fetch:
 *   post:
 *     summary: Fetch content from a URL
 *     tags: [URL]
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
router.post('/url/fetch', validateUrlMiddleware, urlController.getUrl);

/**
 * @swagger
 * /url/metadata:
 *   post:
 *     summary: Fetch content from a URL and provide metadata
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
 *     responses:
 *       200:
 *         description: Successfully fetched URL content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The title of the article.
 *                 byline:
 *                   type: string
 *                   description: The byline or author of the article.
 *                   default: ""
 *                 content:
 *                   type: string
 *                   description: The full content of the article.
 *                 length:
 *                   type: integer
 *                   description: The length of the article in characters or words.
 *                 excerpt:
 *                   type: string
 *                   description: A short excerpt from the article.
 *                   default: ""
 *                 siteName:
 *                   type: string
 *                   description: The name of the site where the article was published.
 *                   default: ""
 *       400:
 *         description: Missing URL parameter
 *       500:
 *         description: Failed to fetch URL
 */
router.post('/url/metadata', validateUrlMiddleware, urlController.getReadability);

/**
 * @swagger
 * /url/cssextract:
 *   post:
 *     summary: Fetch content from a URL and extract blocks based on CSS selectors
 *     tags: [URL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *               - cssClass
 *               - selectors
 *             properties:
 *               url:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com"
 *               cssClass:
 *                 type: string
 *                 example: ".main-content"
 *                 description: Main CSS class containing the block you want to extract
 *               selectors:
 *                 type: object
 *                 description: JSON object containing key-value pairs of CSS selectors
 *                 example:
 *                   title: ".wp-block-heading"
 *                   description: ".article-content p"
 *                   image: ".post-thumbnail img"
 *                 additionalProperties:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successfully fetched and extracted content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 extractedData:
 *                   type: object
 *                   example:
 *                     title: "Example Page Title"
 *                     description: "This is the first paragraph of the article."
 *                     image: "https://example.com/sample-image.jpg"
 *       400:
 *         description: Missing or invalid parameters
 *       500:
 *         description: Server error while fetching URL
 */
router.post('/url/cssextract', validateCssMiddleware, urlController.getCssExtract);


//If fetching full content → /url/fetch
//If retrieving metadata → /url/metadata

export default router;