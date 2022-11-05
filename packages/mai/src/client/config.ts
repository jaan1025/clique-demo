import { PageViewTrackerConfig } from './../tracker/pv/index';
import { PerformanceTrackerConfig } from "./../tracker/performance/index";
import { AutoTrackerConfig } from "../tracker/auto-track";
import { InfoTrackerConfig } from "../tracker/info";
import { StayTrackerConfig } from "./../tracker/stay";

export interface ClientConfig {
  appId?: string;
  appName?: string;

  autoTrack?: {
    enable?: boolean;
    trackerConfig?: AutoTrackerConfig;
  };
  infoTrack?: {
    enable?: boolean;
    trackerConfig?: InfoTrackerConfig;
  };
  performanceTrack?: {
    enable?: boolean;
    trackerConfig?: PerformanceTrackerConfig;
  };
  stayTrack?: {
    enable?: boolean;
    trackerConfig?: StayTrackerConfig;
  };
  pageViewTrack?: {
    enable?: boolean;
    trackerConfig?: PageViewTrackerConfig;
  };

  reporter?: any;
}

export const defaultClientConfig: ClientConfig = {
  autoTrack: {
    enable: true,
    trackerConfig: {
      click: {
        enable: true,
      },
    },
  },
  infoTrack: {
    enable: true,
    trackerConfig: {},
  },
  performanceTrack: {
    enable: true,
    trackerConfig: {
      cls: {
        enable: true,
      },
      fcp: {
        enable: true,
      },
      fid: {
        enable: true,
      },
      fp: {
        enable: true,
      },
      inp: {
        enable: true,
      },
      lcp: {
        enable: true,
      },
      ttfb: {
        enable: true,
      },
    },
  },
  stayTrack: {
    enable: true,
    trackerConfig: {},
  },
  pageViewTrack: {
    enable: true,
    trackerConfig: {},
  },

  reporter: console.log, // todo
};
