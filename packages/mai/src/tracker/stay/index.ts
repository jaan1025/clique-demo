/**
 * 页面停留时长
 */

import { Client } from "../../client";
import { defaultClientConfig } from "../../client/config";
import { Handler, Tracker } from "../base/Tracker";

export interface StayTrackerConfig {}

export class StayTracker extends Tracker {
  client: Client;
  config: StayTrackerConfig;
  handler: Handler;

  href: string;
  path: string;
  startTime: number;
  duration: number;

  constructor(client: Client, _config?: StayTrackerConfig) {
    super();

    this.client = client;
    this.config = {
      ...defaultClientConfig.stayTrack?.trackerConfig,
      ..._config,
    };
    this.handler = () => {};

    // this.reset()
    this.href = location.href;
    this.path = location.pathname;
    this.startTime = Date.now();
    this.duration = 0;
  }

  init(handler: Handler): void {
    this.handler = handler;
  }

  start() {
    console.log("StayTracker start");

    document.addEventListener(
      "visibilitychange",
      this.whenVisibilityChange.bind(this)
    );
    document.addEventListener(
      "beforeunload",
      this.whenVisibilityChange.bind(this)
    );

    this.client.on("routeChange", () => {
      this.submitDuration();
      this.reset();
    });
  }

  whenVisibilityChange() {
    if (document.visibilityState === "hidden") {
      this.submitDuration();
    } else if (document.visibilityState === "visible") {
      this.startTime = Date.now();
    }
  }

  beforePageUnload() {
    if (document.visibilityState === "visible") {
      this.submitDuration();
    }
  }

  submitDuration() {
    const diff = Date.now() - this.startTime;
    this.duration += diff;
    this.handler?.({
      duration: this.duration,
      href: this.href,
      path: this.path,
    });
  }

  reset() {
    this.href = location.href;
    this.path = location.pathname;
    this.startTime = Date.now();
    this.duration = 0;
  }
}
