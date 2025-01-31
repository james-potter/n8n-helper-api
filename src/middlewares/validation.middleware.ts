import { NextFunction, Request, Response } from 'express';
import { validateUrl } from '../utils/validateUrl';
import { HttpException } from '../middlewares/error.middleware';

const validateUrlMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Get URL from query (for GET) or body (for POST)
    const url = req.method === 'GET' ? req.query.url : req.body.url;

    // Ensure `url` is a string and not undefined
    if (typeof url !== 'string' || !validateUrl(url)) {
        throw new HttpException(400, 'Invalid URL');
    }
    
    next();
};

const validateCssMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Get URL from query (for GET) or body (for POST)
    const { url, cssClass, selectors } = req.body;

    // Ensure `url` is a string and not undefined
    if (typeof url !== 'string' || !validateUrl(url)) {
        throw new HttpException(400, 'Invalid URL');
    }

    if (typeof cssClass !== 'string' || !cssClass.startsWith('.')) {
        throw new HttpException(500, 'css class does not start with .');
    }

    let parsedSelectors;
    try {
        parsedSelectors = typeof selectors === "string" ? JSON.parse(selectors) : selectors;
    
        // Ensure parsedSelectors is actually an object and not null
        if (typeof parsedSelectors !== "object" || parsedSelectors === null) {
            throw new Error("Parsed selectors is not a valid object.");
        }
    } catch (err) {
        if (err instanceof Error) {
            throw new HttpException(500, `Invalid JSON: ${err.message}`);
        }
        throw new HttpException(500, "Invalid JSON: Unknown error occurred");
    }
    
    next();
};

const validateQrcodeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const options = {
        errorCorrectionLevel: "H", // High error correction level
        margin: 2, // Smaller margin
        width: 300, // Set width to 300 pixels
        color: {
            dark: "#0000FF", // Blue dots
            light: "#FFCCCC", // Light pink background
        },
    };
    
    next();
};

export { validateUrlMiddleware, validateCssMiddleware, validateQrcodeMiddleware };