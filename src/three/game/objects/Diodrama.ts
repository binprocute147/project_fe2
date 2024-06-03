import { GridHelper } from "three";
import { LifeCycle } from "../helpers/LifeCycle";
import { Food } from "./Food";
import { Snake } from "./Snake";
import { GameState } from '../helpers/GameState';

// Lớp Diodrama đại diện cho môi trường của trò chơi
export class Diodrama implements LifeCycle {

  // Đối tượng food - thức ăn trong trò chơi
  public food : Food;

  // Đối tượng snake - con rắn trong trò chơi
  public snake : Snake;

  // Điểm số trong trò chơi
  public score : number = 0;

  // Kích thước của lưới trò chơi
  public sizeGrid : number = 7;

  // Lưới hiển thị trên màn hình
  public grid: GridHelper = new GridHelper(this.sizeGrid, this.sizeGrid, 0x0000ff, 0x808080);

  // Trạng thái hiện tại của trò chơi
  public state : GameState = GameState.PAUSED;

  // Constructor của lớp Diodrama
  constructor() {
    this.food = new Food("/apple.glb");
    this.food.init();
    this.snake = Snake.getInstance(this.sizeGrid);
  }

  // Phương thức để dừng trò chơi
  public stopGame(fn: Function) {
    fn()
    this.state = GameState.PAUSED;
  }

  // Phương thức để bắt đầu trò chơi
  public startGame(fn: Function) {
    fn()
    this.state = GameState.PLAYING;
  }

  // Phương thức để khởi động lại trò chơi
  public restartGame(){

    this.state = GameState.PAUSED
    this.score = 0;

    this.snake.removeBody();
    this.snake.init();
    this.snake.addBody();
    this.food.newPosition();
  } 

  // Phương thức khởi tạo
  public async init() {
    this.grid.position.set(0, 0, 0);
    this.grid.scale.set(1, 1, 1);
    this.grid.rotation.x = Math.PI / 180 * 0;
    await this.food.getModelFood()
  }

  // Phương thức cập nhật
  public update() {
    
  }

  // Phương thức hủy
  destroy(): void {
    throw new Error("Method not implemented.");
  }

}
