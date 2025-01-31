// src/services/url.service.ts
import axios from 'axios';
import logger from '../config/logger';
import { HttpException, ReadabilityException } from '../middlewares/error.middleware';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import { extractFromHtml, cleanUpText } from '../utils/documentUtil';

class UrlService {
  async fetchUrl(url: string) {
    try {
      const response = await axios.get(url);
      logger.info(`Successfully fetched URL: ${url}`);
      return response.data;
    } catch (error) {
        // Type guard for Error
        if (error instanceof Error) {
          logger.error(`Failed to fetch URL: ${url} - ${error.message}`);
        } else {
          logger.error(`Failed to fetch URL: ${url} - Unknown error occurred`);
        }
        throw new HttpException(500, 'Failed to fetch URL');
      }
  }
}

class CssExtractService {
  async cssExtractService(html: string, url: string, cssClass: string, selectors: Record<string, string>) {

    try {
      const dom = new JSDOM(html, { url });

      const results = extractFromHtml(html, cssClass, selectors);

      return {
        items: results
      }
    }
    catch {
      throw new ReadabilityException('Unable to parse content for: ${url}');
    }
  }
}

class ReadabilityService {
  async readabilityExtract(html: string, url: string){ 
    try {

      const dom = new JSDOM(html, { url });

      let article = new Readability(dom.window.document).parse();

      if (!article) {
        logger.error(`Unable to process url: ${url}`);
        throw new ReadabilityException('Unable to process url: ${url}');
      }

      // Trim leading and trailing spaces, and normalize multiple spaces to single spaces
      article.textContent = cleanUpText(article.textContent);
    

      return {
        title: article.title,
        byline: article.byline || '',
        content: article.textContent,
        length: article.length,
        excerpt: article.excerpt || '',
        siteName: article.siteName || ''
      };

    } catch (error) {
      throw new ReadabilityException('Unable to parse content for: ${url}');
    }
  }
}

//export default new UrlService();
export { UrlService, ReadabilityService, CssExtractService };