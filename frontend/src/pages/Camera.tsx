import { Button } from "antd";
import React, { createElement, useEffect, useRef } from "react";

export default () => {
  const canvasDom = useRef<any>();
  const canvasContext = useRef<CanvasRenderingContext2D | null>();
  const getCameraStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      return stream;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const appendStreamToCanvas = async (stream: MediaStream) => {
    const videoDom = document.createElement("video");
    videoDom.srcObject = stream;
    videoDom.play();
    // document.body.appendChild(videoDom);

    videoDom.addEventListener("canplay", () => {
      console.log(videoDom.videoHeight, videoDom.videoWidth);
      videoDom.setAttribute("width", "" + videoDom.videoWidth);
      videoDom.setAttribute("height", "" + videoDom.videoHeight);
      canvasDom.current.setAttribute("width", "" + videoDom.videoWidth);
      canvasDom.current.setAttribute("height", "" + videoDom.videoHeight);
      canvasDom.current.style.height = `${(100 * videoDom.videoHeight) / videoDom.videoWidth}vw`;

      const drawToCanvas = () => {
        if (!!canvasContext.current) {
          canvasContext.current.drawImage(videoDom, 0, 0, videoDom.videoWidth, videoDom.videoHeight);
        }
        requestAnimationFrame(drawToCanvas);
      };
      requestAnimationFrame(drawToCanvas);
    });
  };

  const getPhotoBlob = () => {
    canvasDom.current.toBlob((blob: Blob) => {
      console.log(blob);
    });
  };
  useEffect(() => {
    const canvas = canvasDom.current as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    canvasContext.current = context;

    getCameraStream().then((cameraStream) => {
      if (!!cameraStream) {
        // debugger;
        appendStreamToCanvas(cameraStream);
      }
    });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <canvas
        width={1080}
        height={1920}
        id="canvas"
        ref={canvasDom}
        style={{
          height: "100vh",
          width: "100vw",
        }}
      />
      <Button onClick={getPhotoBlob}>扫描</Button>
    </div>
  );
};
