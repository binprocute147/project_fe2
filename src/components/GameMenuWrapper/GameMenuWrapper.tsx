import './style.css'
import { FunctionComponent } from 'react'

// Định nghĩa kiểu GameMenuProps cho thuộc tính children
interface GameMenuProps {
  children: React.ReactNode; // Nội dung con của thành phần
}

// Component GameMenuWrapper là một Functional Component nhận props và hiển thị giao diện tương ứng
export const GameMenuWrapper: FunctionComponent<GameMenuProps> = ({ children }) => {
  return (
    // Hiển thị một container chứa nội dung con được truyền vào
    <div className='menu-container'>
      {children} 
    </div>
  )
}
