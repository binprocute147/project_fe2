import { Mesh, Object3D, Vector3 } from "three";
import { LifeCycle } from "../helpers/LifeCycle";
import { Loader } from "@/three/setup/Loader";
import { SceneManager } from "@/three/setup/SceneManager";

// Lớp Food đại diện cho thức ăn trong trò chơi
export class Food implements LifeCycle {

  // Đối tượng cơ bản của thức ăn
  private BaseFood : Object3D | null;

  // Đối tượng thức ăn trong trò chơi
  public food : any;

  // Đường dẫn đến model của thức ăn
  public path: string;

  // Kích thước của thức ăn
  public sizeFood: number = 1/21;

  // Bước di chuyển của thức ăn
  public stepMove: number = 1/7;

  // Constructor của lớp Food
  constructor(path: string ) {
    this.path = path;
    this.BaseFood = null;
    this.food = null;
  }

  // Phương thức để lấy một số nguyên ngẫu nhiên
  getRandomInt() {
    return Math.floor(Math.random() * SceneManager.diodrama.sizeGrid) - Math.floor(SceneManager.diodrama.sizeGrid / 2);
  }

  // Phương thức để thiết lập các thuộc tính mặc định cho thức ăn
  private setDefaultProperties() {
    this.food = this.BaseFood?.clone();
    this.newPosition();
    this.food.scale.set(1/2, 1/2, 1/2);
    this.food.rotation.x = Math.PI / 180 * 0;
  }

  // Phương thức để thiết lập vị trí mới cho thức ăn
  public newPosition() {
    this.food.position.set(this.getRandomInt(), 0, this.getRandomInt());
  }

  // Phương thức để kiểm tra vị trí mới của thức ăn có hợp lệ hay không
  public isAvailablePosition(snakePosition: Mesh[], food: Vector3) {
    return !snakePosition.some(({position}) => position.x === food.x && position.z === food.z)
  }

  // Phương thức để tải mô hình của thức ăn
  async getModelFood() {

    if(this.BaseFood){
      this.setDefaultProperties();
    }

    const loader = SceneManager.loader;
    const model = await loader.getModel(this.path);
    this.BaseFood = model;
    this.BaseFood.traverse((obj) => {
      if (obj instanceof Mesh) {
        if(obj.name === 'Esfera_apple_0')obj.material.emissive.set('red');
        if(obj.name === 'Esfera_palo_0')obj.material.emissive.set('brown');
        if(obj.name === 'Esfera_hoja_0')obj.material.emissive.set('green');
      }
    });
    this.setDefaultProperties();
  }

  // Phương thức khởi tạo
  init() {}

  // Phương thức cập nhật
  update(): void {
    throw new Error("Method not implemented.");
  }

  // Phương thức hủy
  destroy(): void {
    throw new Error("Method not implemented.");
  }
}
