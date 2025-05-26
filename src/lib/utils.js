import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isValid } from "date-fns";
import { ko } from "date-fns/locale";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * 날짜 문자열을 'YYYY.MM.DD' 형식으로 변환합니다.
 * @param {string} dateString - 'YYYY-MM-DD HH:MM:SS.SSS' 형식의 날짜 문자열
 * @returns {string} 'YYYY.MM.DD' 형식의 날짜 문자열
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

/**
 * 날짜 문자열에서 시간만 'HH:MM' 형식으로 변환합니다.
 * @param {string} dateString - 'YYYY-MM-DD HH:MM:SS.SSS' 형식의 날짜 문자열
 * @returns {string} 'HH:MM' 형식의 시간 문자열
 */
export const formatTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

/**
 * 시작일과 종료일을 적절한 형식으로 표시합니다.
 * - 같은 날: 'YYYY.MM.DD HH:MM ~ HH:MM'
 * - 다른 날: 'YYYY.MM.DD ~ YYYY.MM.DD'
 * @param {string} beginDt - 시작 날짜 문자열
 * @param {string} endDt - 종료 날짜 문자열
 * @returns {string} 포맷팅된 기간 문자열
 */
export const formatEventPeriod = (beginDt, endDt) => {
  if (!beginDt) return "";

  const beginDate = formatDate(beginDt);

  // 종료일이 없는 경우
  if (!endDt) return beginDate;

  const endDate = formatDate(endDt);

  // 시작일과 종료일이 같은 날인 경우
  if (beginDate === endDate) {
    return `${beginDate} ${formatTime(beginDt)} ~ ${formatTime(endDt)}`;
  }

  // 시작일과 종료일이 다른 날인 경우
  return `${beginDate} ~ ${endDate}`;
};

/**
 * 주어진 ISO 날짜 문자열을 한국어 날짜 형식으로 변환합니다.
 * 예: '2025-04-22T01:21:19.214' → '2025년 4월 22일 (화)'
 *
 * @param {string} dateString - ISO 형식의 날짜 문자열
 * @returns {string} 'YYYY년 M월 D일 (요일)' 형식의 문자열
 */
export const formatDateToKorean = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0부터 시작하니까 +1
  const day = date.getDate();

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = days[date.getDay()];

  return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
};
