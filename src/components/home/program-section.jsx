"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProgramSection() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    const cards = cardRefs.current;
    const cardCount = cards.length;
    const scrollHeight = window.innerHeight * (cardCount + 1);

    const ctx = gsap.context(() => {
      // 섹션 높이 세팅
      gsap.to(sectionRef.current, {
        height: scrollHeight,
        ease: "none",
      });

      // 초기 zIndex 및 첫 카드 opacity 설정
      cards.forEach((card, i) => {
        gsap.set(card, {
          zIndex: cardCount - i,
          opacity: i === 0 ? 1 : 0,
          y: 0,
        });
      });

      // 두 번째 카드부터 ScrollTrigger 생성
      cards.forEach((card, i) => {
        if (i === 0) return; // 첫 번째 카드는 트리거 설정 안함

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `top+=${i * window.innerHeight * 0.7} top`,
          end: `top+=${(i + 1) * window.innerHeight * 0.7} top`,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const currentCard = cards[i];
            const prevCard = cards[i - 1];

            // 현재 카드 등장
            gsap.to(currentCard, {
              opacity: progress,
              y: 50 - progress * 50,
              ease: "power1.out",
              overwrite: "auto",
            });

            // 이전 카드 퇴장
            if (prevCard) {
              gsap.to(prevCard, {
                opacity: 1 - progress,
                ease: "power1.out",
                overwrite: "auto",
              });
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white">
      {/* 상단 타이틀 영역 - 고정 */}
      <div
        ref={titleRef}
        className="sticky top-0 z-50 bg-gradient-to-b from-[#f0f4ff] to-white pt-20 pb-10 text-center"
      >
        <p className="text-sm text-blue-500 font-semibold">Program</p>
        <h2 className="text-2xl sm:text-4xl font-bold mt-2">
          삼성만의 차별화된 프로그램으로
          <br />
          당신의 변화를 함께 만들어가요
        </h2>
      </div>

      {/* 카드 영역 */}
      <div className="sticky top-[150px] h-[600px]">
        <div className="relative w-full max-w-6xl mx-auto h-full">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el && !cardRefs.current.includes(el)) {
                  cardRefs.current.push(el);
                }
              }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-full bg-white rounded-[30px] shadow-2xl flex overflow-hidden"
            >
              <img
                src={`https://picsum.photos/id/${100 + i}/600/400`}
                alt={`Card ${i + 1}`}
                className="w-1/2 h-full object-cover"
              />
              <div className="w-1/2 flex flex-col justify-center p-10">
                <span className="text-sm text-gray-500 mb-2">인재교육</span>
                <h3 className="text-2xl font-bold mb-4">카드 제목 {i + 1}</h3>
                <p className="text-gray-600">
                  이 영역에 카드 {i + 1}의 설명을 작성할 수 있어요. 애니메이션이
                  재생되는 동안 배경과 타이틀은 그대로 고정됩니다.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
