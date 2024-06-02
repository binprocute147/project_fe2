import { SceneManager } from "@/three/setup/SceneManager"

interface InitMenuProps {
  setSeconds: React.Dispatch<React.SetStateAction<number>>
  setStart: React.Dispatch<React.SetStateAction<boolean>>
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
  showMenu: boolean
}


const StartCountDown = ({setSeconds, setShowMenu, setStart, showMenu}: InitMenuProps) => {

  const startGame = () => {
    SceneManager.startGame()
    setStart(true)
  }


  const initCountdown = () => {
    setShowMenu(false)
    const ms = new Date().getTime()
    const interval = setInterval(() => {

      const now = new Date().getTime()
      const distance = now - ms
      const sec = Math.floor((distance % (1000 * 60)) / 1000)

      setSeconds(3 - sec)
      if (sec >= 3) {
        clearInterval(interval)
        startGame()
        setSeconds(3)
      }
    }, 1000)
  }


  return {initCountdown, showMenu, startGame}
}

export default StartCountDown