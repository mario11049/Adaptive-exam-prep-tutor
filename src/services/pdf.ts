import * as pdfjs from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export const MAX_PDF_BYTES = 10 * 1024 * 1024;
const MAX_PAGES = 25;

/** Extracts text from a PDF in the browser; the file itself is never uploaded. */
export async function extractPdfText(file: File): Promise<{ text: string; pages: number }> {
  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;
  const pages = Math.min(doc.numPages, MAX_PAGES);
  let text = '';
  for (let i = 1; i <= pages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((it: any) => ('str' in it ? it.str : '')).join(' ') + '\n\n';
    if (text.length > 20000) break;
  }
  return { text: text.trim().slice(0, 20000), pages: doc.numPages };
}
