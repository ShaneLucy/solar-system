import { WebGLRenderer, sRGBEncoding } from 'three';

export default (canvas: HTMLCanvasElement): WebGLRenderer => {
  const renderer = new WebGLRenderer({
    canvas
  });

  renderer.outputEncoding = sRGBEncoding;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  return renderer;
};
