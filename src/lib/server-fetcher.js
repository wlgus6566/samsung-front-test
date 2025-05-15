"use server";
import { createApiError, DEFAULT_OPTIONS, getApiUrl } from "./fetch-utils";
import { cookies } from "next/headers";

/**
 * 서버사이드에서 사용하는 fetch 함수
 * @param {string} url 요청할 API URL
 * @param {Object} options fetch 옵션
 * @param {string} accessToken 액세스 토큰 (필수)
 * @param {Object} req 원본 요청 객체 (쿠키 전달용)
 * @param {Object} res 응답 객체 (토큰 갱신 시 쿠키 설정용) - Next.js Pages Router에서만 사용
 * @returns {Promise<any>} API 응답 데이터
 */
export const serverFetcher = async (
  url,
  options = {},
  accessToken = null,
  req = null,
  res = null
) => {
  const fullUrl = getApiUrl(url, true);

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    headers: {
      ...DEFAULT_OPTIONS.headers,
      ...options?.headers,
    },
    credentials: "include",
  };

  const cookieStore = await cookies();
  accessToken = cookieStore.get("accessToken")?.value;
  if (accessToken && !mergedOptions.headers["authorization"]) {
    mergedOptions.headers["authorization"] = accessToken;
  }

  try {
    let response = await fetch(fullUrl, mergedOptions);

    let json = await response.json();

    if (!response.ok) {
      const error = createApiError(response.status, true);
      throw error;
    }

    if (!json.data || json.code !== "SUC001") {
      const error = new Error(json.message || "알 수 없는 에러가 발생했습니다");
      error.code = json.code || "UNKNOWN_ERROR";
      error.status = response.status;
      throw error;
    }
    return json.data;
  } catch (error) {
    throw error;
  }
};

export default serverFetcher;
