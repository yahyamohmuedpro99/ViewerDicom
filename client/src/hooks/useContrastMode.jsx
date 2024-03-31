// useContrastMode.js
import { useEffect } from 'react';
import * as cornerstone from 'cornerstone-core';

export const useContrastMode = (elementRef, isContrastModeActive) => {
    useEffect(() => {
        const element = elementRef.current;
        if (!element || !isContrastModeActive) return;
    
        const handleMouseMove = (event) => {
          if (event.buttons === 1) { 
            const deltaX = event.movementX;
            const deltaY = event.movementY;
            const currentViewport = cornerstone.getViewport(element);
            const newViewport = {
              ...currentViewport,
              voi: {
                windowWidth: currentViewport.voi.windowWidth + deltaY * 2, // Adjust sensitivity as needed
                windowCenter: currentViewport.voi.windowCenter + deltaX * 2,
              },
            };
            cornerstone.setViewport(element, newViewport);
          }
        };
    
        if (isContrastModeActive) {
          element.addEventListener('mousemove', handleMouseMove);
        }
    
        return () => {
          element.removeEventListener('mousemove', handleMouseMove);
        };
      }, [isContrastModeActive]);
    
};

