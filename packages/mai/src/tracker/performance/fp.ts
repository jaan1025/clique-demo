export const onFP = (callback: (entry: PerformanceEntry) => void) => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name === "first-paint") {
        // @ts-ignore
        callback(entry);
      }
    });
  });
  observer.observe({ entryTypes: ["paint"] });
};
