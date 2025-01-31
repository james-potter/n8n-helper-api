import { Request, Response } from 'express';
import QrcodeService from '../services/qrcode.Service';
import { HttpException } from '../middlewares/error.middleware';

class QrcodeController {
  async generateQrcode(req: Request, res: Response) {
    const {
      text = "https://example.com", // Default text for the QR code
      color = "#000000", // Default dot color
      bgcolor = "#ffffff", // Default background color
      width = "1024", // Default width
      height = "300", // Default height
      logo, // Optional logo URL
    } = req.query; 

    // if (!url) {
    //   throw new HttpException(400, 'URL parameter is required');
    // }

    const qrCodeDataUrl = await QrcodeService.createQrcode(text as string, color as string, bgcolor as string, width as string, height as string, logo as string);
    const qrCodeBuffer = Buffer.from(
      qrCodeDataUrl.replace(/^data:image\/png;base64,/, ""), // Remove the base64 prefix
      "base64"
    );

    res.set("Content-Type", "image/png");
    res.status(200).send(qrCodeBuffer);
    // res.json({
    //   success: true,
    //   data
    // });
  }
}

export default new QrcodeController();