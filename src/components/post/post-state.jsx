import React from "react";

// 로딩 컴포넌트
function PostLoading({
  message = "데이터를 불러오는 중입니다...",
  className = "w-full text-center py-[80px]",
}) {
  return (
    <div className={className}>
      <p>{message}</p>
    </div>
  );
}

// 에러 컴포넌트
function PostError({
  message = "데이터를 불러오는 중 오류가 발생했습니다.",
  className = "w-full text-center py-[80px] text-red-500",
}) {
  return (
    <div className={className}>
      <p>{message}</p>
    </div>
  );
}

// 데이터 없음 컴포넌트
function PostNoData({
  message = "게시물이 없습니다.",
  colSpan = 3,
  className = "text-center py-[80px]",
}) {
  return (
    <tr>
      <td colSpan={colSpan} className={className}>
        {message}
      </td>
    </tr>
  );
}

// 통합 상태 관리 컴포넌트
export default function PostState({
  isLoading = false,
  error = null,
  data = null,
  isEmpty = false,
  loadingMessage = "데이터를 불러오는 중입니다...",
  errorMessage,
  emptyMessage = "게시물이 없습니다.",
  colSpan = 3,
  children,
  renderData = null,
}) {
  // 로딩 중
  if (!data && isLoading) {
    return <PostLoading message={loadingMessage} />;
  }

  // 에러 발생
  if (error) {
    const message =
      errorMessage ||
      `데이터를 불러오는 중 오류가 발생했습니다${
        error.message ? `: ${error.message}` : "."
      }`;
    return <PostError message={message} />;
  }

  if (isEmpty || (Array.isArray(data?.list) && data.list.length === 0)) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  if (renderData && data) {
    return renderData(data);
  }

  return children;
}
