"use client";

import {
  createApiError,
  DEFAULT_OPTIONS,
  fetchWithTimeout,
  getApiUrl,
  HTTP_METHODS,
  serializeBody,
} from "./fetch-utils";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
  TOKEN_CONFIG,
} from "./token-utils";

let refreshTokenPromise = null;

/**
 * 액세스 토큰을 새로 갱신
 * 여러 요청이 동시에 토큰 갱신을 시도하는 경우를 방지하기 위해 Promise 재사용
 */
export const refreshAccessToken = async () => {
  // 이미 진행 중인 토큰 갱신 요청이 있다면 해당 Promise 반환
  if (refreshTokenPromise) {
    return await refreshTokenPromise;
  }

  // 새로운 토큰 갱신 요청 생성
  refreshTokenPromise = (async () => {
    try {
      const refreshUrl = TOKEN_CONFIG.REFRESH_ENDPOINT;
      const response = await fetch(refreshUrl, {
        method: HTTP_METHODS.PUT,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw createApiError(response.status, false);
      }

      const data = await response.json();

      if (data.data.accessToken) {
        const expiry =
          data.data.accessTokenExpiredDt || TOKEN_CONFIG.EXPIRES_IN;
        setAccessToken(data.data.accessToken, expiry);
        return data.data.accessToken;
      }

      throw new Error("새 액세스 토큰을 받지 못했습니다");
    } catch (error) {
      // 토큰 갱신 실패 시 기존 토큰 제거
      removeAccessToken();
      throw createApiError(401, false);
    }
  })();

  try {
    const result = await refreshTokenPromise;
    return result;
  } finally {
    // 작업 완료 후 항상 Promise 초기화
    refreshTokenPromise = null;
  }
};

/**
 * API 요청 함수
 * 인증 처리 및 오류 처리를 포함한 fetch 래퍼
 */
export const fetcher = async (url, options = {}) => {
  // URL 및 옵션 설정
  const fullUrl = getApiUrl(url, false);
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    headers: {
      ...DEFAULT_OPTIONS.headers,
      ...options?.headers,
    },
  };

  // POST, PUT, PATCH 요청의 경우 body 직렬화
  if (["POST", "PUT", "PATCH"].includes(mergedOptions.method) && options.body) {
    mergedOptions.body = serializeBody(options.body);
    if (options.body instanceof FormData) {
      delete mergedOptions.headers["Content-Type"];
    } else {
      mergedOptions.headers["Content-Type"] = "application/json";
    }
  }

  // 인증 헤더 설정
  const headers = { ...mergedOptions.headers };
  const accessToken = getAccessToken();

  if (accessToken && !headers["Authorization"]) {
    headers["authorization"] = accessToken;
  }

  try {
    // 첫 번째 요청 시도
    let response = await fetchWithTimeout(
      fullUrl,
      mergedOptions,
      headers,
      mergedOptions.timeout
    );

    // 인증 에러(401)인 경우 토큰 갱신 후 재시도
    if (response.status === 401) {
      const newToken = await refreshAccessToken();
      headers["authorization"] = newToken;

      response = await fetchWithTimeout(
        fullUrl,
        mergedOptions,
        headers,
        mergedOptions.timeout
      );
    }

    // 응답 처리
    const json = await response.json();

    // 성공 응답
    if (json.code === "SUC001") {
      return json.data;
    }

    // API 에러 처리
    const error = new Error(json.message || "알 수 없는 에러가 발생했습니다");
    error.code = json.code;
    error.status = response.status;
    error.data = json.data;
    throw error;
  } catch (error) {
    // 이미 에러 코드가 있는 경우 그대로 전달
    if (error.code) {
      throw error;
    }

    // 네트워크 에러 생성
    const networkError = new Error("네트워크 오류가 발생했습니다");
    networkError.code = "NETWORK_ERROR";
    throw networkError;
  }
};

export default fetcher;
