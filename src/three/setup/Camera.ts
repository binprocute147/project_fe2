import { PerspectiveCamera } from 'three';

// Lớp Camera mở rộng từ PerspectiveCamera để thiết lập và quản lý camera
export class Camera extends PerspectiveCamera {

  // Hàm khởi tạo của lớp Camera
  constructor() {
    // Gọi hàm khởi tạo của lớp cha PerspectiveCamera với các tham số:
    // 45 - góc nhìn theo độ (field of view)
    // window.innerWidth / window.innerHeight - tỷ lệ khung hình (aspect ratio)
    // 0.1 - cận cảnh (near clipping plane)
    // 1000 - viễn cảnh (far clipping plane)
    super(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Thiết lập vị trí của camera trong không gian 3D
    this.position.set(0, 0, 5);
  }

  // Phương thức cập nhật tỷ lệ khung hình và ma trận chiếu của camera khi thay đổi kích thước cửa sổ
  public update() {
    // Cập nhật tỷ lệ khung hình theo kích thước hiện tại của cửa sổ
    this.aspect = window.innerWidth / window.innerHeight;
    // Cập nhật ma trận chiếu để phản ánh các thay đổi mới
    this.updateProjectionMatrix();
  }
}
