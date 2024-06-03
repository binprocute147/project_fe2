import { SceneManager } from "@/three/setup/SceneManager"

// Định nghĩa kiểu InitMenuProps cho các thuộc tính cần thiết để khởi tạo menu
interface InitMenuProps {
  setSeconds: React.Dispatch<React.SetStateAction<number>>
  setStart: React.Dispatch<React.SetStateAction<boolean>>
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
  showMenu: boolean
}

// Hàm StartCountDown nhận vào các thuộc tính từ InitMenuProps
const StartCountDown = ({ setSeconds, setShowMenu, setStart, showMenu }: InitMenuProps) => {

  // Hàm startGame gọi phương thức startGame từ SceneManager và thiết lập trạng thái bắt đầu trò chơi
  const startGame = () => {
    SceneManager.startGame()
    setStart(true)
  }

  // Hàm initCountdown khởi tạo đồng hồ đếm ngược để bắt đầu trò chơi
  const initCountdown = () => {
    setShowMenu(false) // Ẩn menu khi bắt đầu đếm ngược
    const ms = new Date().getTime() // Lấy thời gian hiện tại
    const interval = setInterval(() => { // Thiết lập interval để đếm ngược mỗi giây

      const now = new Date().getTime() // Lấy thời gian hiện tại trong vòng lặp
      const distance = now - ms // Tính khoảng cách thời gian đã trôi qua
      const sec = Math.floor((distance % (1000 * 60)) / 1000) // Chuyển đổi thời gian đã trôi qua thành giây

      setSeconds(3 - sec) // Cập nhật số giây còn lại
      if (sec >= 3) { // Kiểm tra nếu đã hết thời gian đếm ngược
        clearInterval(interval) // Xóa interval khi đếm ngược kết thúc
        startGame() // Bắt đầu trò chơi
        setSeconds(3) // Đặt lại số giây đếm ngược
      }
    }, 1000)
  }

  // Trả về các hàm và trạng thái cần thiết
  return { initCountdown, showMenu, startGame }
}

// Xuất mặc định hàm StartCountDown
export default StartCountDown
