const fixFontRendering = () => {
  const isChrome = navigator.userAgent.indexOf("Chrome") > -1;
  const isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
  const isSafari = isChrome && navigator.userAgent.indexOf("Safari") > -1;
  const isMac = navigator.userAgent.indexOf("Mac OS") !== -1;
  const isWindows = !isMac;
  // TODO: Handle the following:
  // let isOpera = navigator.userAgent.indexOf('Presto') > -1;
  // let isExplorer = navigator.userAgent.indexOf('MSIE') > -1;

  if (isSafari || isWindows) {
    const body = document.getElementsByTagName("body")[0];
    body.style["-webkit-text-stroke"] = "1.6px";
    body.style["font-weight"] = "400";
  }

  if (isFirefox) {
    const body = document.getElementsByTagName("body")[0];
    body.style["-webkit-text-stroke"] = "1px";
    body.style["font-weight"] = "bold";
  }
};

export default fixFontRendering;
