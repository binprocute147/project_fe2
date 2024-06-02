import { PerspectiveCamera } from 'three';

export class Camera extends PerspectiveCamera {
  constructor() {
    super(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.position.set(0, 0, 5);
  }


  public update() {
    this.aspect = window.innerWidth / window.innerHeight;
    this.updateProjectionMatrix();
  }


}