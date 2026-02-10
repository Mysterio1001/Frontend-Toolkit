/*!
 * @file loading.js - Global Loading Overlay Utility
 * @version 1.1.0
 * @author Ian Wu (https://github.com/Mysterio1001)
 * @description Multi-request counter based loading overlay with pure JS rendering. No framework dependency, works with any frontend project.
 * @license MIT
 */

/**
 * loading.js - Global Loading Overlay Utility
 *
 * Call showLoading to show the overlay, call hideLoading to close it.
 *
 * --- Usage ---
 *
 * 1. Import:
 *    import { showLoading, hideLoading } from "@/utils/loading";
 *
 * 2. Show loading (with or without text):
 *    showLoading();              // default, no text
 *    showLoading("Loading...");  // custom text
 *
 * 3. Hide loading:
 *    hideLoading();
 *
 * 4. With async/await:
 *    showLoading("Processing...");
 *    try {
 *      await fetchData();
 *    } finally {
 *      hideLoading();
 *    }
 *
 * 5. With then/catch:
 *    showLoading("Processing...");
 *    fetchData()
 *      .then((res) => { ... })
 *      .catch((err) => { ... })
 *      .finally(() => hideLoading());
 *
 * 6. Custom styles: modify the config object below.
 */

let loadingCount = 0;
let loadingInstance = null;
let prevOverflow = "";

// Style Configuration
const config = {
  maskBackgroundColor: "rgba(255, 255, 255, 0.7)", // mask background color
  mainColor: "hsl(25, 35%, 35%)", // primary color for spinner & text
  spinnerSize: "42px", // spinner size
  spinnerBorderWidth: "3px", // spinner border width
  spinnerTrackColor: "#f3f3f3", // spinner track color
  fontSize: "14px", // loading text font size
  zIndex: 2000, // overlay z-index
};

// Create DOM and inject CSS

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
            border: ${config.spinnerBorderWidth} solid ${config.spinnerTrackColor};
            border-top: ${config.spinnerBorderWidth} solid ${config.mainColor};
            border-radius: 50%;
            animation: ian-loading-rotate 1s linear infinite;
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
 * @description Show the loading overlay. Increments the internal counter; only creates DOM on the first call.
 * @param {string} [text] - Optional loading text to display
 */
export const showLoading = (text) => {
  injectStyle();

  if (loadingCount === 0) {
    // Clean up any orphaned instance left by hideLoading's 300ms timer
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
    // Save original overflow and disable scroll to prevent user interaction
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  loadingCount++;
};

/**
 * @function hideLoading
 * @description Hide the loading overlay. Decrements the internal counter; removes DOM only when counter reaches zero.
 */
export const hideLoading = () => {
  if (!loadingInstance || loadingCount <= 0) {
    loadingCount = 0; // ensure counter resets to zero
    return;
  }
  loadingCount--;

  if (loadingCount === 0) {
    setTimeout(() => {
      if (loadingCount > 0) return;
      // check instance exists to prevent errors
      if (loadingInstance && loadingInstance.parentNode) {
        loadingInstance.parentNode.removeChild(loadingInstance);
      }
      loadingInstance = null;
      document.body.style.overflow = prevOverflow; // restore original overflow
    }, 300);
  }
};
