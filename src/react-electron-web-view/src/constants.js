import PropTypes from 'prop-types';

export const events = [
  'load-commit',
  'did-attach',
  'did-finish-load',
  'did-fail-load',
  'did-frame-finish-load',
  'did-start-loading',
  'did-stop-loading',
  'did-get-response-details',
  'did-get-redirect-request',
  'dom-ready',
  'page-title-set', // deprecated event
  'page-title-updated',
  'page-favicon-updated',
  'enter-html-full-screen',
  'leave-html-full-screen',
  'console-message',
  'found-in-page',
  'new-window',
  'will-navigate',
  'did-navigate',
  'did-navigate-in-page',
  'close',
  'ipc-message',
  'crashed',
  'gpu-crashed',
  'plugin-crashed',
  'destroyed',
  'media-started-playing',
  'media-paused',
  'did-change-theme-color',
  'update-target-url',
  'devtools-opened',
  'devtools-closed',
  'devtools-focused',
];

export const methods = [
  'loadURL',
  'getURL',
  'getTitle',
  'isLoading',
  'isWaitingForResponse',
  'stop',
  'reload',
  'reloadIgnoringCache',
  'canGoBack',
  'canGoForward',
  'canGoToOffset',
  'clearHistory',
  'goBack',
  'goForward',
  'goToIndex',
  'goToOffset',
  'isCrashed',
  'setUserAgent',
  'getUserAgent',
  'insertCSS',
  'executeJavaScript',
  'openDevTools',
  'closeDevTools',
  'isDevToolsOpened',
  'isDevToolsFocused',
  'inspectElement',
  'inspectServiceWorker',
  'setAudioMuted',
  'isAudioMuted',
  'undo',
  'redo',
  'cut',
  'copy',
  'paste',
  'pasteAndMatchStyle',
  'delete',
  'selectAll',
  'unselect',
  'replace',
  'replaceMisspelling',
  'insertText',
  'findInPage',
  'stopFindInPage',
  'print',
  'printToPDF',
  'capturePage',
  'send',
  'sendInputEvent',
  'setZoomFactor',
  'setZoomLevel',
  'showDefinitionForSelection',
  'getWebContents',
  'focus',
];

export const props = {
  src: PropTypes.string,
  autosize: PropTypes.bool,
  nodeintegration: PropTypes.bool,
  plugins: PropTypes.bool,
  preload: PropTypes.string,
  httpreferrer: PropTypes.string,
  useragent: PropTypes.string,
  disablewebsecurity: PropTypes.bool,
  partition: PropTypes.string,
  allowpopups: PropTypes.bool,
  webpreferences: PropTypes.string,
  blinkfeatures: PropTypes.string,
  disableblinkfeatures: PropTypes.string,
  guestinstance: PropTypes.number,
  disableguestresize: PropTypes.bool,
  devtools: PropTypes.bool,
  muted: PropTypes.bool,
};

export const changableProps = {
  src: '__USE_ATTR__',
  useragent: 'setUserAgent',
  guestinstance: '__USE_ATTR__',
  devtools: 'setDevTools',
  muted: 'setAudioMuted',
};
