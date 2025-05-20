import * as React from "react";

function FormLayout({ children, title, num, className }) {
  return (
    <div
      className={`flex justify-between gap-[107px] max-w-[1436px] p-5 ${className}`}
    >
      <div className="w-51">
        <span className="block text-primary-blue font-semibold body-2 font-poppins">
          {num}
        </span>
        <h3 className="heading-4 font-bold text-black">{title}</h3>
      </div>
      <div className="flex-1 space-y-11">{children}</div>
    </div>
  );
}
export default FormLayout;
