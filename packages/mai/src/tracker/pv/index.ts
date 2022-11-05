import { Client } from "../../client";
import { defaultClientConfig } from "../../client/config";
import { Handler, Tracker } from "../base/Tracker";

export interface PageViewTrackerConfig {}

export class PageViewTracker extends Tracker {
  client: Client;
  config: PageViewTrackerConfig;
  handler: Handler;

  constructor(client: Client, _config?: PageViewTrackerConfig) {
    super();

    this.client = client;
    this.config = {
      ...defaultClientConfig.stayTrack?.trackerConfig,
      ..._config,
    };
    this.handler = () => {};
  }

  init(handler: Handler): void {
    this.handler = handler;
  }

  start() {
    console.log("PageViewTracker start");

    const payload = {
      location,
    };
    this.handler?.(payload);

    this.client.on("routeChange", ({ from }) => {
      const payload = {
        fromLocation: from,
        location,
      };
      this.handler?.(payload);
    });
  }
}
