/**
 * @file index.d.ts
 * @description Frontend-Toolkit Type Definitions
 * @author Ian Wu (https://github.com/Mysterio1001)
 */

declare module "@mysterio1001/toolkit" {
  // --- data.js (Data Processing Utilities) ---

  /** 執行深拷貝，優先使用原生 structuredClone，若失敗則降級使用 JSON 序列化 */
  export function deepCopy<T>(data: T): T;

  /** 廣義空白檢查 (包含 null, undefined, 空字串, 空陣列, 空物件, 空 Map/Set) */
  export function isEmpty(data: any): boolean;

  /** 從物件中挑選指定的自身屬性 */
  export function pick<T extends object, K extends keyof T>(
    obj: T,
    keys: K[],
  ): Pick<T, K>;

  /** 從物件中刪除指定的自身屬性 */
  export function omit<T extends object, K extends keyof T>(
    obj: T,
    keys: K[],
  ): Omit<T, K>;

  // --- loading.js (Global Loading Overlay) ---

  /** 顯示載入遮罩，內部計數器加一 */
  export function showLoading(text?: string): void;

  /** 隱藏載入遮罩，內部計數器減一；若 force 為 true 則強制關閉 */
  export function hideLoading(force?: boolean): void;

  /** 顯示載入進度條遮罩於螢幕正中央 */
  export function loadingBarStart(): void;

  /** 將進度條設定為指定的寬度百分比 (1–100) */
  export function setLoadingBar(num: number): void;

  /** 將進度條動畫推進至 100%，結束後移除遮罩 */
  export function loadingBarEnd(): void;

  // --- time.js (Time Utilities) ---

  /** 取得日期的英文星期名稱 (如: Monday) */
  export function getWeekday(date?: Date | string | number): string;

  /** 計算兩個日期相差的天數 (絕對值) */
  export function diffDay(
    day1: Date | string | number,
    day2: Date | string | number,
  ): number;

  /** 加減指定天數並回傳新日期物件 */
  export function addDay(
    delta: number | string,
    date?: Date | string | number,
  ): Date;

  /** 將日期物件轉換為指定格式字串 (支援 YYYY, MM, DD, HH, mm, ss) */
  export function format(
    date?: Date | string | number,
    formatStr?: string,
  ): string;

  // --- viewport.js (Viewport & Device Detection) ---

  /** 取得當前螢幕的高與寬 */
  export function getView(): { width: number; height: number };

  /** 檢測當前裝置類型 (desktop, tablet, mobile) 與是否為行動裝置 */
  export function getDevice(): {
    device: "desktop" | "tablet" | "mobile";
    isMobile: boolean;
  };

  /** 監聽視窗縮放，僅在裝置類型 (device) 發生改變時觸發回呼 */
  export function watchDevice(
    callback: (info: { device: string; isMobile: boolean }) => void,
  ): () => void;
}
