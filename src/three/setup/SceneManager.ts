import { Camera } from "./Camera";
import { Clock, DoubleSide, Group, HemisphereLight, LoadingManager, Mesh, MeshLambertMaterial, Scene, SphereGeometry, TextureLoader} from 'three';
import { Diodrama } from '../game/objects/Diodrama';
import { Loader } from "./Loader";
import { MoveController } from "../game/objects/MoveController";
import { GameStateManager } from "../game/objects/GameStateManager";
import { GameState } from "../game/helpers/GameState";

interface LoaderProps {
  onProgress: (url: string, itemsLoaded: number, itemsTotal: number) => void;
  onLoad: () => void;
  onError: (url: string) => void;
  onStart: (url: string, itemsLoaded: number, itemsTotal: number) => void;
}

interface LoaderTextureProps {
  onProgress: (url: string, itemsLoaded: number, itemsTotal: number) => void;
  onLoad: () => void;
  onStart: (url: string, itemsLoaded: number, itemsTotal: number) => void;
}

export class SceneManager {
  
  public static camera : Camera
  public static scene : Scene
  public static diodrama : Diodrama
  public static mainGroup : Group = new Group();
  public static loader : Loader
  public static control: MoveController;
  public static state : GameStateManager;
  public static setState: Function;



  
  public static init(props:LoaderProps) {

    console.log('SceneManager init', props)

    SceneManager.loader = new Loader(props);
    SceneManager.camera = new Camera();
    SceneManager.scene = new Scene();

    SceneManager.state = new GameStateManager();
    SceneManager.createDiodrama();
    SceneManager.createLight()
    SceneManager.setSkyBox(SceneManager.getLoadingManager(props));
    SceneManager.resize();
    SceneManager.setSizes();
    SceneManager.control = new MoveController(SceneManager.diodrama);
  }


  private static getLoadingManager(props: LoaderProps) {

    const loading = new LoadingManager();

    loading.onStart = (url, itemsLoaded, itemsTotal) => {
      props.onStart(url, itemsLoaded, itemsTotal);
    };
    loading.onLoad = () => {
      props.onLoad();
    };
    loading.onProgress = (url, itemsLoaded, itemsTotal) => {
      props.onProgress(url, itemsLoaded, itemsTotal);
    };

    loading.onError = (url) => {
      props.onError(url);
    }


    return loading;
  }

  public static async setSkyBox(load: LoadingManager) {
    const texture = new TextureLoader(load).load('/textures/space.jpeg')
    const skyBox = new Mesh(
      new SphereGeometry(100, 100, 100),
      new MeshLambertMaterial({map: texture, side: DoubleSide})
    );
    skyBox.scale.set(-1, 1, 1);
    skyBox.rotation.x = Math.PI / 180 * 90;
    skyBox.rotation.y = Math.PI / 180 * 180;
    SceneManager.scene.add(skyBox);

    const clock = new Clock();
    function animateSkyBoxRotation() {
      const delta = clock.getDelta();
      skyBox.rotation.y += 0.05 * delta;
    }

    function animateLoopRotation() {
      requestAnimationFrame(animateLoopRotation);
      animateSkyBoxRotation();
    }

    animateLoopRotation();

  }

  private static resize() {
    window.addEventListener('resize', () => {
      this.setSizes()
    });

  }

  private static setSizes() {
    if(window.innerWidth < 860) {
      SceneManager.camera.position.set(0, 30, 20);
      SceneManager.mainGroup.position.set(0, 4, -4);
      SceneManager.mainGroup.rotation.x = Math.PI / 180 * 0
      SceneManager.camera.lookAt(0, 0,0)
    }
    else{
      SceneManager.camera.position.set(0, 30, 0);
      SceneManager.mainGroup.rotation.x = Math.PI / 180 * -50;
      this.camera.lookAt(SceneManager.mainGroup.position)
    }
    SceneManager.mainGroup.rotation.y = Math.PI / 180 * 45; 
  }

  private static createLight() {
    if (!SceneManager.scene) throw new Error('Scene not initialized');
    const light = new HemisphereLight(0xffffbb, 0x080820, 1);
    SceneManager.scene.add(light);
  }

  private static async createDiodrama() {
    if (!SceneManager.scene) throw new Error('Scene not initialized');
    SceneManager.diodrama = new Diodrama();
    await SceneManager.diodrama.init();

    SceneManager.mainGroup.add(SceneManager.diodrama.snake.head);

    SceneManager.mainGroup.add(SceneManager.diodrama.grid);
    SceneManager.mainGroup.add(SceneManager.diodrama.food.food);
    SceneManager.diodrama.snake.addBody();

    const clock = new Clock();
    function animateGroupRotation() {
      const delta = clock.getDelta();
      SceneManager.mainGroup.rotation.y += 0.3 * delta;
    }

    const animateLoopRotation = () => {
      requestAnimationFrame(animateLoopRotation);
      animateGroupRotation();
    }
    //animateLoopRotation();
  
  

    SceneManager.scene.add(SceneManager.mainGroup);
  }

  public static restartGame() {
    SceneManager.diodrama.restartGame();
    SceneManager.control = new MoveController(SceneManager.diodrama);
  }

  public static startGame() {
    SceneManager.diodrama.startGame(() => {
      SceneManager.setState(GameState.PLAYING);
      SceneManager.control.startAutoMove();
    });
  }

  private static stopGame() {
    SceneManager.diodrama.stopGame(() => {
      SceneManager.control.stopAutoMove();
    });
  }

  public static winGame() {
    SceneManager.stopGame();
    SceneManager.setState(GameState.WIN);
  }

  public static gameOver() {
    SceneManager.stopGame();
    SceneManager.setState(GameState.GAME_OVER);
  }

  public static pauseGame() {
    SceneManager.stopGame();
    SceneManager.setState(GameState.PAUSED);
  }

  public static setLastMove(move: string) {
    SceneManager.control.setLastMove(move);
  }


}