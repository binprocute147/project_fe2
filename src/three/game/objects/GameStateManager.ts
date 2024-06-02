import { GameState } from "../helpers/GameState";

export class GameStateManager  {
  public  status : GameState = GameState.PAUSED;

  public  changeStatus(status: GameState){
    this.status = status;
  }

  public  isPlaying(){
    return this.status === GameState.PLAYING;
  }

  public  isPaused(){
    return this.status === GameState.PAUSED;
  }

  public  isGameOver(){
    return this.status === GameState.GAME_OVER;
  }

  public  isWin(){
    return this.status === GameState.WIN;
  }

  public  restartGame(){
    this.status = GameState.PAUSED;
  }

  


}