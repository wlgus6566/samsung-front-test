import * as React from "react";
import { cn } from "@/lib/utils";
function FormLayout({ children, title, num, className }) {
  return (
    <>
      <div
        className={cn(
          "flex justify-between flex-wrap md:gap-[123px] form-layout md:mt-20 max-md:my-3 ",
          className
        )}
      >
        <div className="md:w-51 w-full max-md:flex max-md:items-center max-md:pb-3 max-md:border-b-1 max-md:border-b-solid max-md:border-gray-900">
          <span className="md:block text-primary-blue font-semibold body2 font-poppins">
            {num}
          </span>
          <h3 className="heading4 font-bold text-black max-md:ml-2">{title}</h3>
        </div>
        <div className="flex-1 space-y-11 max-md:mt-7 max-md:space-y-8">
          {children}
        </div>
      </div>
      <style jsx>{`
        .form-layout + .form-layout {
          margin-top: 64px;
        }
        @media (min-width: 768px) {
          .form-layout + .form-layout {
            border-top: 1px solid var(--color-gray-900);
            margin-top: 110px;
            padding-top: 110px;
          }
        }
      `}</style>
    </>
  );
}
export default FormLayout;
