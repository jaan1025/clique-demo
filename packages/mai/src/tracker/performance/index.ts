import { Client } from "../../client";
import { defaultClientConfig } from "../../client/config";
import { Handler, Tracker } from "../base/Tracker";

import { onCLS } from "./cls";
import { onFCP } from "./fcp";
import { onFID } from "./fid";
import { onFP } from "./fp";
import { onINP } from "./inp";
import { onLCP } from "./lcp";
import { onTTFB } from "./ttfb";

export type PerformanceIndexAlias =
  | "cls"
  | "fcp"
  | "fid"
  | "fp"
  | "inp"
  | "lcp"
  | "ttfb";

export type PerformanceTrackerConfig = {
  [key in PerformanceIndexAlias]?: {
    enable: boolean;
  };
};

const listenerMap: Record<PerformanceIndexAlias, any> = {
  cls: onCLS,
  fcp: onFCP,
  fid: onFID,
  fp: onFP,
  inp: onINP,
  lcp: onLCP,
  ttfb: onTTFB,
};

export class PerformanceTracker extends Tracker {
  client: Client;
  config: PerformanceTrackerConfig;
  handler: Handler;

  constructor(client: Client, _config?: PerformanceTrackerConfig) {
    super();

    this.client = client;
    this.config = {
      ...defaultClientConfig.performanceTrack?.trackerConfig,
      ..._config,
    };
    this.handler = () => {};
  }

  init(handler: Handler) {
    this.handler = handler;
  }

  start() {
    console.log("PerformanceTracker start");

    Object.keys(listenerMap).forEach((key) => {
      if (this.config[key as PerformanceIndexAlias]?.enable) {
        listenerMap[key as PerformanceIndexAlias]?.((metric: any) => {
          const payload = metric;
          this.handler?.(payload);
        });
      }
    });
  }
}
