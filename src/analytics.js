import ReactGA from "react-ga4";

function init() {
  // Enable debug mode on the local development environment
  if (process.env.ANALYTICS_TRACKING_ID) {
    const isDev =
      !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    ReactGA.initialize(process.env.ANALYTICS_TRACKING_ID, { debug: isDev });
  }
}

function sendEvent(payload) {
  ReactGA.event(payload);
}

function sendPageview(path) {
  ReactGA.set({ page: path });
  ReactGA.send(path);
}

export default {
  init,
  sendEvent,
  sendPageview,
};
