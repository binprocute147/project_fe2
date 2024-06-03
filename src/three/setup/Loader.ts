import { LoadingManager } from "three";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Interface định nghĩa các thuộc tính cần thiết cho việc tải tài nguyên
interface LoaderProps {
  onProgress: (url: string, itemsLoaded: number, itemsTotal: number) => void;
  onLoad: () => void;
  onError: (url: string) => void;
  onStart: (url: string, itemsLoaded: number, itemsTotal: number) => void;
}

// Lớp Loader mở rộng từ GLTFLoader để tải mô hình 3D và quản lý quá trình tải
export class Loader extends GLTFLoader {

  // Hàm khởi tạo của lớp Loader
  constructor({ onProgress, onLoad, onError, onStart }: LoaderProps) {

    // Khởi tạo LoadingManager để quản lý các sự kiện tải
    const loading = new LoadingManager();

    // Gán các callback vào LoadingManager
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

    // Gọi hàm khởi tạo của lớp cha GLTFLoader với LoadingManager
    super(loading);

    // Khởi tạo và cấu hình DRACOLoader để nén và giải nén mô hình 3D
    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/'); // Đường dẫn đến thư viện giải mã Draco
    draco.setDecoderConfig({ type: 'js' }); // Cấu hình bộ giải mã
    draco.preload(); // Tải trước bộ giải mã

    // Thiết lập DRACOLoader cho GLTFLoader
    this.setDRACOLoader(draco);
  }

  // Phương thức tải hoàn chỉnh một mô hình GLTF và trả về đối tượng GLTF
  async getComplete(path: string) {
    return await this.loadAsync(path);
  }

  // Phương thức tải mô hình GLTF và trả về đối tượng Scene của mô hình
  async getModel(path: string) {
    const model = await this.loadAsync(path);
    return model.scene;
  }
}
