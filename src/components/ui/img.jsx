"use client";
import Image from "next/image";
import { memo, useState } from "react";

const Img = memo(
  ({ src = "/images/temp/no_image.png", className = "", ...props }) => {
    const [imgSrc, setImgSrc] = useState(src);

    const handleError = () => {
      if (imgSrc !== "/images/temp/no_image.png") {
        setImgSrc("/images/temp/no_image.png");
      }
    };

    const isPriority = props.priority === true;

    return (
      <Image
        src={imgSrc}
        className={`object-cover ${className}`}
        onError={handleError}
        {...props}
        priority={isPriority}
        loading={isPriority ? undefined : props.loading || "lazy"}
        unoptimized={
          props.unoptimized !== undefined ? props.unoptimized : false
        }
      />
    );
  }
);

Img.displayName = "Img";

export default Img;
