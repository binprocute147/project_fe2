import { WebGLRenderer } from "three";
import { SceneManager } from "./SceneManager";

// Interface để định nghĩa các thuộc tính cần thiết cho việc tải tài nguyên
interface LoaderProps {
  onProgress: (url: string, itemsLoaded: number, itemsTotal: number) => void;
  onLoad: () => void;
  onError: (url: string) => void;
  onStart: (url: string, itemsLoaded: number, itemsTotal: number) => void;
}

// Lớp Render quản lý quá trình render và khởi tạo WebGLRenderer
export class Render {

  // Khai báo thuộc tính tĩnh của lớp Render
  public static instance: Render;
  private renderer: WebGLRenderer;

  // Hàm khởi tạo của lớp Render, được gọi chỉ một lần
  private constructor(props: LoaderProps) {
    // Khởi tạo SceneManager với các thuộc tính tải
    SceneManager.init(props);
    // Khởi tạo WebGLRenderer
    this.renderer = this.init();
    // Thiết lập lắng nghe sự kiện thay đổi kích thước cửa sổ
    this.onResize();
  }

  // Phương thức khởi tạo WebGLRenderer
  private init() {
    const renderer = new WebGLRenderer({
      antialias: true, // Kích hoạt khử răng cưa
      alpha: true, // Kích hoạt hỗ trợ trong suốt
      canvas: document.querySelector('#three') as HTMLCanvasElement // Sử dụng canvas có id 'three'
    });
    renderer.setSize(window.innerWidth, window.innerHeight); // Thiết lập kích thước renderer
    renderer.setPixelRatio(window.devicePixelRatio); // Thiết lập tỷ lệ điểm ảnh
    renderer.setClearColor(0x000000, 0); // Thiết lập màu nền và độ trong suốt
    return renderer;
  }

  // Phương thức bắt đầu vòng lặp render
  public loop() {
    this.renderer.render(SceneManager.scene, SceneManager.camera); // Render cảnh với camera của SceneManager
    requestAnimationFrame(this.loop.bind(this)); // Gọi lại loop trong frame tiếp theo
  }

  // Phương thức thiết lập lắng nghe sự kiện thay đổi kích thước cửa sổ
  public onResize() {
    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight); // Cập nhật kích thước renderer khi cửa sổ thay đổi kích thước
      SceneManager.camera.update(); // Cập nhật camera của SceneManager
    });
  }

  // Phương thức lấy renderer hiện tại
  public getRenderer(): WebGLRenderer {
    return this.renderer;
  }

  // Phương thức lấy instance duy nhất của lớp Render
  public static getInstance(props: LoaderProps): Render {
    if (!Render.instance) {
      Render.instance = new Render(props);
    }
    return Render.instance;
  }
}
