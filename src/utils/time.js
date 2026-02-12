/*!
 * @file time.js - Time Utilities
 * @version 1.1.0
 * @author Ian Wu (https://github.com/Mysterio1001)
 * @description A collection of utility functions for date manipulation, formatting, and calculation based on native Date object. (基於原生 Date 物件的時間操作、格式化與計算工具集)
 * @license MIT
 */

/**
 * --- Usage (使用方式) ---
 *
 * Import (引入):
 * import { getWeekday, diffDay, addDay, format } from "@/utils/time";
 */

/**
 * @function getWeekday
 * @description Get the weekday name from a given date. (取得日期的星期名稱)
 * @param {Date|string|number} [date=new Date()] - The date to evaluate (欲判定的日期)
 * @returns {string} The name of the weekday in English (英文星期名稱)
 */
export function getWeekday(date = new Date()) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = new Date(date).getDay(); // 回傳0-6
  return weekdays[day];
}

/**
 * @function diffDay
 * @description Calculate the absolute difference in days between two dates. (計算兩個日期相差的天數)
 * @param {Date|string|number} day1 - The first date (日期一)
 * @param {Date|string|number} day2 - The second date (日期二)
 * @returns {number} The positive integer number of days between the two dates (兩日期相隔的正整數天數)
 */
export function diffDay(day1, day2) {
  // Reset time to zero and compare only the "date" portion (將時間部分歸零，只比較「日期」)
  const date1 = new Date(day1).setHours(0, 0, 0, 0);
  const date2 = new Date(day2).setHours(0, 0, 0, 0);
  // Ensure the result is always positive in milliseconds (確保結果永遠為正數，單位為毫秒)
  const diffTime = Math.abs(date2 - date1);
  // Convert milliseconds to days and return, rounding up (轉換毫秒為天數並回傳，無條件進位)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * @function addDay
 * @description Add or subtract a specified number of days and return a new Date object. (加減指定天數並回傳新日期物件)
 * @param {number|string} delta - The number of days to add or subtract (加減天數)
 * @param {Date|string|number} [date=new Date()] - The reference date (基準日期)
 * @returns {Date} A new Date object with the adjusted date (調整後的日期物件)
 */
export function addDay(delta, date = new Date()) {
  const currentDate = new Date(date);
  const numDelta = Number(delta);
  // Defensive check: return original date if delta is not a valid number (防禦性檢查：若 delta 非有效數字則回傳原日期)
  if (isNaN(numDelta)) return currentDate;

  currentDate.setDate(currentDate.getDate() + numDelta);
  return currentDate;
}

/**
 * @function format
 * @description Convert a date object to a formatted string based on a template. (將日期物件轉換為指定格式字串)
 * @param {Date|string|number} [date=new Date()] - The date to format (欲格式化的日期)
 * @param {string} [formatStr='YYYY-MM-DD'] - Format template, supporting YYYY, MM, DD, HH, mm, ss (格式化模板，支援 YYYY, MM, DD, HH, mm, ss)
 * @returns {string} The formatted date string (格式化後的日期字串)
 */
export function format(date = new Date(), formatStr = "YYYY-MM-DD") {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  // Pad numbers with leading zeros (將數字補齊為二位數)
  const pad = (num) => String(num).padStart(2, "0");

  const map = {
    YYYY: d.getFullYear(),
    MM: pad(d.getMonth() + 1),
    DD: pad(d.getDate()),
    HH: pad(d.getHours()),
    mm: pad(d.getMinutes()),
    ss: pad(d.getSeconds()),
  };

  // Replace matched strings using global regex (用正則去取代符合的字串，g 為全域搜尋)
  return formatStr.replace(/YYYY|MM|DD|HH|mm|ss/g, (matched) => map[matched]);
}
