"use client";

import React from "react";
import HeadBreadcrumb from "@/components/layout/head-breadcrumb";

export default function KeyVisual({ title, description, backgroundImage }) {
  return (
    <>
      <div className="key-visual relative h-[220px]">
        <div className="relative h-full px-[20px] z-10 text-center">
          <HeadBreadcrumb />
          <h1 className="heading-1 font-bold mt-13">{title}</h1>
          <p className="mt-5 body-2 font-medium">{description}</p>
        </div>
      </div>
      <style jsx>{`
        .key-visual:before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}
