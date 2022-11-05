// 全埋点

import { Handler, Tracker } from "../base/Tracker";
import { getTrackableElement } from "./utils";
import { defaultClientConfig } from "../../client/config";
import { getElementText } from "./utils";
import { Client } from "../../client";

export interface AutoTrackerConfig {
  click?: {
    enable: boolean;
  };
}

export class AutoTracker extends Tracker {
  client: Client;
  config: AutoTrackerConfig;
  handler: Handler;

  constructor(client: Client, _config?: AutoTrackerConfig) {
    super();

    this.client = client;
    this.config = {
      ...defaultClientConfig.autoTrack?.trackerConfig,
      ..._config,
    };
    this.handler = () => {};
  }

  init(handler: Handler) {
    this.handler = handler;
  }

  trackClickEvent(event: MouseEvent) {
    const element = getTrackableElement(event.target as HTMLElement);

    if (element) {
      const text = getElementText(element);
      const nodeName = element.nodeName;
      const payload = {
        type: "click",
        text,
        nodeName,
      };
      this.handler?.(payload);
    }
  }

  start() {
    console.log("AutoTracker start");

    if (this.config.click?.enable) {
      document.addEventListener(
        "click",
        this.trackClickEvent.bind(this),
        true
      );
    }
  }
}
