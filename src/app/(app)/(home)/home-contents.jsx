"use client";
import HeroCarousel from "@/components/ui/hero-carousel";
import { Button } from "@/components/ui/button";

const serviceItems = [
  { name: "전문가 양성교육 📚", isHighlighted: false },
  { name: "제휴 프로그램 🤝", isHighlighted: true },
  { name: "벤치마킹 프로그램 🦾", isHighlighted: false },
  { name: "지원절차 확인 🗂️", isHighlighted: false },
  { name: "지원자격 확인 👀", isHighlighted: false },
  { name: "1:1 문의하기 💬", isHighlighted: false },
  { name: "FAQ ✋", isHighlighted: false },
  { name: "신청내역 📋", isHighlighted: false },
];

export default function HomeContents() {
  return (
    <div className="bg-gray-100">
      <div className="container-fixed px-4 md:px-6 lg:px-10">
        <HeroCarousel />
        {/* 궁금하신 서비스가 있으세요? */}
        <section className="py-7 md:py-10 lg:py-13">
          {/* 타이틀 영역 */}
          <div className="flex flex-col items-center mb-7 md:mb-10 lg:mb-13">
            <span className="text-blue-500 font-semibold font-poppins text-4xl sm:text-heading-2">
              Service
            </span>

            <h2 className="font-bold text-2xl md:text-4xl lg:text-5xl text-center mt-1 md:mt-3 lg:mt-4">
              궁금하신 서비스가 있으세요?
            </h2>
          </div>

          {/* 서비스 아이템 버튼 영역 */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-5 px-0 md:px-8 lg:px-32">
            {serviceItems.map((item, index) => (
              <Button
                key={index}
                variant={item.isHighlighted ? "brand" : "outline"}
                className={`
                  rounded-full 
                  shadow-sm 
                  text-sm md:text-base lg:text-xl 
                  font-semibold 
                  py-2 md:py-3 lg:py-4 
                  px-3 md:px-7 lg:px-8
                  h-auto
                  ${item.isHighlighted ? "text-white" : "text-gray-700"}
                `}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
