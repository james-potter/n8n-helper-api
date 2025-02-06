import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../middlewares/error.middleware';
import pdfTableExtractor from 'pdf-table-extractor';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Controller to handle PDF extraction
async function pdfTableExtract(req: Request, res: Response): Promise<void> {
    const pdfFile = req.file;

    // Check if the file exists in the request
    if (!pdfFile) {
        res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
        return;
    }

    try {
        // Extract table data from the PDF
        const data = await new Promise((resolve, reject) => {
            pdfTableExtractor(pdfFile.path, (result: any) => {
                if (result) {
                    resolve(result); // Extracted table data
                } else {
                    reject('Error extracting table from PDF');
                }
            });
        });

        // Clean up the uploaded file after processing
        fs.unlinkSync(pdfFile.path);

        // Return the extracted data
        res.json({
            success: true,
            data: data
        });

    } catch (error) {
        // Handle error and send response
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : String(error)
        });
    }
}


class PdfController {

}

export {PdfController, pdfTableExtract};