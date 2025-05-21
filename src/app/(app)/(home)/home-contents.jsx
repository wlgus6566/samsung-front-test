"use client";
import HeroCarousel from "@/components/ui/hero-carousel";
import { Button } from "@/components/ui/button";
import ProgramSection from "@/components/home/program-section";

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
        <section className="p-5 sm:p-10 md:p-30">
          {/* 타이틀 영역 */}
          <div className="text-center">
            <span className="text-primary-blue font-semibold font-poppins sm:text-md text-xs">
              Service
            </span>

            <h2 className="font-bold text-ml sm:text-2xl md:text-3xl mt-1 sm:mt-3 md:mt-4">
              궁금하신 서비스가 있으세요?
            </h2>
          </div>

          {/* 서비스 아이템 버튼 영역 */}
          <div className="flex flex-wrap justify-center w-full p-5 max-w-[932px] mx-auto mt-7 sm:mt-12 md:mt-13 gap-2 sm:gap-4 md:gap-5">
            {serviceItems.map((item, index) => (
              <Button
                key={index}
                size="lg"
                variant={"outline"}
                className={"bg-white hover:bg-primary-blue hover:text-white"}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </section>
        <ProgramSection />
      </div>
    </div>
  );
}
