/*!
 * @file loading.js - Global Loading Overlay Utility (全域載入遮罩工具)
 * @version 1.3.0
 * @author Ian Wu (https://github.com/Mysterio1001)
 * @description Multi-request counter based loading overlay with pure JS rendering. No framework dependency, works with any frontend project. (基於多請求計數器的載入遮罩，使用純 JS 渲染，不依賴任何框架，適用於任何前端專案)
 * @license MIT
 */

/**
 * loading.js - Global Loading Overlay Utility (全域載入遮罩工具)
 *
 * Call showLoading to show the overlay, call hideLoading to close it. (呼叫 showLoading 顯示遮罩，呼叫 hideLoading 關閉遮罩)
 *
 * --- Usage (使用方式) ---
 *
 * 1. Import (引入):
 *    import { showLoading, hideLoading } from "@/utils/loading";
 *
 * 2. Show loading (with or without text) (顯示載入，可選擇是否帶文字):
 *    showLoading();              // default, no text (預設，不帶文字)
 *    showLoading("Loading...");  // custom text (自訂文字)
 *
 * 3. Hide loading (隱藏載入):
 *    hideLoading();
 *    hideLoading(true);  // 強制隱藏全部載入
 *
 * 4. With async/await (搭配 async/await 使用):
 *    showLoading("Processing...");
 *    try {
 *      await fetchData();
 *    } finally {
 *      hideLoading();
 *    }
 *
 * 5. With then/catch (搭配 then/catch 使用):
 *    showLoading("Processing...");
 *    fetchData()
 *      .then((res) => { ... })
 *      .catch((err) => { ... })
 *      .finally(() => hideLoading());
 *
 * 6. Loading bar mode (進度條模式):
 *    import { loadingBarStart, setLoadingBar, loadingBarEnd } from "@/utils/loading";
 *
 *    loadingBarStart();       // show overlay with progress bar at 1% (顯示遮罩，進度條從 1% 開始)
 *    setLoadingBar(50);       // set progress bar to 50% (將進度條設定至 50%)
 *    loadingBarEnd();         // animate to 100% then remove overlay (動畫推進至 100% 後移除遮罩)
 *
 * 7. Custom styles: modify the config object below. (自訂樣式：修改下方的 config 物件)
 */

let loadingCount = 0;
let loadingInstance = null;
let prevOverflow = "";

// Style Configuration (樣式設定)
const config = {
  maskBackgroundColor: "rgba(255, 255, 255, 0.7)", // mask background color (遮罩背景色)
  mainColor: "hsl(25, 35%, 35%)", // primary color for spinner , text and loading bar (旋轉器,文字以及進度條的主色)
  trackColor: "#f3f3f3", // track color for spinner and loading bar (旋轉器和進度條的軌道色)
  barHeight: "10px",
  spinnerSize: "42px", // spinner size (旋轉器大小)
  spinnerBorderWidth: "3px", // spinner border width (旋轉器邊框寬度)
  fontSize: "14px", // loading text font size (載入文字字級)
  zIndex: 2000, // overlay z-index (遮罩層級)
};

// Create DOM and inject CSS (建立 DOM 並注入 CSS)

