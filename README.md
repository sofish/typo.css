## 中文网页重设与排版：

目标：一致化浏览器排版效果，构建最适合中文阅读的网页排版。包括桌面和移动平台。

预览：[typo.css](https://typo.built4.fun)

### 一、目录结构    
    .
    ├── README.md           --- 使用帮助
    ├── docs/               --- 设计依据与维护文档
    │   ├── library-evolution-plan.md --- Research、同类库调研与库级升级计划
    │   └── modern-chinese-typography.md --- 现代中文网页排版依据
    ├── license.txt         --- 许可证
    ├── tests/              --- 自动化测试
    │   └── typography.test.js --- 现代中文排版契约测试
    ├── typo.css            --- 将应用于你的项目
    └── typo.html           --- Demo/预览


### 二、TYPO.CSS 的设计和使用


## TYPO.CSS 主要包括：

1、一般 reset.css 所需的内容
 
目前的设计是这样的，尽量保持完整的 reset，比如让 ul/ol 无样式并且无多余的 `padding`/`margin`，这是必须的，因为一个网可能需要很多自定义的的内容，在实践中我们并不希望像 ul/ol 有样式，这样我们得用优先级去覆盖，这是非常麻烦的事。所以 typo.css 并不像 normalize.css，后者给每一个元素都预先定义了样式，这样在自定义的时候将是非常痛苦的。要大保持干净的所有元素一致化的 reset 才是最佳实践。

2、`class="typo"` 阅读内容排版

在文章/文档阅读的页面，需添加 `.typo` 这个 class，这样 table/ol/ul 等都会有预定的样式，让你的排版像 [https://typo.built4.fun](https://typo.built4.fun) 一样，让用户阅读起来更舒服。

在父容器在没有添加 `class="typo"` 的时候，可以使用 `class="typo-标签"`（如 `class="typo-ul"`）来实现像 `.typo > ul` 这样结构的样式。

现代浏览器中，`.typo` 会启用更适合中文阅读的字重、行高、CJK 断行、中文/西文自动间距、标点挤压、原生着重号和更好的换行策略。需要控制正文行长时，可在文章容器上叠加 `.typo-readable`，需要居中时再叠加 `.typo-readable-center`。

Typo.css 现在把现代中文排版分成默认增强和显式 helper：默认 `.typo` 保持横排正文友好；`.typo-justify` 用于需要两端对齐的长文；`.typo-vertical` 用于直排场景；`.typo-zhuyin` 用于注音 ruby；`lang="zh-Hant"`、`lang="zh-TW"`、`lang="zh-HK"` 或 `lang="zh-MO"` 会启用繁体中文字体回退。
 
3、增加类：

主要是一些需要中文日常排版需要的元素和语文对应样式的增强，目前包括：

(1) 专名号：使用标签 `<u>` 或者 `.typo-u` <br />
(2) 着重号：使用 class `.typo-em` <br />
(3) 清理浮动：与一般 reset.css 保持一致 `.clearfix` <br />
(4) 强制换行：添加 `.textwrap` 到文本所在的容器，如果是 `table` 测还需要 `.textwrap-table` <br />
(5) 衬线字体：添加 `.serif` <br />
(6) 适合中文正文的最大行长：添加 `.typo-readable`，居中时再添加 `.typo-readable-center` <br />
(7) 中文四大印刷体 helper：`.typo-serif`、`.typo-kai`、`.typo-fangsong` <br />
(8) 高级中文排版 helper：`.typo-justify`、`.typo-vertical`、`.typo-zhuyin` <br />
(9) 创建 border-box：在 html 中添加 `.borderbox` [#why](https://www.paulirish.com/2012/box-sizing-border-box-ftw/)

更多现代中文网页排版依据见 [`docs/modern-chinese-typography.md`](docs/modern-chinese-typography.md)，Research、同类库调研与库级升级计划见 [`docs/library-evolution-plan.md`](docs/library-evolution-plan.md)。

### 三、测试

运行 `npm test` 可检查现代中文排版规则、文档链接和 Demo 页面的 SEO/GEO 元数据是否保持同步。


### 四、开源许可
基于 [MIT License](https://zh.wikipedia.org/wiki/MIT_License) 开源，使用代码只需说明来源，或者引用 [license.txt](https://github.com/sofish/typo.css/blob/master/license.txt) 即可。
