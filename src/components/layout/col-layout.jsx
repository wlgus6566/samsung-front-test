import * as React from "react";

export const LeftCont = ({ num, title }) => {
  return (
    <div>
      <span className="block text-primary-blue font-semibold text-md font-poppins">
        {num}
      </span>
      <h3 className="text-lg font-bold text-black">{title}</h3>
    </div>
  );
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
