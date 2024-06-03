import './style.css'

// Định nghĩa kiểu LoadingViewProps cho các thuộc tính count và percent
interface LoadingViewProps {
  count: number; 
  percent: number; 
}

// Component LoadingView nhận các thuộc tính count và percent và hiển thị giao diện tương ứng
const LoadingView = ({ count, percent }: LoadingViewProps) => {
  return (
    <div className='loading'>
      {/* Hiển thị văn bản "Loading..." */}
      <p className='text'>Loading...</p>
      {/* Hiển thị tiến trình tải dưới dạng thanh tiến trình */}
      <div className="progress-bar">
        {/* Thanh tiến trình tiếp tục mở rộng theo phần trăm tiến độ */}
        <div className="progress" style={{ width: `${percent}%` }}></div>
      </div>
      {/* Hiển thị số lượng mô hình đã tải */}
      <p className='count'>{count} Models Loaded</p>
    </div>
  )
}

export default LoadingView
