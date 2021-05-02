import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Quote } from './quote.interface';
import * as fileUrl from 'file-url';
import { GenerateQuoteDto } from './dto/generate-quote.dto';

export const QUOTE_LENGTH_LIMIT = 110;

@Injectable()
export class QuoteService {
  async generateQuote(generateQuoteDto: GenerateQuoteDto) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({
      height: 1920,
      width: 1920,
    });

    return await this.screenshotBlackAndWhiteQuote(page, generateQuoteDto);
  }

  private async screenshotBlackAndWhiteQuote(
    page: puppeteer.Page,
    quote: Quote,
  ) {
    await this.loadTemplate(page, 'light');
    await this.changeQuoteTemplate(page, quote);
    const lightImage = await this.getQuoteImageElement(page);
    const dark = await this.screenshotQuote(lightImage);

    await this.loadTemplate(page, 'dark');
    await this.changeQuoteTemplate(page, quote);
    const darkImage = await this.getQuoteImageElement(page);
    const light = await this.screenshotQuote(darkImage);

    return { light, dark };
  }

  private async changeQuoteTemplate(page: puppeteer.Page, quote: Quote) {
    const { text, author } = quote;
    await page.evaluate(
      ({ text, author }) => {
        document.querySelector('.quote__text').innerHTML = text;
        document.querySelector('.quote__author').innerHTML = `― ${author}`;
      },
      { text, author },
    );
  }

  private async getQuoteImageElement(page: puppeteer.Page) {
    await page.waitForSelector('.instagram-image');
    return await page.$('.instagram-image');
  }

  private async loadTemplate(page: puppeteer.Page, theme: 'light' | 'dark') {
    await page.goto(fileUrl(`src/quote/template/image.template-${theme}.html`));
    await page.waitForSelector('.quote__text');
  }

  private async screenshotQuote(element: puppeteer.ElementHandle<Element>) {
    return await element.screenshot({ encoding: 'base64' });
  }
}
