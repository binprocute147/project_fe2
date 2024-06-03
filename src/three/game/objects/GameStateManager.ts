import { GameState } from "../helpers/GameState";

// Lớp quản lý trạng thái của trò chơi
export class GameStateManager  {

  // Trạng thái hiện tại của trò chơi
  public  status : GameState = GameState.PAUSED;

  // Phương thức để thay đổi trạng thái của trò chơi
  public  changeStatus(status: GameState){
    this.status = status;
  }

  // Phương thức kiểm tra xem trò chơi đang diễn ra hay không
  public  isPlaying(){
    return this.status === GameState.PLAYING;
  }

  // Phương thức kiểm tra xem trò chơi đã tạm dừng hay chưa
  public  isPaused(){
    return this.status === GameState.PAUSED;
  }

  // Phương thức kiểm tra xem trò chơi đã kết thúc hay chưa
  public  isGameOver(){
    return this.status === GameState.GAME_OVER;
  }

  // Phương thức kiểm tra xem trò chơi đã chiến thắng hay chưa
  public  isWin(){
    return this.status === GameState.WIN;
  }

  // Phương thức để khởi động lại trò chơi
  public  restartGame(){
    this.status = GameState.PAUSED;
  }
}
