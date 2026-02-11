/*!
 * @file data.js - Data Processing Utilities
 * @version 1.1.0
 * @author Ian Wu (https://github.com/Mysterio1001)
 * @description Data processing utilities for deep copy, emptiness checks, and object property filtering (資料處理工具函式集，提供深拷貝、空值檢查、物件屬性篩選等功能)
 * @license MIT
 */

/**
 * --- Usage (使用方式) ---
 *
 * Import (引入):
 *    import { deepCopy, isEmpty, pick, omit } from "@/utils/data";
 */

/**
 * @function deepCopy
 * @description Performs a deep copy, preferring native structuredClone with JSON serialization as fallback (執行深拷貝，優先使用原生 structuredClone，若失敗則降級使用 JSON 序列化)
 * @param {any} data - The source object, array, or primitive to copy (欲拷貝的原對象、陣列或基本型別資料)
 * @returns {any} A deep copy of the data; returns null if an unexpected error occurs (拷貝後的副本，若發生不可預期的錯誤則回傳 null)
 */
export function deepCopy(data) {
  if (data === null || typeof data !== "object") return data;

  try {
    return structuredClone(data);
  } catch (e1) {
    try {
      // Falls back to JSON serialization when structuredClone fails (structuredClone 失敗時降級使用 JSON 序列化)
      return JSON.parse(JSON.stringify(data));
    } catch (e2) {
      return null;
    }
  }
}

/**
 * @function isEmpty
 * @description Checks if a value is empty in a broad sense (廣義空白檢查)
 * @param {*} data - The value to check (要檢查的對象)
 * @returns {Boolean} Whether the value is empty (是否為空)
 */
export function isEmpty(data) {
  // Covers both null and undefined (包含 null 和 undefined)
  if (data == null) return true;

  if (typeof data === "string") {
    return data.trim().length === 0;
  }
  if (Array.isArray(data)) {
    return data.length === 0;
  }
  if (data instanceof Map || data instanceof Set) {
    return data.size === 0;
  }
  if (typeof data === "object") {
    return Object.keys(data).length === 0;
  }
  return false;
}

/**
 * @function pick
 * @description Picks specified own properties from an object (從物件中挑選指定的自身屬性)
 * @param {Object} obj - The source object (來源物件)
 * @param {string[]} keys - The property names to retain (欲保留的屬性名稱陣列)
 * @returns {Object} A new object with only the specified properties (僅包含指定屬性的新物件)
 */

export function pick(obj, keys) {
  if (!obj || typeof obj !== "object" || !Array.isArray(keys)) return {};

  const target = deepCopy(obj);

  return keys.reduce((acc, key) => {
    // Only picks own properties to avoid prototype chain or custom method conflicts (確保只抓取物件自身屬性，避免原型鏈或自定義同名方法導致的錯誤)
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      acc[key] = target[key];
    }
    return acc;
  }, {});
}

/**
 * @function omit
 * @description Omits specified own properties from an object (從物件中刪除指定的自身屬性)
 * @param {Object} obj - The source object (來源物件)
 * @param {string[]} keys - The property names to exclude (欲刪除的屬性名稱陣列)
 * @returns {Object} A new object without the specified properties (不包含指定屬性的新物件)
 */

export function omit(obj, keys) {
  if (!obj || typeof obj !== "object" || !Array.isArray(keys)) return {};

  const target = deepCopy(obj);

  keys.forEach((key) => {
    // Only deletes own properties to avoid prototype chain or custom method conflicts (確保只刪除物件自身屬性，避免原型鏈或自定義同名方法導致的錯誤)
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      delete target[key];
    }
  });
  return target;
}