const injectStyle = () => {
  if (document.getElementById("loading-style-by-ian")) return;
  const style = document.createElement("style");

  style.id = "loading-style-by-ian";
  style.textContent = `
        .ian-loading-mask {
            position: fixed;
            z-index: ${config.zIndex};
            background-color: ${config.maskBackgroundColor};
            margin: 0;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            transition: opacity 0.3s;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        .ian-loading-spinner {
            width: ${config.spinnerSize};
            height: ${config.spinnerSize};
            border: ${config.spinnerBorderWidth} solid ${config.trackColor};
            border-top: ${config.spinnerBorderWidth} solid ${config.mainColor};
            border-radius: 50%;
            animation: ian-loading-rotate 1s linear infinite;
        }
        .ian-loading-bar {
            overflow: hidden;
            width: 80%;
            box-shadow: inset 0 1px 2px 1px ${config.trackColor};
            height: ${config.barHeight};
            border-radius: 10px;
        }
        .ian-loading-bar-line {
            width: 0;
            height: 100%;
            background-color:  ${config.mainColor};
            box-shadow: inset 0 1px 2px 1px ${config.trackColor};
            transition: width 0.6s ease-in-out;
        }
        .ian-loading-text {
            color: ${config.mainColor};
            margin: 10px 0;
            font-size: ${config.fontSize};
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
        }
        @keyframes ian-loading-rotate {
            to { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(style);
};

/**
 * @function showLoading
 * @description Show the loading overlay. Increments the internal counter; only creates DOM on the first call. (顯示載入遮罩，內部計數器加一，僅在首次呼叫時建立 DOM)
 * @param {string} [text] - Optional loading text to display (可選的載入顯示文字)
 */
export const showLoading = (text) => {
  injectStyle();

  if (loadingCount === 0) {
    // Clean up any orphaned instance left by hideLoading's 300ms timer (清除 hideLoading 300 毫秒計時器遺留的孤立實例)
    if (loadingInstance && loadingInstance.parentNode) {
      loadingInstance.parentNode.removeChild(loadingInstance);
    }
    loadingInstance = document.createElement("div");
    loadingInstance.className = "ian-loading-mask";

    const spinner = document.createElement("div");
    spinner.className = "ian-loading-spinner";

    const textEl = document.createElement("p");
    textEl.className = "ian-loading-text";
    if (text) textEl.textContent = text;

    loadingInstance.appendChild(spinner);
    loadingInstance.appendChild(textEl);
    document.body.appendChild(loadingInstance);
    // Save original overflow and disable scroll to prevent user interaction (儲存原始 overflow 並禁用捲動，防止使用者互動)
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  loadingCount++;
};

/**
 * @function hideLoading
 * @description Hide the loading overlay. Decrements the internal counter; removes DOM only when counter reaches zero. (隱藏載入遮罩，內部計數器減一，僅在計數器歸零時移除 DOM)
 * @param {boolean} [force=false] - If true, bypasses the counter and forces the overlay to close. (若為 true，跳過計數器並強制關閉遮罩)
 */
export const hideLoading = (force = false) => {
  if (!loadingInstance || loadingCount <= 0) {
    loadingCount = 0; // ensure counter resets to zero (確保計數器重置為零)
    return;
  }
  if (!force) {
    loadingCount--;
  } else {
    loadingCount = 0;
  }

  if (loadingCount === 0) {
    setTimeout(() => {
      if (loadingCount > 0) return;
      // check instance exists to prevent errors (檢查實例是否存在以防止錯誤)
      if (loadingInstance && loadingInstance.parentNode) {
        loadingInstance.parentNode.removeChild(loadingInstance);
      }
      loadingInstance = null;
      document.body.style.overflow = prevOverflow; // restore original overflow (還原原始 overflow)
    }, 300);
  }
};

let widthPercent = 0;

/**
 * @function loadingBarStart
 * @description Show a loading bar overlay in the center of the screen. Disables scrolling while active. (顯示載入進度條遮罩於螢幕正中央，啟用時禁用捲動)
 */
export const loadingBarStart = () => {
  injectStyle();

  if (loadingInstance && loadingInstance.parentNode) {
    loadingInstance.parentNode.removeChild(loadingInstance);
  }

  loadingInstance = document.createElement("div");
  loadingInstance.className = "ian-loading-mask";

  const bar = document.createElement("div");
  bar.className = "ian-loading-bar";

  const line = document.createElement("div");
  line.className = "ian-loading-bar-line";

  loadingInstance.appendChild(bar);
  bar.appendChild(line);
  document.body.appendChild(loadingInstance);

  prevOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  widthPercent = 0;
};

/**
 * @function setLoadingBar
 * @description Set the loading bar to a specific width percentage. Ignores values less than 1. (將進度條設定為指定的寬度百分比，忽略小於 1 的值)
 * @param {number} num - Target width percentage (1–100) (目標寬度百分比，範圍 1–100)
 */
export const setLoadingBar = (num) => {
  if (num < 1 || num > 100) return;
  const line = document.querySelector(".ian-loading-bar-line");
  if (!line) return;
  widthPercent = num;
  requestAnimationFrame(() => {
    line.style.width = `${widthPercent}%`;
  });
};

/**
 * @function loadingBarEnd
 * @description Complete the loading bar by animating to 100%, then remove the overlay after the transition ends. (將進度條動畫推進至 100%，待 transition 結束後移除遮罩)
 */
export const loadingBarEnd = () => {
  const line = document.querySelector(".ian-loading-bar-line");
  if (!line) return;

  const cleanup = () => {
    if (loadingInstance && loadingInstance.parentNode) {
      loadingInstance.parentNode.removeChild(loadingInstance);
    }
    loadingInstance = null;
    widthPercent = 0;
    document.body.style.overflow = prevOverflow; // restore original overflow (還原原始 overflow)
  };
  // Wait for transition to finish before cleanup; fires only once and auto-removes the listener (等待 transition 完成後再清除，僅觸發一次並自動移除 listener)
  line.addEventListener("transitionend", cleanup, { once: true });
  setLoadingBar(100);
};
