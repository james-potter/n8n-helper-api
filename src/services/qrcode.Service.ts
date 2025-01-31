import logger from '../config/logger';
import { HttpException } from '../middlewares/error.middleware';
import QRCode from "qrcode";


class QrcodeService {
  async createQrcode(text:string, color: string, bgcolor: string, width: string, height: string, logo: string) {
    try {

      return await QRCode.toDataURL(text, { width: 1024 });

    } catch (error) {
        // Type guard for Error
        if (error instanceof Error) {
          logger.error(`Failed to fetch URL: `, error);
        } else {
          logger.error(`Failed to fetch URL: `, error);
        }
        throw new HttpException(500, 'Failed to fetch URL');
      }
  }
}

export default new QrcodeService();