import React from "react";

const Loader = () => {
  return (
    <div className="ghaith--page-loader">
      {/* <Blocks wrapperClass='ghaith--wrapper' height='80' width='80' color='#4fa94d' ariaLabel='blocks-loading' visible={true} /> */}
      <div className="loader" />
      <p className="ghaith--loader-text">جاري تنفيذ العملية</p>
      <p className="ghaith--loader-grey">نقدر لك انتظارك</p>
    </div>
  );
};

export default Loader;
