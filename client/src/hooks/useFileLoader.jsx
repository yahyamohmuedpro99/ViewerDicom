import { useState } from 'react';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

export const useFileLoader = (elementRef) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileLoaded = async (file) => {
    setIsLoading(true);
    const uniqueId = `?time=${new Date().getTime()}`;
    const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file) + uniqueId;

    try {
      const element = elementRef.current;
      await cornerstone.loadImage(imageId).then((image) => {
        cornerstone.displayImage(element, image);
        setSelectedFile(file);
        // Enable the image interaction tools
        cornerstoneTools.clearToolState(element, 'all');

        // Enable Pan for left mouse drag
        cornerstoneTools.addTool(cornerstoneTools.PanTool);
        cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 4 });

        // Enable Zoom with mouse wheel
        cornerstoneTools.addTool(cornerstoneTools.ZoomMouseWheelTool);
        cornerstoneTools.setToolActive('ZoomMouseWheel', { mouseButtonMask: 0 });
      });
    } catch (error) {
      console.error("Error loading DICOM image:", error);
      alert("Could not load the DICOM image. Please check the file format.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, selectedFile, onFileLoaded };
};

