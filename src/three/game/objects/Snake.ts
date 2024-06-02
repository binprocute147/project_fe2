import { Mesh, MeshBasicMaterial, Vector3 } from "three";
import { LifeCycle } from "../helpers/LifeCycle";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import { SceneManager } from "@/three/setup/SceneManager";
import { Food } from './Food';
import { GameState } from "../helpers/GameState";



export class Snake implements LifeCycle {


  public body: Mesh[] = []
  private geometry : RoundedBoxGeometry = new RoundedBoxGeometry(1, 1, 1);
  private material : MeshBasicMaterial = new MeshBasicMaterial({ color: 'blue'});
  public head: Mesh = new Mesh(this.geometry, new MeshBasicMaterial({ color: 'red'})); 
  public tail : Mesh = new Mesh(this.geometry, this.material);
  public lastMove : string = 'ArrowUp';
  private iCanEat : boolean = false;
  private lastTailPosition = this.tail.position
  private cubeSize = 1;
  private gridLimit = 0
  private oppositeDirection = new Map<string, string[]>(
    [
      ['ArrowUp', ['ArrowDown', 's']],
      ['ArrowDown', ['ArrowUp', 'w']],
      ['ArrowLeft', ['ArrowRight', 'd']],
      ['ArrowRight', ['ArrowLeft', 'a']],
      ['w', ['s', 'ArrowDown']],
      ['s', ['w', 'ArrowUp']],
      ['a', ['d', 'ArrowRight']],
      ['d', ['a', 'ArrowLeft']],
    ]
  )


  public static instance: Snake;

  public static getInstance(limit: number) {
    if (!Snake.instance) {
      Snake.instance = new Snake(limit);
    }

    return Snake.instance;
  }

  private constructor(limit: number) {
    this.gridLimit = Math.floor(limit / 2);
    this.init();
  }

  public init() {

    this.body = [];


    const item1 = new Mesh(this.geometry, this.material);
    this.tail.scale.set(this.cubeSize, this.cubeSize, this.cubeSize);
    this.tail.position.set(0, 0, 2);
    this.tail.name = 'tail';

    item1.scale.set(this.cubeSize, this.cubeSize, this.cubeSize);
    item1.position.set(0, 0, 1);
    item1.name = 'body';
    
    this.head.scale.set(this.cubeSize, this.cubeSize, this.cubeSize);
    this.head.position.set(0, 0, 0);
    this.head.name = 'head';


    this.body.push(item1, this.tail);
    
  }

  public update() {
    
  }

  public removeBody() {
    this.body.forEach((m: Mesh) => SceneManager.mainGroup.remove(m));
  }

  public addBody() {
    this.body.forEach((m: Mesh) => SceneManager.mainGroup.add(m));
  }
  

  private eat(food: Food) {
    this.iCanEat = false;
    SceneManager.mainGroup.remove(food.food);
    SceneManager.diodrama.food.newPosition();
    
    
    let generatedPositions = new Set();
    let flagFinish = false;
    
    this.addTail();

    while(!SceneManager.diodrama.food.isAvailablePosition([this.head, ...this.body], SceneManager.diodrama.food.food.position)) {
      if((generatedPositions.size) >= SceneManager.diodrama.sizeGrid * SceneManager.diodrama.sizeGrid - SceneManager.diodrama.snake.body.length) flagFinish = true;
      if(flagFinish) break;
      const post = SceneManager.diodrama.food.food.position;
      const key = `[${post.x}]-[${post.z}]`;

      SceneManager.diodrama.food.newPosition();
      if(generatedPositions.has(key)) {
        console.log('repetido', key);
        continue;
      };
      generatedPositions.add(key);
    }
    
    if(flagFinish) {
      this.addTail();
      SceneManager.winGame();
      return
    }
    
    SceneManager.mainGroup.add(food.food);
  }

  private addTail() {
    const tailPosition = this.lastTailPosition
    const newTail = this.tail.clone();
    newTail.position.set(tailPosition.x, tailPosition.y, tailPosition.z);
    SceneManager.diodrama.snake.body.push(newTail);
    SceneManager.mainGroup.add(newTail);
    this.tail = newTail;
  }

  private canIEat(foodPosition: Vector3) {
    return this.head.position.x === foodPosition.x && this.head.position.z === foodPosition.z;
  }

  public move(direction : string, food: Food) {
    const currentPosition = new Vector3(this.head.position.x, this.head.position.y, this.head.position.z);
    const newPosition = new Vector3(this.head.position.x, this.head.position.y, this.head.position.z)

    
    if (['ArrowUp', 'w'].includes(direction)) {
      newPosition.z = currentPosition.z - 1;
    } else if ([ 'ArrowDown', 's'].includes(direction)) {
      newPosition.z = currentPosition.z + 1;
    } else if ([ 'ArrowLeft', 'a'].includes(direction)) {
      newPosition.x = currentPosition.x - 1;
    } else if ([ 'ArrowRight', 'd'].includes(direction)) {
      newPosition.x = currentPosition.x + 1;
    }

    this.lastMove = direction;
    if(this.ICrash(newPosition.x, newPosition.z)){
      SceneManager.gameOver();
      return;
    }
    this.head.position.set(newPosition.x, newPosition.y, newPosition.z);

    if(this.canIEat(food.food.position)) this.iCanEat = true;
    if (this.iCanEat) this.lastTailPosition = this.tail.position.clone();

    this.followHead(currentPosition);
    if (this.iCanEat) this.eat(food);
  }

  private ICrash(x: number, z: number) {
    if (x > this.gridLimit || x < -(this.gridLimit)) return true
    if (z > this.gridLimit || z < -(this.gridLimit)) return true;
    const h = this.head.position;
    return this.body.some((m: Mesh) => m.position.x === h.x && m.position.z === h.z)
  }

  private followHead(headPosition: Vector3) {
    for(let i = 0; i < this.body.length; i++) {
      const currentPosition = new Vector3(this.body[i].position.x, this.body[i].position.y, this.body[i].position.z);
      this.body[i].position.set(headPosition.x, headPosition.y, headPosition.z);
      headPosition.set(currentPosition.x, currentPosition.y, currentPosition.z);
    }
  }

  destroy(): void {
    throw new Error("Method not implemented.");
  }
}