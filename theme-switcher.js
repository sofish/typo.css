#!/usr/bin/env node
/**
 * typo.css Theme Switcher Helper
 *
 * 轻量级主题切换脚本，支持:
 *   - 系统偏好自动检测 (prefers-color-scheme)
 *   - 用户手动切换（localStorage 持久化）
 *   - 5 种主题: light / dark / sepia / contrast / large
 *
 * 用法:
 *   <script src="node_modules/typo.css/theme-switcher.js"></script>
 *   <button onclick="TypoTheme.set('dark')">暗色</button>
 *   <button onclick="TypoTheme.set('sepia')">护眼</button>
 *   <button onclick="TypoTheme.set('large')">大字</button>
 *   <button onclick="TypoTheme.reset()">跟随系统</button>
 */

(function () {
  "use strict";

  const STORAGE_KEY = "typo-theme";
  const ROOT = document.documentElement;

  const themeMap = {
    light:    "light",
    dark:     "dark",
    sepia:    "sepia",
    contrast: "contrast",
    large:    "large",
    auto:     null,   // 移除 data-typo-theme，跟随系统
  };

  function detectSystem() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  }

  function apply(theme) {
    if (theme === "auto" || theme === null) {
      ROOT.removeAttribute("data-typo-theme");
      ROOT.classList.remove("typo-dark", "typo-sepia", "typo-contrast", "typo-large");
      return;
    }
    ROOT.setAttribute("data-typo-theme", theme);
    // 同步 class（部分主题通过 class 激活）
    ROOT.classList.remove("typo-dark", "typo-sepia", "typo-contrast", "typo-large");
    if (theme !== "light") ROOT.classList.add(`typo-${theme}`);
  }

  function save(theme) {
    if (theme === "auto") {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  }

  function load() {
    return localStorage.getItem(STORAGE_KEY) || "auto";
  }

  // 初始化
  const saved = load();
  const theme = saved === "auto" ? detectSystem() : saved;
  apply(saved === "auto" ? "auto" : theme);

  // 监听系统主题切换
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (load() === "auto") {
      apply(e.matches ? "dark" : "light");
    }
  });

  // 暴露全局 API
  window.TypoTheme = {
    /** 设置主题: 'light' | 'dark' | 'sepia' | 'contrast' | 'large' | 'auto' */
    set: function (t) {
      if (!(t in themeMap)) { console.warn(`Unknown theme: ${t}`); return; }
      save(t);
      apply(t === "auto" ? detectSystem() : t);
    },
    /** 获取当前主题 */
    get: function () { return load(); },
    /** 重置为跟随系统 */
    reset: function () { this.set("auto"); },
    /** 列出可用主题 */
    list: function () { return Object.keys(themeMap); },
  };
})();
