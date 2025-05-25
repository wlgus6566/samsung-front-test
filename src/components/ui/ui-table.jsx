import React from "react";

const UiTable = ({ children, className = "" }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className={`table-default ${className}`}>{children}</table>
    </div>
  );
};

export default UiTable;
