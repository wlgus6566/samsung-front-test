export const gnbMenu = [
  {
    label: "사업소개",
    url: "/business",
    children: [
      {
        label: "스마트공장소개",
        url: "/business/about",
        description: "스마트공장의 개념과 운영 방식 소개",
      },
      {
        label: "지원 프로그램",
        url: "/business/program",
        description: "스마트공장 지원 프로그램 안내",
      },
      {
        label: "현황제안",
        url: "/business/status",
        description: "스마트공장 현황 제안",
      },
      {
        label: "스마트365센터 안내",
        url: "/business/center",
        description: "스마트365센터 이용 안내",
      },
      {
        label: "지원절차 안내",
        url: "/business/process",
        description: "스마트공장 지원절차 안내",
      },
      {
        label: "갤러리",
        url: "/business/gallery",
        description: "스마트공장 갤러리",
      },
    ],
  },
  {
    label: "미디어&우수사례",
    url: "/media",
    children: [
      {
        label: "보도자료",
        url: "/media/press",
        description: "스마트제조혁신의 보도자료를 소개",
      },
      {
        label: "성공스토리",
        url: "/media/story",
        description: "스마트제조혁신의 성공 사례를 소개",
      },
      {
        label: "업종별 우수사례",
        url: "/media/case-by-industry",
        description: "스마트제조혁신의 업종별 우수사례를 소개",
      },
    ],
  },
  {
    label: "인재교육",
    url: "/education",
    children: [
      {
        label: "전문가양성교육",
        url: "/education/expert",
        description: "스마트제조혁신 전문가 양성과정 소개",
      },
      {
        label: "직무별특화교육",
        url: "/education/worker",
        description: "스마트제조혁신 직무별 특화 과정 소개",
      },
      {
        label: "삼성 사업장 벤치마킹",
        url: "/education/samsung",
        description: "삼성 사업장 벤치마킹 교육 안내",
      },
      {
        label: "우수기업 벤치마킹",
        url: "/education/excellent",
        description: "우수기업 벤치마킹 교육 안내",
      },
    ],
  },
  {
    label: "스마트비즈엑스포",
    url: "/expo",
    children: [
      {
        label: "스마트비즈엑스포 소개",
        url: "/expo/about",
        description: "스마트비즈엑스포 소개",
      },
      {
        label: "스마트비즈엑스포 참여 안내",
        url: "/expo/guide",
        description: "스마트비즈엑스포 참여안내",
      },
    ],
  },
  {
    label: "동반성장",
    url: "/growth",
    children: [
      {
        label: "판로지원",
        url: "/growth/market",
        description: "판로지원 프로그램 안내",
      },
      {
        label: "교차협력 마당",
        url: "/growth/cooperation",
        description: "교차협력 마당 안내",
      },
      {
        label: "글로벌 홍보방송",
        url: "/growth/global",
        description: "글로벌 홍보방송 안내",
      },
    ],
  },
  {
    label: "고객지원",
    url: "/support",
    children: [
      {
        label: "공지사항",
        url: "/support/notice",
        description: "스마트제조혁신 공지사항",
      },
      {
        label: "자료실",
        url: "/support/resources",
        description: "스마트제조혁신 관련 자료실",
      },
      {
        label: "FAQ",
        url: "/support/faq",
        description: "자주 묻는 질문 모음",
      },
      {
        label: "1:1 문의",
        url: "/support/qna",
        description: "개별 문의를 위한 1:1 상담",
      },
    ],
  },
];

// breadcrumb 생성을 위한 유틸리티 함수
export const generateBreadcrumb = (pathname) => {
  const breadcrumb = [{ label: "홈", url: "/" }];

  // 현재 경로에서 메뉴 찾기
  for (const menu of gnbMenu) {
    if (pathname.startsWith(menu.url)) {
      breadcrumb.push({ label: menu.label, url: menu.url });

      // 하위 메뉴 찾기
      if (menu.children) {
        for (const child of menu.children) {
          if (pathname === child.url || pathname.startsWith(child.url + "/")) {
            breadcrumb.push({ label: child.label, url: child.url });
            break;
          }
        }
      }
      break;
    }
  }

  return breadcrumb;
};
