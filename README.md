# Ian's Frontend Utilities Library 1.3.0

A curated collection of lightweight, zero-dependency JavaScript utility functions designed to streamline frontend development and enhance user experience.

## Project Purpose

The goal of this repository is to store and manage high-quality, reusable tools used across various web projects. Each utility is crafted to be framework-agnostic, meaning it can be integrated into Vue, React, or vanilla JavaScript environments seamlessly.

## Installationd

### Project Configuration Guide

Create a file named .npmrc in your project's root directory (at the same level as package.json), and add the following content:

```Plaintext
@mysterio1001:registry=https://npm.pkg.github.com
```

### Installation via npm

Open your terminal and run the following command to install the package:

```bash
npm install @mysterio1001/toolkit
```

### Usage / Import

```javascript
import { formatDate, showLoading, deepCopy } from "@mysterio1001/toolkit";
```

## Current Utilities

- **Global Loading Overlay**: A smart loading mask with a built-in request counter, style configuration, and scroll-lock capabilities.
- **Data Toolkit**: A robust set of data utilities including deepCopy with fallback support, comprehensive isEmpty checks, secure property pick, and a debounce performance optimizer.
- **Time Toolkit [New]**: A lightweight set of tools for date formatting, weekday retrieval, and date arithmetic using native JS.
- **Viewport & Device Monitor [New]**: A precise detection utility combining User Agent analysis and screen breakpoints to track device environments.

---

# Ian 的前端工具函式庫 1.3.0

這是一個精選的輕量級、零依賴 JavaScript 工具函式集合，旨在簡化前端開發流程並提升使用者體驗。

## 專案目標

本倉庫旨在儲存與管理各類 Web 專案中高複用性的工具。每個工具在設計時都考慮了框架無關性（Framework-agnostic），確保能無縫整合至 Vue、React 或純 JavaScript 環境中。

## 安裝說明

### 設定專案路徑指引

在您的專案根目錄（與 package.json 同層）建立一個名為 .npmrc 的檔案，並填入以下內容：

```Plaintext
@mysterio1001:registry=https://npm.pkg.github.com
```

### 使用 npm 安裝

開啟終端機，執行以下指令進行安裝：

```bash
npm install @mysterio1001/toolkit
```

### 引入

```javascript
import { formatDate, showLoading, deepCopy } from "@mysterio1001/toolkit";
```

## 目前包含工具

- **全域 Loading 遮罩**: 具備請求計數機制、樣式自定義配置以及滾動鎖定功能的智慧載入遮罩。
- **資料工具箱**: 一組穩健的數據處理工具，包含具備降級機制的 deepCopy、全面的 isEmpty 檢查、安全的屬性 pick 以及 debounce 效能優化工具。
- **時間工具箱 [New]**: 一組輕量化的時間處理工具，支援基於原生 JS 的日期格式化、星期計算及日期加減運算。
- **螢幕與裝置監測器 [New]**: 一款結合 User Agent 分析與螢幕斷點偵測的精確工具，用於追蹤與判定當前的裝置環境。
