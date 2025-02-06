declare module 'pdf-table-extractor' {
    interface TableCell {
      text: string;
      width: number;
      height: number;
      page: number;
      x: number;
      y: number;
    }
  
    interface TableRow {
      cells: TableCell[];
    }
  
    interface Table {
      page: number;
      rows: TableRow[];
    }
  
    interface ExtractionResult {
      tables: Table[];
    }
  
    type PdfTableExtractorCallback = (result: ExtractionResult) => void;
  
    function pdfTableExtractor(pdfUrl: string, callback: PdfTableExtractorCallback): void;
  
    export = pdfTableExtractor;
  }
  