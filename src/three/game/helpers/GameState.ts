// Enum GameState định nghĩa các trạng thái khác nhau của trò chơi
export enum GameState {
  // Trạng thái khi trò chơi đang diễn ra
  PLAYING = 'playing',
  
  // Trạng thái khi trò chơi bị tạm dừng
  PAUSED = 'paused',
  
  // Trạng thái khi trò chơi kết thúc do người chơi thua
  GAME_OVER = 'game over',
  
  // Trạng thái khi người chơi thắng trò chơi
  WIN = 'win'
}
