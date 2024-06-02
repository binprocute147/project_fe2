import { Diodrama } from './Diodrama';



export class MoveController {

  private diodrama: Diodrama;
  private interval: any;
  private lastMove: string = 'ArrowUp';
  private acceptedMoves = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 's', 'a', 'd'];
  public paused: boolean = true;
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

  constructor(diodrama: Diodrama) {
    this.keyBoardListener();
    this.diodrama = diodrama;
  }

  private keyBoardListener() {
    document.addEventListener('keydown', (event) => {
      this.setLastMove(event.key);
    });
  }

  setLastMove(move: string) {
    if(this.paused)return

    if (this.acceptedMoves.includes(move)) {
      if (this.oppositeDirection.get(this.lastMove)?.includes(move) == false) {
         return this.lastMove = move;
      }
    }
  }

  startAutoMove() {
    if(this.paused == false)return
    this.interval = setInterval(() => {
      this.diodrama.snake.move(this.lastMove, this.diodrama.food);
    }, 500);
    this.paused = false;
  }

  stopAutoMove() {
    if(this.paused)return
    clearInterval(this.interval);
    this.paused = true;
  }
}