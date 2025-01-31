import { Request, Response } from 'express';
import { UrlService, ReadabilityService, CssExtractService } from '../services/url.service';
import { HttpException } from '../middlewares/error.middleware';

class UrlController {
  async getUrl(req: Request, res: Response) {
    const url = req.method === 'GET' ? req.query.url : req.body.url;
    
    if (!url) {
      throw new HttpException(400, 'URL parameter is required');
    }

    const urlService = new UrlService();
    const data = await urlService.fetchUrl(url as string);

    res.json({
      success: true,
      data: data
    });
  }

  async getReadability(req: Request, res: Response) {
    const { url, readab } = req.body;

    if (!url) {
      throw new HttpException(400, 'URL parameter is required');
    }

    const urlService = new UrlService();
    const data = await urlService.fetchUrl(url as string);

    if (readab == 'true') {
      const readabilityService = new ReadabilityService();
      const dataOut = readabilityService.readabilityExtract(data as string, url as string);

      res.json({
        success: true,
        title: (await dataOut).title,
        byline: (await dataOut).byline,
        content: (await dataOut).content,
        length: (await dataOut).length,
        excerpt: (await dataOut).excerpt,
        siteName: (await dataOut).siteName
      });
    } else{
      res.json({
        success: true,
        data: data
      });
    }
  }

  async getCssExtract(req: Request, res: Response) {
    const { url, cssClass, selectors } = req.body;

    if (!url) {
      throw new HttpException(400, 'URL parameter is required');
    }

    const urlService = new UrlService();
    const data = await urlService.fetchUrl(url as string);

    const cssExtractService = new CssExtractService();
    const dataOut = cssExtractService.cssExtractService(data as string, url, cssClass, selectors);

    res.json({
      success: true,
      items: (await dataOut)?.items
    });

  }

}


export {UrlController};