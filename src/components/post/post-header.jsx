import React from "react";
import { formatDate } from "@/lib/utils";

export default function PostHeader({ title, registrationDt = "2024.08.05" }) {
  return (
    <div className="py-10 border-t border-gray-900">
      <h1 className="heading4 font-bold">{title}</h1>
      <p className="body5 font-medium mt-4 font-poppins text-gray-800">
        {formatDate(registrationDt)}
      </p>
    </div>
  );
}
