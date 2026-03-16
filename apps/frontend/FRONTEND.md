PROJECT DOCUMENTATION: AI FINANCIAL ASSISTANT (FRONTEND MVP)
1. YÊU CẦU MÔI TRƯỜNG
Node.js (khuyến nghị v18 trở lên)

Expo CLI

App Expo Go (trên điện thoại) hoặc Simulator/Emulator (Android/iOS)

2. LỆNH TERMINAL KHỞI CHẠY
Mở terminal tại thư mục gốc của dự án và chạy các lệnh sau:

Bash
# 1. Cài đặt các package phụ thuộc (bao gồm liquid-glass, lucide-react-native...)
npm install

# 2. Khởi chạy server Expo
npx expo start

# 3. Xóa cache nếu gặp lỗi UI hoặc lỗi thư viện không nhận
npx expo start -c
3. CẤU TRÚC THƯ MỤC CHÍNH
Dự án được viết bằng React Native (Expo) + TypeScript. Dưới đây là các file quan trọng nhất cần nắm:

Plaintext
src/
├── components/
│   ├── ActionButtons/      # Component render các nút bấm Neon (Plan A, Plan B, Accept...)
│   ├── ChatBubble/         # Bong bóng chat của User (Gradient) và AI (Dark/Glass)
│   └── FinancialChart/     # Biểu đồ dòng tiền (Cash Flow) với hiệu ứng Liquid Glass
├── screens/
│   ├── AgentScreen/        # Màn hình chính (Phòng chat AI) chứa input, list message
│   └── DashboardScreen/    # Màn hình tổng quan (chứa biểu đồ và thẻ Goal)
├── coordinator/
│   ├── types.ts            # (QUAN TRỌNG) Định nghĩa API Contract / TypeScript Interfaces
│   ├── mockData.ts         # Dữ liệu giả lập (Lịch sử chat, kịch bản Replan, Cash flow)
│   └── chatCoordinator.ts  # Các hàm xử lý logic và chuẩn bị bắn data lên BE
└── theme.ts                # File định nghĩa biến màu Neon, Gradient, Background
4. LUỒNG DATA
A. Luồng tải lịch sử Chat
File: chatCoordinator.ts -> Hàm getChatSession(sessionId)

Hiện tại: Đang return dữ liệu tĩnh từ mockData.ts.

Nhiệm vụ BE: Đổi thành lệnh fetch(GET /api/chat/session).

B. Luồng gửi tin nhắn text
File: chatCoordinator.ts -> Hàm postChatMessage(payload)

Hiện tại: Nhận text của user, delay 600ms và nhả ra câu trả lời giả lập.

Nhiệm vụ BE: Đổi thành fetch(POST /api/chat/message, body: payload).

C. Luồng bấm nút Action (Plan A, Plan B, Accept, Create Goal)
File: chatCoordinator.ts -> Hàm handleActionSelection(action: ChatAction)

Cơ chế: Khi user bấm nút, UI không chỉ truyền ID mà truyền toàn bộ object action (bao gồm type và payload data chi tiết).

Hiện tại: Hàm đang chạy console.log('[API BINDING] Bắn lên BE:', action.type, action.payload);

Nhiệm vụ BE: Dùng dữ liệu action.payload (ví dụ: { strategy: 'increase_savings', amount: 3000000 }) để bắn thẳng vào body của API điều chỉnh Goal: