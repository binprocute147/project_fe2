import { useState } from "react"

// Định nghĩa kiểu LoaderProps cho các thuộc tính cần thiết cho quá trình tải
interface LoaderProps {
  onProgress: (url: string, itemsLoaded: number, itemsTotal: number) => void;
  onLoad: () => void;
  onError: (url: string) => void;
  onStart: (url: string, itemsLoaded: number, itemsTotal: number) => void;
  modelCount: number;
  progress: number;
}

// Hàm LoadingThreejs trả về một đối tượng có các thuộc tính và phương thức cần thiết cho quá trình tải
export const LoadingThreejs = (): LoaderProps => {
  
  // Sử dụng hook useState để lưu trạng thái isLoading, progress và modelCount
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [modelCount, setModelCount] = useState(0)

  // Phương thức onProgress được gọi khi quá trình tải đang diễn ra
  const onProgress = (url: string, itemsLoaded: number, itemsTotal: number) => {
    console.log('Loading file: ' + url)
    console.log(itemsLoaded, itemsTotal)
    // Tính toán tiến độ và cập nhật giá trị progress
    setProgress(itemsLoaded / itemsTotal * 100)
  }

  // Phương thức onLoad được gọi khi quá trình tải hoàn thành thành công
  const onLoad = () => {
    // Tăng số lượng mô hình đã tải thành công
    setModelCount(modelCount + 1)
    console.log('Loading complete!')
    // Đánh dấu là không còn tải nữa
    setIsLoading(false)
  }

  // Phương thức onError được gọi khi xảy ra lỗi trong quá trình tải
  const onError = (url: string) => {
    console.log('Error loading', url)
  }

  // Phương thức onStart được gọi khi bắt đầu quá trình tải
  const onStart = (url: string, itemsLoaded: number, itemsTotal: number) => {
    // Đánh dấu là đang trong quá trình tải
    setIsLoading(true)
  }

  // Trả về đối tượng chứa các phương thức và thuộc tính cần thiết cho quá trình tải
  return {
    onProgress,
    onLoad,
    onError,
    onStart,
    modelCount,
    progress
  }
}
