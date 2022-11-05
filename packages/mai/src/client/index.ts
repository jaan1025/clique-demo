import { logReport } from './../utils/report';
import { InfoTracker } from "./../tracker/info/index";
import { AutoTracker } from "../tracker/auto-track";
import { PerformanceTracker } from "../tracker/performance";
import { ClientConfig, defaultClientConfig } from "./config";
import { StayTracker } from "../tracker/stay";
import { PageViewTracker } from "../tracker/pv";

export type InitParams = Pick<
  ClientConfig,
  | "appId"
  | "appName"
  | "autoTrack"
  | "infoTrack"
  | "performanceTrack"
  | "stayTrack"
  | "pageViewTrack"
>;

export interface ConfigParams {
  appId?: string;
}

const createReportHandler = (type: string, reporter: any) => {
  return (payload: any) => {
    reporter(type, payload);
  }
}

export class Client {
  clientConfig: ClientConfig;

  autoTracker: AutoTracker | null;
  infoTracker: InfoTracker | null;
  performanceTracker: PerformanceTracker | null;
  stayTracker: StayTracker | null;
  pageViewTracker: PageViewTracker | null;

  trackers: any[];

  events: Record<
    string,
    {
      listeners: ((payload: any) => void)[];
    }
  >;
  
  reporter: (type: string, payload: Record<string, any>) => void;

  lastLocation: Location | null;

  constructor() {
    this.clientConfig = defaultClientConfig;

    this.autoTracker = null;
    this.infoTracker = null;
    this.performanceTracker = null;
    this.stayTracker = null;
    this.pageViewTracker = null;

    this.trackers = [];
    this.events = {};

    this.reporter = logReport;

    this.lastLocation = null;
  }

  init(params?: InitParams) {
    const {
      appId,
      appName,
      autoTrack,
      infoTrack,
      performanceTrack,
      stayTrack,
      pageViewTrack,
    } = {
      ...this.clientConfig,
      ...params,
    };

    if (appId) {
      this.clientConfig.appId = appId;
    }
    if (appName) {
      this.clientConfig.appName = appName;
    }

    if (autoTrack?.enable) {
      this.autoTracker = new AutoTracker(this);
      this.autoTracker.init(createReportHandler('autoTrack', this.reporter));
      this.trackers.push(this.autoTracker);
    }
    if (infoTrack?.enable) {
      this.infoTracker = new InfoTracker(this);
      this.infoTracker.init(createReportHandler('info', this.reporter));
      this.trackers.push(this.infoTracker);
    }
    if (performanceTrack?.enable) {
      this.performanceTracker = new PerformanceTracker(this);
      this.performanceTracker.init(createReportHandler('performance', this.reporter));
      this.trackers.push(this.performanceTracker);
    }
    if (stayTrack?.enable) {
      this.stayTracker = new StayTracker(this);
      this.stayTracker.init(createReportHandler('stay', this.reporter));
      this.trackers.push(this.stayTracker);
    }
    if (pageViewTrack?.enable) {
      this.pageViewTracker = new PageViewTracker(this);
      this.pageViewTracker.init(createReportHandler('pv', this.reporter));
      this.trackers.push(this.pageViewTracker);
    }
  }

  config(params: ConfigParams) {
    this.clientConfig = {
      ...this.clientConfig,
      ...params,
    };
  }

  start() {
    this.trackers.forEach((tracker) => {
      tracker.start();
    });

    // FIXME: popstate not work
    window.addEventListener("popstate", (e) => {
      this.emit("routeChange", {
        from: this.lastLocation,
      });
      this.lastLocation = {
        ...location,
      };
    });
  }

  on(eventName: string, listener: (payload: any) => void) {
    if (!this.events[eventName]) {
      this.events[eventName] = {
        listeners: [],
      };
    }
    this.events[eventName].listeners.push(listener);
  }

  emit(eventName: string, payload: any) {
    const event = this.events[eventName];
    if (event?.listeners?.length) {
      event.listeners.forEach((listener) => {
        listener(payload);
      });
    }
  }
}
