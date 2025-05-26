# Figma Context MCP Server 사용 가이드

## 개요

Figma Context MCP Server는 Figma 디자인을 기반으로 React 컴포넌트를 효율적으로 개발할 수 있도록 도와주는 도구입니다. 이 가이드는 프로젝트의 기존 컴포넌트와 스타일 시스템을 활용하여 일관성 있는 개발을 진행하는 방법을 제시합니다.

## 기본 원칙

### 1. 컴포넌트 재사용

기존 UI 컴포넌트를 최대한 활용하여 개발 효율성을 높이고 일관성을 유지합니다.

```jsx
// 기본 컴포넌트 활용 예시
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
```

### 2. 타이포그래피 시스템

`globals.css`의 utilities 클래스를 사용하여 일관된 텍스트 스타일을 적용합니다.

```jsx
// 반응형 타이포그래피 클래스 사용
<h1 className="display">메인 제목</h1>
<h2 className="heading1">섹션 제목</h2>
<h3 className="heading2">서브 제목</h3>
<p className="body1">본문 텍스트</p>
<span className="body3">작은 텍스트</span>
```

### 3. 색상 시스템

`variables.css`의 색상 변수를 활용하여 브랜드 일관성을 유지합니다.

```jsx
// CSS 변수 활용
<div className="bg-blue-500 text-white">
  <span className="text-gray-700">보조 텍스트</span>
</div>
```

### 4. 반응형 디자인

프로젝트의 브레이크포인트를 준수합니다:

- **모바일**: 기본 (768px 미만)
- **태블릿**: `sm:` (768px 이상)
- **PC**: `md:` (1024px 이상)

## 주요 컴포넌트 활용법

### Button 컴포넌트

```jsx
import { Button } from "@/components/ui/button";

// 기본 사용법
<Button variant="primary" size="md">
  기본 버튼
</Button>

// 반응형 적용
<Button
  variant="outline"
  size="sm"
  className="sm:size-md md:size-lg"
>
  반응형 버튼
</Button>
```

### Input 컴포넌트

```jsx
import { Input } from "@/components/ui/input";

// 검색 입력창
<Input
  type="search"
  placeholder="검색어를 입력하세요"
  className="w-full sm:w-80 md:w-96"
/>

// 폼 입력창
<Input
  type="text"
  label="이름"
  required
  className="body3"
/>
```

## 레이아웃 패턴

## 색상 활용 가이드

### 브랜드 색상

```jsx
// 주요 브랜드 색상
<div className="bg-blue-500 text-white">Primary Blue</div>
<div className="bg-green-500 text-white">Primary Green</div>
<div className="bg-red-500 text-white">Primary Red</div>

// 그레이 스케일
<div className="bg-gray-50 text-gray-900">Light Background</div>
<div className="bg-gray-100 text-gray-800">Subtle Background</div>
<div className="bg-gray-900 text-white">Dark Background</div>
```

## 반응형 개발 패턴

### 간격 조정

```jsx
// 마진/패딩
<div className="p-5 sm:p-8 md:p-10">
  <div className="mb-5 sm:mb-8 md:mb-10">
    {/* 콘텐츠 */}
  </div>
</div>

// 갭
<div className="flex gap-3 sm:gap-5 md:gap-8">
  {/* 플렉스 아이템들 */}
</div>
```

### 숨김/표시

```jsx
// 모바일에서만 표시
<div className="block sm:hidden">
  모바일 전용 콘텐츠
</div>

// 태블릿 이상에서만 표시
<div className="hidden sm:block">
  태블릿/PC 전용 콘텐츠
</div>

// PC에서만 표시
<div className="hidden md:block">
  PC 전용 콘텐츠
</div>
```

## 폼 구성 패턴

### 기본 폼 레이아웃

```jsx
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

<Form>
  <div className="space-y-5 sm:space-y-6 md:space-y-8">
    <FormField>
      <FormItem>
        <FormLabel className="body3 font-semibold">이름</FormLabel>
        <FormControl>
          <Input placeholder="이름을 입력하세요" className="body3" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField>
      <FormItem>
        <FormLabel className="body3 font-semibold">이메일</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="이메일을 입력하세요"
            className="body3"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div className="flex gap-3 sm:gap-5">
      <Button variant="outline" className="flex-1">
        취소
      </Button>
      <Button variant="primary" className="flex-1">
        제출
      </Button>
    </div>
  </div>
</Form>;
```

## 접근성 고려사항

### 키보드 네비게이션

```jsx
// 포커스 가능한 요소들
<button
  className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  }}
>
  버튼
</button>
```

### 스크린 리더 지원

```jsx
// aria 속성 활용
<button
  aria-label="메뉴 열기"
  aria-expanded={isMenuOpen}
  aria-controls="navigation-menu"
>
  <span className="sr-only">메뉴</span>
  {/* 아이콘 */}
</button>

<nav id="navigation-menu" aria-hidden={!isMenuOpen}>
  {/* 네비게이션 메뉴 */}
</nav>
```

## 성능 최적화

### 이미지 최적화

```jsx
import Img from "@/components/ui/img";

// 반응형 이미지
<Img
  src="/images/hero-image.jpg"
  alt="히어로 이미지"
  width={800}
  height={400}
  className="w-full h-auto object-cover"
  priority={true}
/>;
```

## 마무리

이 가이드를 통해 Figma 디자인을 기반으로 일관성 있고 접근성이 좋은 React 컴포넌트를 개발할 수 있습니다. 항상 기존 컴포넌트를 먼저 확인하고, 프로젝트의 디자인 시스템을 준수하여 개발하시기 바랍니다.

### 추가 참고사항

- 새로운 컴포넌트 개발 시 기존 패턴을 따라 작성
- 색상과 타이포그래피는 반드시 정의된 변수 사용
- 반응형 디자인은 모바일 우선으로 개발
- 접근성과 성능을 항상 고려하여 개발
