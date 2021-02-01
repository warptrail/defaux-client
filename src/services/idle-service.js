let _timeoutId;
let _idleCallback = null;
const _notIdleEvents = [
  'mousedown',
  'mousemove',
  'keypress',
  'scroll',
  'touchstart'
];
// const _FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
const _THREE_HOURS_IN_MS = 3 * 60 * 60 * 1000;

const IdleService = {
  setIdleCallback(idleCallback) {
    _idleCallback = idleCallback;
  },
  resetIdleTimer(ev) {
    clearTimeout(_timeoutId);
    _timeoutId = setTimeout(_idleCallback, _THREE_HOURS_IN_MS);
  },
  registerIdleTimerResets() {
    _notIdleEvents.forEach((event) =>
      document.addEventListener(event, IdleService.resetIdleTimer, true)
    );
  },
  unRegisterIdleResets() {
    clearTimeout(_timeoutId);
    _notIdleEvents.forEach((event) =>
      document.removeEventListener(event, IdleService.resetIdleTimer, true)
    );
  }
};

export default IdleService;
