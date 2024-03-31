// import React, { useEffect, useRef, useState } from 'react';
// import * as cornerstone from 'cornerstone-core';
// import * as cornerstoneMath from 'cornerstone-math';
// import * as cornerstoneTools from 'cornerstone-tools';
// import Hammer from 'hammerjs';
// import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
// import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
// import * as dicomParser from 'dicom-parser';
// import ImageUploader from './Componetnts/ImageUploader';
// // Initial configuration
// cornerstoneTools.external.cornerstone = cornerstone;
// cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
// cornerstoneWebImageLoader.external.cornerstone = cornerstone;
// cornerstoneTools.external.Hammer = Hammer;
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneWADOImageLoader.external.dicomParser = dicomParser;



// function DicomViewer() {
//   const elementRef = useRef(null);
//   const [viewport, setViewport] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeTool, setActiveTool] = useState('Wwwc');

//   useEffect(() => {
//     const element = elementRef.current;
//     if (!element) return;

//     cornerstone.enable(element);
//     cornerstoneTools.init();

//     const onImageRendered = (event) => {
//       const updatedViewport = cornerstone.getViewport(element);
//       setViewport(updatedViewport);
//     };

//     element.addEventListener('cornerstoneimagerendered', onImageRendered);
//     window.addEventListener('resize', () => cornerstone.resize(element));

//     return () => {
//       element.removeEventListener('cornerstoneimagerendered', onImageRendered);
//       cornerstone.disable(element);
//       window.removeEventListener('resize', () => cornerstone.resize(element));
//     };
//   }, []);

//   const onFileLoaded = async (file) => {
//     setIsLoading(true);
//     const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
//     try {
//       const element = elementRef.current;
//       const image = await cornerstone.loadImage(imageId);
//       cornerstone.displayImage(element, image);
//       setIsLoading(false);
  
//       // Enable the image interaction tools
//       cornerstoneTools.clearToolState(element, 'all');
  
//       // Enable Pan for left mouse drag
//       cornerstoneTools.addTool(cornerstoneTools.PanTool);
//       cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
  
//       // Enable Zoom with mouse wheel
//       cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
//       cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 2 }); // Optional: Set for right click drag
//       cornerstoneTools.addTool(cornerstoneTools.ZoomMouseWheelTool);
//       cornerstoneTools.setToolActive('ZoomMouseWheel', { mouseButtonMask: 0 }); // Activate zoom on mouse wheel without a button
  
//     } catch (error) {
//       console.error("Error loading DICOM image:", error);
//       setIsLoading(false);
//       alert("Could not load the DICOM image. Please check the file format.");
//     }
//   };
  

//   const changeTool = (toolName) => {
//     const element = elementRef.current;
//     if (!element) return;

//     setActiveTool(toolName);
//     cornerstoneTools.clearToolState(element, 'all');
//     cornerstoneTools.addTool(cornerstoneTools[`${toolName}Tool`]);
//     cornerstoneTools.setToolActive(toolName, { mouseButtonMask: 1 });
//   };

//   return (
//     <div>
//       <ImageUploader onFileLoaded={onFileLoaded} />
//       <button onClick={() => changeTool('Length')}>Length</button>
//       <button onClick={() => changeTool('Angle')}>Angle</button>
//       {isLoading && <div>Loading...</div>}
//       <div ref={elementRef} style={{ width: '512px', height: '512px', position: 'relative', color: 'white' }}>
//         {viewport.scale && (
//           <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: '#fff' }}>
//             Zoom: {viewport.scale.toFixed(2)}
//           </div>
//         )}
//         {viewport.voi && (
//           <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: '#fff' }}>
//             WW/WC: {viewport.voi.windowWidth.toFixed(0)}/{viewport.voi.windowCenter.toFixed(0)}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DicomViewer;
