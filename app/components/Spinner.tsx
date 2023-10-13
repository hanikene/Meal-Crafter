import React from "react";

const Spinner = ({ spinnerColor }: { spinnerColor: string }) => {
  const customPropertyStyles: React.CSSProperties = {
    //@ts-ignore
    "--spinner-color": spinnerColor,
  };
  return <div className="spinner"></div>;
};

export default Spinner;
