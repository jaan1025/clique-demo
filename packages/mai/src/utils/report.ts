export type Payload = Record<string, any>;

export const logReport = (type: string, payload: Payload) => {
  console.log({
    type,
    payload,
  });
};

export const beaconReport = (type: string, payload: Payload) => {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/report",
      JSON.stringify({
        type,
        payload,
      })
    );
  } else {
    console.log("host not support beacon api");
  }
};
