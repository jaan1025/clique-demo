import { Client } from "../../client";
import { defaultClientConfig } from "../../client/config";
import { Handler, Tracker } from "../base/Tracker";
import { getClientInfo } from "./client";

export interface InfoTrackerConfig {}

export class InfoTracker extends Tracker {
  client: Client;
  config: InfoTrackerConfig;
  handler: Handler;

  constructor(client: Client, _config?: InfoTrackerConfig) {
    super();

    this.client = client;
    this.config = {
      ...defaultClientConfig.infoTrack?.trackerConfig,
      ..._config,
    };
    this.handler = () => {};
  }

  init(handler: Handler) {
    this.handler = handler;
  }

  start() {
    console.log("InfoTracker start");
    const clientInfo = getClientInfo();
    const payload = clientInfo;
    this.handler?.(payload);
  }
}
