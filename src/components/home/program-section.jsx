"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonLink } from "@/components/ui/button";
gsap.registerPlugin(ScrollTrigger);

export default function ProgramSection() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const titleRef = useRef(null);

  const programList = [
    {
      tag: "인재교육",
      title: "특화교육",
      imgUrl: "/images/page/home/program_00.jpg",
      description:
        "전문화된 직무 교육으로 직무에 대한 이해도를<br />성장시킬 수 있는 프로그램을 확인해 보세요",
      linkText: "인재교육 더 알아보기",
      link: "https://www.samsung.com/sec/business/education/training/specialized-education/",
    },
    {
      tag: "인재교육",
      title: "전문가 양성교육",
      imgUrl: "/images/page/home/program_01.jpg",
      description:
        "스마트공장 운영에 꼭 필요한 전문 기술과 실무 역량을 배우고<br />최신 트렌드를 반영해 현장에서 바로 활용해 보세요",
      linkText: "인재교육 더 알아보기",
      link: "https://www.samsung.com/sec/business/education/training/specialized-education/",
    },
    {
      tag: "인재교육",
      title: "벤치마킹 투어 신청",
      imgUrl: "/images/page/home/program_02.jpg",
      description:
        "스마트공장 우수 구축 사례를 직접 둘러보고 체험해 보세요<br />현장에서 스마트공장 구축의 노하우를 직접 경험할 수 있어요",
      linkText: "벤치마킹 투어 신청",
      link: "https://www.samsung.com/sec/business/education/training/specialized-education/",
    },
  ];

  useEffect(() => {
    const cards = cardRefs.current;
    const cardCount = cards.length;
    const scrollHeight = window.innerHeight * (cardCount + 0.5);

    const ctx = gsap.context(() => {
      // 섹션 높이 세팅
      gsap.to(sectionRef.current, {
        height: scrollHeight,
        ease: "none",
      });

      // 초기 zIndex 및 첫 카드 opacity 설정
      cards.forEach((card, i) => {
        gsap.set(card, {
          opacity: i === 0 ? 1 : 0,
          y: 0,
        });
      });

      // 카드 애니메이션 설정
      cards.forEach((card, i) => {
        if (i === 0) return;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: () => `top+=${i * 368} top`,
          end: () => `top+=${(i + 1) * 368 - 368 / 2} center`,
          scrub: true,
          markers: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const currentCard = cards[i];
            const prevCard = cards[i - 1];

            // 올라오는 y 위치: 200 → 20(i=1), 200 → 40(i=2)
            const startY = 400;
            const endY = 120 * i;
            const currentY = startY - progress * (startY - endY);

            gsap.to(currentCard, {
              opacity: progress,
              y: currentY,
              ease: "power1.out",
              overwrite: "auto",
            });

            if (prevCard) {
              const minOpacity = i === 1 ? 0.2 : i === 2 ? 0.4 : 0;
              gsap.to(prevCard, {
                opacity: Math.max(minOpacity, 1 - progress),
                ease: "power1.out",
                overwrite: "auto",
              });
            }
          },
        });
      });

      // 추가: 마지막 카드가 완전히 보이게 된 후에도 이전 카드들의 opacity가 유지되도록 설정
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: `top+=${cardCount * window.innerHeight * 0.7} top`,
        end: `bottom bottom`,
        scrub: true,
        onEnter: () => {
          // 첫 번째 카드는 opacity 0.2로 고정
          gsap.set(cards[0], { opacity: 0.2 });
          // 두 번째 카드는 opacity 0.4로 고정
          gsap.set(cards[1], { opacity: 0.4 });
          // 세 번째 카드는 opacity 1로 고정
          gsap.set(cards[2], { opacity: 1 });
        },
      });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: `top+=${cardCount * 368} top`, // 카드 끝나는 시점
        end: `bottom bottom`,
        onEnter: () => {
          const el = document.querySelector("#cardWrapper");
          el?.classList.remove("sticky");
        },
        onLeaveBack: () => {
          const el = document.querySelector("#cardWrapper");
          el?.classList.add("sticky");
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      {/* 상단 타이틀 영역 - 고정 */}
      <div
        ref={titleRef}
        className="sticky top-0 z-50 pt-[152px] pb-10 text-center"
      >
        <span className="text-primary-blue font-semibold font-poppins sm:text-md text-xs">
          Program
        </span>

        <h2 className="font-bold text-ml sm:text-2xl md:text-3xl mt-1 sm:mt-3 md:mt-4">
          삼성만의 차별화된 프로그램으로
          <br />
          당신의 변화를 함께 만들어가요
        </h2>
      </div>

      {/* 카드 영역 */}
      <div className="sticky top-[368px] h-[484px] p-5 bg-white rounded-3xl shadow-card ">
        <div className="relative mx-auto h-full">
          {programList.map((program, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el && !cardRefs.current.includes(el)) {
                  cardRefs.current.push(el);
                }
              }}
              className={`z-${
                i + 1
              } absolute top-0 left-0 w-full h-full flex bg-white `}
            >
              <div className="w-[57.83%] overflow-hidden">
                <img
                  src={program.imgUrl}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[42.17%] flex flex-col justify-center px-8 py-10 md:px-10 md:py-12">
                <div className="inline-block px-3 py-1 rounded-full bg-tag-gray mb-4">
                  <span className="text-xs font-medium text-neutral-600">
                    {program.tag}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-neutral-900">
                  {program.title}
                </h3>
                <p
                  className="text-sm md:text-base text-neutral-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: program.description }}
                />
                <div className="mt-6 md:mt-8">
                  <ButtonLink
                    href={program.link}
                    icon="topRight"
                    variant="brand"
                    size="lg"
                    className="md:text-xs"
                  >
                    {program.linkText}
                  </ButtonLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
