import * as React from "react";

export const LeftCont = ({ children }) => {
  return <div>{children}</div>;
};

export const RightCont = ({ children }) => {
  return <div className="max-w-[1113px] flex-1">{children}</div>;
};
export const WideCont = ({ children }) => {
  return <div className="flex-1">{children}</div>;
};

function Col({ children, className }) {
  return (
    <div
      className={`flex justify-between gap-[107px] max-w-[1436px] p-5 ${className}`}
    >
      {children}
    </div>
  );
}
export default Col;
