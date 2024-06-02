import {  WebGLRenderer } from "three";
import { SceneManager } from "./SceneManager";

interface LoaderProps {
  onProgress: (url: string, itemsLoaded: number, itemsTotal: number) => void;
  onLoad: () => void;
  onError: (url: string) => void;
  onStart: (url: string, itemsLoaded: number, itemsTotal: number) => void;
}


export class Render  {

  public static instance: Render;
  private renderer: WebGLRenderer;

  private constructor(props: LoaderProps) {
    SceneManager.init(props);
    this.renderer = this.init();
    this.onResize();
  }

  private init() {
    const renderer = new WebGLRenderer(
      { antialias: true, 
        alpha: true, 
        canvas: document.querySelector('#three') as HTMLCanvasElement
      }
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    return renderer
  }

  public loop() {
    this.renderer.render(SceneManager.scene, SceneManager.camera);
    requestAnimationFrame(this.loop.bind(this));
  }

  public onResize() {
    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      SceneManager.camera.update();
    });
  }

  public getRenderer(): WebGLRenderer {
    return this.renderer;
  }

  public static getInstance(props: LoaderProps): Render {
    if (!Render.instance) {
      Render.instance = new Render(props);
    }
    return Render.instance;
  }

}