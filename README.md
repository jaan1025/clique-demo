# clique demo

## 埋点

### 信息

- 客户端信息
  - navigator

### 性能埋点

- web核心指标，<https://github.com/GoogleChrome/web-vitals>
  - 累积布局偏移 (CLS)
    - 页面稳定性
  - 首次输入延迟 (FID)
    - 页面响应度
  - 最大内容绘制 (LCP)
  - 首次内容绘制（FCP）
  - 第一字节时间（TTFB）
    - 请求响应时延
  - Interaction to Next Paint (INP)
    - 页面交互灵敏度
- 其他
  - 首次绘制（FP）
    - 绘制出第一个像素点，反映白屏时间
    - performance.getEntriesByType('paint');
  
### 用户行为埋点

- 页面停留时长
- 点击

### 页面

- 元素曝光exposure
  - [IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)
  - [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- pv
- uv

## 上报

- [Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API)
  - navigator.sendBeacon(url, data);

## 整体设计

- Client，mai package默认导出一个Client实例
  - trackers，各种监听器
    - auto-track，全埋点
    - info，客户端信息收集
    - exposure，页面元素曝光
    - performance，性能指标收集
    - pv
    - stay，页面停留时间收集
  - reporter，上报逻辑，这里定义为console.log
  - init(params)，初始化埋点实例，设置开启哪些监听器，默认全部开启
  - start()，启动监听器

## 参考

<https://web.dev/vitals/>

<https://github.com/GoogleChrome/web-vitals>

<https://cloud.tencent.com/developer/article/1887830>
