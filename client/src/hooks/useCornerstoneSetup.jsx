import { useEffect, useState } from 'react';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';

export const useCornerstoneSetup = (elementRef) => {
  const [viewport, setViewport] = useState({});

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    cornerstone.enable(element);
    cornerstoneTools.init();

    const onImageRendered = () => {
      const updatedViewport = cornerstone.getViewport(element);
      setViewport(updatedViewport);
    };

    element.addEventListener('cornerstoneimagerendered', onImageRendered);
    window.addEventListener('resize', () => cornerstone.resize(element));

    return () => {
      element.removeEventListener('cornerstoneimagerendered', onImageRendered);
      cornerstone.disable(element);
      window.removeEventListener('resize', () => cornerstone.resize(element));
    };
  }, [elementRef]); // Depend on elementRef to ensure effect runs if the ref object changes

  return viewport;
};

