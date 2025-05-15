// HTTP 에러 상수
export const HTTP_ERRORS = {
  400: { message: "잘못된 요청입니다", code: "BAD_REQUEST" },
  401: { message: "인증이 필요합니다", code: "AUTH_REQUIRED" },
  403: { message: "접근 권한이 없습니다", code: "FORBIDDEN" },
  404: { message: "요청한 리소스를 찾을 수 없습니다", code: "NOT_FOUND" },
  500: { message: "서버 내부 오류가 발생했습니다", code: "SERVER_ERROR" },
};

// HTTP 메서드 상수
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

// 기본 요청 옵션
export const DEFAULT_OPTIONS = {
  method: HTTP_METHODS.GET,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * API 에러 객체를 생성합니다.
 * @param {number} status HTTP 상태 코드
 * @param {boolean} isServer 서버 사이드 여부
 * @returns {Error} API 에러 객체
 */
export const createApiError = (status, isServer = false) => {
  const { message, code } = HTTP_ERRORS[status] || {
    message: `API 요청 중 오류가 발생했습니다: ${status}`,
    code: "API_ERROR",
  };

  const error = new Error(message);
  error.status = status;
  error.code = code;

  if (isServer) {
    error.isServer = true;
    error.redirectUrl = `/login?reason=${code.toLowerCase()}`;
  }

  return error;
};

/**
 * 요청 본문을 직렬화합니다.
 * @param {any} body 요청 본문
 * @returns {string|FormData} 직렬화된 본문
 */
export const serializeBody = (body) => {
  if (body instanceof FormData) {
    return body;
  }
  return JSON.stringify(body);
};

/**
 * 타임아웃이 있는 Promise를 생성합니다.
 * @param {Function} promiseFn Promise를 생성하는 함수
 * @param {number} timeout 타임아웃 시간(ms)
 * @returns {Object} Promise와 cleanup 함수를 포함하는 객체
 */
export const withTimeout = (promiseFn, timeout) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  return {
    promise: promiseFn(controller.signal),
    cleanup: () => clearTimeout(timeoutId),
  };
};

export const fetchWithTimeout = async (url, options, headers, timeout) => {
  const { promise, cleanup } = withTimeout(
    (signal) =>
      fetch(url, {
        ...options,
        headers,
        credentials: "include",
        signal,
      }),
    timeout
  );

  try {
    return await promise;
  } finally {
    cleanup();
  }
};

/**
 * API URL을 생성합니다.
 * @param {string} url API 경로
 * @param {boolean} isServer 서버 사이드 여부
 * @returns {string} 전체 API URL
 */
export const getApiUrl = (url, isServer) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  if (url.startsWith("http")) return url;
  const base = isServer ? API_BASE_URL : "";
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${base}${path}`;
};
