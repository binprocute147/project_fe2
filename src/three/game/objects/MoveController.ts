import { Diodrama } from './Diodrama';

// Class MoveController quản lý việc di chuyển của con rắn
export class MoveController {

  // Biến diodrama chứa thông tin về trò chơi (Diodrama)
  private diodrama: Diodrama;

  // Biến interval để quản lý việc cập nhật di chuyển tự động
  private interval: any;

  // Hướng di chuyển cuối cùng
  private lastMove: string = 'ArrowUp';

  // Danh sách các phím được chấp nhận cho việc di chuyển
  private acceptedMoves = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 's', 'a', 'd'];

  // Biến kiểm tra trạng thái tạm dừng
  public paused: boolean = true;

  // Ánh xạ các hướng di chuyển ngược lại nhau
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

  // Constructor của MoveController
  constructor(diodrama: Diodrama) {
    // Lắng nghe sự kiện từ bàn phím
    this.keyBoardListener();
    // Khởi tạo diodrama
    this.diodrama = diodrama;
  }

  // Lắng nghe sự kiện từ bàn phím
  private keyBoardListener() {
    document.addEventListener('keydown', (event) => {
      this.setLastMove(event.key);
    });
  }

  // Đặt hướng di chuyển cuối cùng dựa trên sự kiện từ bàn phím
  setLastMove(move: string) {
    // Nếu trạng thái là tạm dừng thì không thực hiện gì
    if(this.paused) return;

    // Nếu phím nhấn là một trong các phím được chấp nhận
    if (this.acceptedMoves.includes(move)) {
      // Nếu hướng di chuyển mới không trái ngược với hướng di chuyển cũ
      if (this.oppositeDirection.get(this.lastMove)?.includes(move) == false) {
        // Cập nhật hướng di chuyển cuối cùng
        return this.lastMove = move;
      }
    }
  }

  // Bắt đầu di chuyển tự động của con rắn
  startAutoMove() {
    // Nếu trạng thái không phải là tạm dừng thì không thực hiện gì
    if(this.paused == false) return;

    // Tạo một interval để thực hiện di chuyển tự động mỗi 500ms
    this.interval = setInterval(() => {
      this.diodrama.snake.move(this.lastMove, this.diodrama.food);
    }, 500);

    // Cập nhật trạng thái sang không tạm dừng
    this.paused = false;
  }

  // Dừng di chuyển tự động của con rắn
  stopAutoMove() {
    // Nếu trạng thái là tạm dừng thì không thực hiện gì
    if(this.paused) return;

    // Xóa interval hiện tại
    clearInterval(this.interval);

    // Cập nhật trạng thái sang tạm dừng
    this.paused = true;
  }
}
