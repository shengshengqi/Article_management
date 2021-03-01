// import pdfjsLib from "pdfjs-dist";
import React from "react";

export default class PDFViewer extends React.Component {
  // constructor(props: any) {
  //         super(props);
  // }

  componentDidMount() {
    // console.log("h", pdfjsLib);
    this.init();
  }

  init = async () => {
    // console.time("pdf加载时间");
    // const pdf = await pdfjsLib.getDocument("../asset/Test.pdf");
    // console.timeEnd("pdf加载时间");
    // const {
    //   _pdfInfo: { numPages },
    // } = pdf;

    // // var pdfjsLib = require("pdfjs-dist");
    // // console.log("h", pdfjsLib);
    // // var pdfData = atob(
    // //   "JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog" +
    // //     "IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv" +
    // //     "TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K" +
    // //     "Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg" +
    // //     "L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+" +
    // //     "PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u" +
    // //     "dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq" +
    // //     "Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU" +
    // //     "CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu" +
    // //     "ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g" +
    // //     "CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw" +
    // //     "MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v" +
    // //     "dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G"
    // // );
    // var pdfPath = "test.pdf";
    var pdfjsLib = require("../../node_modules/pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = require("../../node_modules/pdfjs-dist/build/pdf.worker.entry");
    // // Setting worker path to worker bundle.
    // // pdfjsLib.GlobalWorkerOptions.workerSrc = "../pdf/build/pdf.worker.js";

    // // Loading a document.
    // var loadingTask = pdfjsLib.getDocument(
    //   "https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf"
    // );

    // // var loadingTask = pdfjsLib.getDocument("../asset/Test.pdf");
    // loadingTask.promise.then((pdf: any) => {
    //   // you can now use *pdf* here
    //   console.log("here");
    //   pdf.getPage(1).then((page: any) => {
    //     // you can now use *page* here
    //     var scale = 1;
    //     var canvas = document.getElementById("the-canvas") as HTMLCanvasElement;
    //     var viewport = page.getViewport({ scale: scale });

    //     if (canvas) {
    //       var context = canvas.getContext("2d");
    //       canvas.height = viewport.height;
    //       canvas.width = viewport.width;
    //       var renderContext = {
    //         canvasContext: context,
    //         viewport: viewport,
    //       };
    //       page.render(renderContext);
    //       this.pageRenderRef.current.appendChild(canvas);
    //     }
    //   });
    // });
    const scale = 1;
    let canvas: any, ctx: any, prevButton, nextButton;
    var pdfDoc: any = null,
      pageNum = 1,
      pageRendering = false,
      pageNumPending: any = null;

    /**
     * Get page info from document, resize canvas accordingly, and render page.
     * @param num Page number.
     */
    function renderPage(num: number) {
      pageRendering = true;
      // Using promise to fetch the page
      pdfDoc.getPage(num).then(function (page: any) {
        //   const canvas = document.getElementById('pdf') as HTMLCanvasElement;
        //   const ctx = canvas.getContext('2d');
        var viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        var renderTask = page.render(renderContext);
        // Wait for rendering to finish
        renderTask.promise.then(function () {
          pageRendering = false;
          if (pageNumPending !== null) {
            // New page rendering is pending
            renderPage(pageNumPending);
            pageNumPending = null;
          }
        });
      });
      // Update page counters
      let h_page_num = document.getElementById("page_num");
      if (h_page_num) h_page_num.textContent = num.toString();
    }

    const loadingTask = pdfjsLib.getDocument("./test.pdf");
    loadingTask.promise.then(function (pdf: any) {
      pdfDoc = pdf;
      let h_page_count = document.getElementById("page_count");
      if (h_page_count) h_page_count.textContent = pdf.numPages.toString();
      canvas = document.getElementById("pdf") as HTMLCanvasElement;
      ctx = canvas.getContext("2d");
      let h_prev = document.getElementById("prev");
      if (h_prev) prevButton = h_prev.addEventListener("click", onPrevPage);
      let h_next = document.getElementById("next");
      if (h_next) nextButton = h_next.addEventListener("click", onNextPage);
      renderPage(pageNum);
    });

    /**
     * If another page rendering in progress, waits until the rendering is
     * finished. Otherwise, executes rendering immediately.
     */
    function queueRenderPage(num: any) {
      if (pageRendering) {
        pageNumPending = num;
      } else {
        renderPage(num);
      }
    }
    /**
     * Displays previous page.
     */
    function onPrevPage() {
      if (pageNum <= 1) {
        return;
      }
      pageNum--;
      queueRenderPage(pageNum);
    }
    /**
     * Displays next page.
     */
    function onNextPage() {
      if (pageNum >= pdfDoc.numPages) {
        return;
      }
      pageNum++;
      queueRenderPage(pageNum);
    }
    // for (let _page = 1; _page <= numPages; _page++) {
    //   pdf.getPage(_page).then((page) => {
    //     const viewport = page.getViewport({ scale: 1 });
    //     const canvas = document.createElement("canvas");
    //     const context = canvas.getContext("2d");
    //     canvas.height = viewport.height;
    //     canvas.width = viewport.width;
    //     const renderContext = {
    //       canvasContext: context,
    //       viewport: viewport,
    //       enableWebGL: true,
    //     };
    //     page.render(renderContext);
    //     this.pageRenderRef.current.appendChild(canvas);
    //   });
    // }
  };

  render() {
    return (
      //   <div ref={this.pageRenderRef}>
      //     {this.pageRenders.length > 0 && this.pageRenders}
      //     <canvas id="the-canvas"></canvas>
      //   </div>
      <div>
        <span className="outer">
          <div className="grey-back">
            <div className="actions">
              <button id="prev" className="action_button">
                Previous
              </button>
              <button id="next" className="action_button">
                Next
              </button>
            </div>
            <div className="pg_num_display">
              <span>
                {" "}
                Page: <span id="page_num"> </span> /{" "}
                <span id="page_count"></span>{" "}
              </span>
            </div>
          </div>
          <div>
            <canvas id="pdf" className="grey-back"></canvas>
          </div>
        </span>
      </div>
    );
  }
}
//   pageRenders: any;
//   pageRenderRef: any;
//   constructor(props: any) {
//     super(props);
//     this.pageRenders = []; // 存放每页pdf形成的canvas
//     this.pageRenderRef = React.createRef(); //渲染pdf的容器;
//     // this.state = {
//     //   pageRenders: [],
//     //   pageRenderRef: React.createRef(),
//     // };
//   }
