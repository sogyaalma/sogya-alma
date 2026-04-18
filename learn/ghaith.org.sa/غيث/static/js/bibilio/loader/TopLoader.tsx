import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
const TopLoader: React.FC = () => {
  const location = useLocation();
  const loadingBarRef = useRef<LoadingBarRef>(null);
  useEffect(() => {
    // Start the loading bar when the location changes
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }
    // Simulate a delay to stop the loading bar (e.g., after fetching data)
    setTimeout(() => {
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }, 1000); // Adjust the time as needed
  }, [location]);
  return (
    <>
      <LoadingBar color='#009767' ref={loadingBarRef} />
    </>
  );
};

export default TopLoader;
