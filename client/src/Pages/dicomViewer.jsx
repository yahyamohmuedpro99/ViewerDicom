import React, { useEffect, useRef, useState } from 'react';

// External libraries
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';
import Hammer from 'hammerjs';

// Components and CSS
import ImageUploader from '../Componetnts/imageUploader';
import DicomAnalyzer from '../Componetnts/Analytics';
import ToolSelector from '../Componetnts/toolSelector';
import { toolOptions } from '../utils';
import './dicom.css';

// hooks
import {useContrastMode} from '../hooks/useContrastMode'
import { useFileLoader } from '../hooks/useFileLoader';
import { useCornerstoneSetup } from '../hooks/useCornerstoneSetup';
// Initial configuration
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

function DicomViewer() {
  const elementRef = useRef(null);
  const viewport = useCornerstoneSetup(elementRef);

  const { isLoading, selectedFile, onFileLoaded } = useFileLoader(elementRef);
  const [activeTool, setActiveTool] = useState(null);
  const [isContrastModeActive, setIsContrastModeActive] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  
  useContrastMode(elementRef, isContrastModeActive);
  useFileLoader(elementRef,viewport)
  
  const handleAnalysisResult = (result) => {
    setAnalysisResult(result);
  };
  const changeTool = (toolName) => {
    const element = elementRef.current;
    if (!element) return;
  
    // If the selected tool is already active, deactivate all tools and clear the activeTool state
    if (activeTool === toolName) {
      cornerstoneTools.setToolPassive(toolName); // Deactivate the currently active tool
      setActiveTool(null); // Clear the active tool state
    } else {
      // If there's a different active tool, deactivate it first
      if (activeTool) {
        cornerstoneTools.setToolPassive(activeTool);
      }
  
      // Add and activate the selected tool
      cornerstoneTools.addTool(cornerstoneTools[`${toolName}Tool`]);
      cornerstoneTools.setToolActive(toolName, { mouseButtonMask: 1 });
      setActiveTool(toolName); // Update the active tool state
  
      // Optionally, clear the tool state if desired when switching tools
      cornerstoneTools.clearToolState(element, 'all');
    }
  };

  // const rotateImage = () => {
  //   const element = elementRef.current;
  //   if (!element) return;
  
  //   const viewport = cornerstone.getViewport(element);
  //   viewport.rotation = (viewport.rotation + 90) % 360; // Rotate by 90 degrees and wrap around at 360
  //   cornerstone.setViewport(element, viewport);
  // };

  const clearAnnotations = () => {
    const element = elementRef.current;
    if (!element) return;
  
    // This clears the state of all tools (with annotations ).
    toolOptions.forEach(tool => {
      cornerstoneTools.clearToolState(element, tool);
    });
  
    cornerstone.updateImage(element);
  };
  
  const resetViewport = () => {
    const element = elementRef.current;
    if (!element) return;
  
    const defaultViewport = cornerstone.getDefaultViewportForImage(element, cornerstone.getImage(element));
    cornerstone.setViewport(element, defaultViewport);
  };
  return (
    <>
    <div className="container">
      <ImageUploader onFileLoaded={onFileLoaded} onAnalysisComplete={handleAnalysisResult} />
      <div className="tool-buttons">
        <button onClick={() => setIsContrastModeActive(!isContrastModeActive)} className="tool-button">
          {isContrastModeActive ? "Disable Contrast Mode" : "Enable Contrast Mode"}
        </button>
        <button onClick={() => resetViewport()} className="tool-button">Reset Viewport</button>
        <button onClick={() => clearAnnotations()} className="tool-button">Reset Annotations</button>

        <ToolSelector changeTool={changeTool}/>
  
     </div>
      
    </div>
    {isLoading && <div>Loading...</div>}
      <div className="display-area">
        <div ref={elementRef} className="image-container">
          {viewport.scale && (
            <div className="info-box zoom-info">
              Zoom: {viewport.scale.toFixed(2)}
            </div>
          )}
          {viewport.voi && (
            <div className="info-box ww-wc-info">
              WW/WC: {viewport.voi.windowWidth.toFixed(0)}/{viewport.voi.windowCenter.toFixed(0)}
            </div>
          )}
        </div>
        <div className="metadata">
          {analysisResult && <DicomAnalyzer selectedFile={selectedFile} analysisResult={analysisResult} />}

        </div>
      </div>
    </>
  );
}

export default DicomViewer;
