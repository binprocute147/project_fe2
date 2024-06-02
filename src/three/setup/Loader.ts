import { LoadingManager } from "three";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


interface LoaderProps {
  onProgress: (url: string, itemsLoaded: number, itemsTotal: number) => void;
  onLoad: () => void;
  onError: (url: string) => void;
  onStart: (url: string, itemsLoaded: number, itemsTotal: number) => void;
}


export class Loader extends GLTFLoader{


  constructor({onProgress, onLoad, onError, onStart}: LoaderProps) {

    const loading = new LoadingManager();

    loading.onStart = (url, itemsLoaded, itemsTotal) => {
      onStart(url, itemsLoaded, itemsTotal);
    };
    loading.onLoad = () => {
      onLoad();
    };
    loading.onError = (url) => {
      onError(url);
    };
    loading.onProgress = (url, itemsLoaded, itemsTotal) => {
      onProgress(url, itemsLoaded, itemsTotal);
    };


    super(loading);
    const draco = new DRACOLoader();
    draco.setDecoderPath( 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/' );
    draco.setDecoderConfig( { type: 'js' } );
    draco.preload();

    this.setDRACOLoader(draco);

  }

  async getComplete(path: string) {
    return await this.loadAsync(path);
  }

  async getModel(path: string) {
    const model = await this.loadAsync(path);
    return model.scene;
  }

}