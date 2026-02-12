/*!
 * @file viewport.js - Viewport & Device Detection Utilities
 * @version 1.1.0
 * @author Ian Wu (https://github.com/Mysterio1001)
 * @description Provides viewport size acquisition and device type detection, combining User Agent and screen width for precise determination. (提供視窗尺寸取得及裝置類型偵測，結合 User Agent 與螢幕寬度提供精確判定)
 * @license MIT
 */

/**
 * --- Usage (使用方式) ---
 *
 * Import (引入):
 * import { getView, getDevice, watchDevice } from "@/utils/viewport";
 */

/**
 * @function getView
 * @description Get the current width and height of the viewport. (取得當前螢幕的高與寬)
 * @returns {Object} An object containing width (number) and height (number) (包含 width 與 height 的物件)
 */
export function getView() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return { width, height };
}

/**
 * @function getDevice
 * @description Detect the current device type by combining User Agent and screen breakpoints. (檢測當前裝置類型，結合 User Agent 與螢幕斷點提供精確判定)
 * @returns {Object} An object containing device (string) and isMobile (boolean) (包含 device 與 isMobile 的物件)
 */
export function getDevice() {
  const ua = navigator.userAgent;
  const width = getView().width;

  // Prioritize User Agent detection via regex (優先使用 User Agent 正則表達式判定)
  const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua);
  const isPhone =
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpwOS)/i.test(
      ua,
    );
  let device;
  let isMobile = true;

  if (isTablet || (width <= 1024 && width >= 768)) {
    device = "tablet";
  } else if (isPhone || width < 768) {
    device = "mobile";
  } else {
    device = "desktop";
    isMobile = false;
  }

  return { device, isMobile };
}

/**
 * @function watchDevice
 * @description Listen for window resize events and trigger callback only when the device type changes. (監聽視窗縮放，僅在裝置類型發生改變時觸發回呼)
 * @param {Function} callback - Function executed when device type changes, receives ({ device, isMobile }) (裝置類型改變時執行的函式)
 * @returns {Function} Unwatch function to remove the event listener (移除監聽的函式)
 */
export function watchDevice(callback) {
  // Store the initial device state (記住初始裝置狀態)
  let lastDevice = getDevice().device;

  // Event handler (監聽函式)
  const handler = () => {
    const current = getDevice();
    const currentDevice = current.device;
    // Execute callback only if the device type has changed (裝置有變化時才執行回呼)
    if (currentDevice !== lastDevice) {
      lastDevice = currentDevice; // Update state (更新)
      callback(current);
    }
  };

  window.addEventListener("resize", handler);

  // Return function to remove listener (回傳移除監聽的函式)
  return () => {
    window.removeEventListener("resize", handler);
  };
}
