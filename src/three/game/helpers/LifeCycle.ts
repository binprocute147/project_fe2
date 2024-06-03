// Giao diện LifeCycle định nghĩa các phương thức cần thiết cho vòng đời của một đối tượng
export interface LifeCycle {
  
  // Phương thức init() để khởi tạo đối tượng
  init(): void;
  
  // Phương thức update() để cập nhật trạng thái của đối tượng
  update(): void;
  
  // Phương thức destroy() để hủy và giải phóng tài nguyên của đối tượng
  destroy(): void;
}
