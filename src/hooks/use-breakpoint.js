import { useEffect, useState } from "react";

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("pc");

  const getBreakpoint = (width) => {
    if (width <= 720) return "mobile";
    if (width <= 1024) return "tablet";
    return "pc";
  };

  useEffect(() => {
    const update = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    update(); // 첫 렌더링 시 실행
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return breakpoint;
}
