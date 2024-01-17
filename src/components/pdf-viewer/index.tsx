"use client";
import React, { createRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export function PDFViewer() {
  const pageRef = createRef<HTMLDivElement>();
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function download() {
    const div = pageRef.current;

    if (!div) return;

    const canvas: HTMLCanvasElement = div.children[0] as HTMLCanvasElement;
    const imageBase64 = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.download = "page_" + pageNumber + ".png";
    anchor.href = imageBase64;
    anchor.click();
    console.log("baixado");
  }

  return (
    <div className="h-screen w-fit">
      <Document
        file="http://10.64.0.61:8090/file/BemEstar/2023/12/24/file.pdf"
        onLoadSuccess={(e) => setTotal(e.numPages)}
      >
        <Page
          inputRef={pageRef}
          pageNumber={pageNumber}
          className={"h-screen w-full"}
        />
      </Document>

      <div className="flex inset-0 w-fit flex-col gap-4 fixed right-0 p-3 z-[500]">
        <button
          className=" w-full h-fit  bg-emerald-500 text-white p-5 rounded-lg"
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          change page
        </button>

        <button
          className="w-full h-fit  bg-purple-500 text-white p-5 rounded-lg"
          onClick={download}
        >
          Dowload
        </button>
      </div>
    </div>
  );
}
