import Cookies from "js-cookie";

// 토큰 관련 설정
export const TOKEN_CONFIG = {
  COOKIE_NAME: "accessToken",
  REFRESH_ENDPOINT: "/api/v1/access-token",
  REFRESH_API_ENDPOINT:
    process.env.NEXT_PUBLIC_API_URL + "/api/v1/access-token",
  EXPIRES_IN: 3600,
  COOKIE_OPTIONS: {
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  },
};

/**
 * 액세스 토큰을 쿠키에서 가져옵니다.
 * @returns {string|null} 액세스 토큰 또는 null
 */
export const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return Cookies.get(TOKEN_CONFIG.COOKIE_NAME);
};

/**
 * 액세스 토큰을 쿠키에 저장합니다.
 * @param {string} token 액세스 토큰
 * @param {number} expiresIn 만료 시간(초)
 */
export const setAccessToken = (token, expiresIn = TOKEN_CONFIG.EXPIRES_IN) => {
  if (typeof window === "undefined") return;
  Cookies.set(TOKEN_CONFIG.COOKIE_NAME, token, {
    ...TOKEN_CONFIG.COOKIE_OPTIONS,
    expires: expiresIn / (60 * 60 * 24),
  });
};

/**
 * 액세스 토큰을 삭제합니다 (로그아웃 시 사용).
 */
export const removeAccessToken = () => {
  if (typeof window === "undefined") return;
  Cookies.remove(TOKEN_CONFIG.COOKIE_NAME);
};
