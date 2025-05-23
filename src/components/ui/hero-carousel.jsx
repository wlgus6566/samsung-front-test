// components/HeroCarousel.tsx
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Img from "@/components/ui/img";

const slides = [
  {
    title: "Dream Together\nGrow Together",
    description: "당신의 꿈 그리고 성장, 삼성과 함께해요",
    imageUrl: "/temp/main_slide_00.jpg",
  },
  {
    title: "Innovate The Future",
    description: "기술과 상상이 만나는 그곳에서",
    imageUrl: "/temp/main_slide_00.jpg",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState(null); // embla API

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();
      setCurrentIndex(index);
    };

    api.on("select", onSelect);
    onSelect(); // 초기값 설정

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="relative w-full rounded-[20px]  overflow-hidden bg-black text-white">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full h-full">
        <CarouselContent className="h-[544px]">
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="flex items-center w-full h-full px-10 relative overflow-hidden bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${slide.imageUrl}')`,
              }}
            >
              <div className="relative z-10 text-left">
                <h1 className="text-4xl font-poppins font-semibold whitespace-pre-line">
                  {slide.title}
                </h1>
                <p className="mt-3 text-md font-medium">{slide.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div
          className="absolute top-0 right-0 z-10 w-[289px] h-[96px] bg-cover bg-center bg-no-repeat flex justify-end"
          style={{
            backgroundImage: `url('/images/page/home/rec.svg')`,
          }}
        >
          <button
            type="button"
            className="flex items-center gap-1 bg-gradient-brand text-white h-13 px-5 py-3.25 rounded-[16px] text-xs sm:text-sm sm:px-8 sm:py-4.25 sm:rounded-[20px] sm:h-15"
          >
            지원절차 안내 바로가기
            <Img
              src="/images/icon/ic_inverse_right_up_arrow.svg"
              alt="arrow-up-right"
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* 인디케이터 - 좌하단 */}
        <div className="absolute w-full bottom-8 left-10 z-10 flex items-center gap-8">
          {/* 페이지네이션 */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => api?.scrollPrev()}
              className="h-4 w-4 p-0 bg-transparent hover:bg-transparent"
            >
              <Img
                src="/images/icon/ic_inverse_left_angle.svg"
                alt="이전"
                width={16}
                height={16}
              />
            </button>
            <span className="font-semibold text-3xs">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="font-semibold ml-6 text-3xs text-white/28 relative before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-white before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-4">
              {String(slides.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => api?.scrollNext()}
              className="static h-4 w-4 p-0 bg-transparent hover:bg-transparent"
            >
              <Img
                src="/images/icon/ic_inverse_right_angle.svg"
                alt="이전"
                width={16}
                height={16}
              />
            </button>
          </div>

          {/* 타임바 */}
          <div className="w-[calc(100%-207px)] h-0.5 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{
                width: `${((currentIndex + 1) / slides.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </Carousel>
    </section>
  );
}
