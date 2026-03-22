# GoalPilot

Monorepo skeleton project.

## Cấu trúc thư mục:
- `apps/backend/`: chứa các service backend của dự án.
  - `input/`: khung cho phần tiếp nhận dữ liệu đầu vào như manual entry, SMS reading, OCR ingestion.
  - `intelligence/`: khung cho forecasting, reasoning, recommendation, và AI-related logic.
  - `data/`: khung cho data access, persistence, database interaction, và external data provider integration nếu sau này cần.
- `apps/frontend/`: khung cho mobile/web frontend.
- `docs/`: để tài liệu dự án.
- `infra/`: để deployment/configuration/docker về sau.
- `packages/`: để shared package hoặc shared types nếu sau này cần.

---

## Hướng dẫn chạy dự án (Development)

Dự án hiện tại có **Backend (FastAPI)** và **Frontend (React Native / Expo)**. Bạn cần mở 2 cửa sổ terminal riêng biệt để chạy song song.

### 1. Khởi động Backend (FastAPI)

Backend sử dụng môi trường ảo (virtual environment). Cần kích hoạt môi trường và khởi động server Uvicorn.

```bash
# 1. Mở cửa sổ terminal mới tại thư mục gốc của dự án (goalpilot/)
# 2. Kích hoạt môi trường ảo (Windows)
.\venv\Scripts\activate

# 3. Chuyển vào thư mục mã nguồn Backend (đã refactor)
cd apps/backend

# 4. Khởi động server (sử dụng provider 'mock' để test mà không tốn API key)
# Thêm --host 0.0.0.0 để Expo Go từ điện thoại có thể truy cập được
$env:ACTIVE_LLM_PROVIDER="backup"
$env:BACKUP_PROVIDER="mock"
uvicorn main_api:app --host 0.0.0.0 --port 8000 --reload
```
> Server Backend sẽ chạy tại: `http://localhost:8000`
> Tài liệu API Swagger UI: `http://localhost:8000/docs`

### 2. Khởi động Frontend (React Native / Expo)

Frontend cần kết nối với Backend thông qua IP thật của máy bạn trên mạng LAN (đặc biệt khi bạn test bằng điện thoại qua Expo Go).

```bash
# 1. Tìm địa chỉ IP máy tính trên mạng LAN (ví dụ: 192.168.1.5)
# Sử dụng lệnh ipconfig trên Windows để tìm "IPv4 Address"

# 2. Mở cửa sổ terminal thứ 2 tại thư mục gốc của dự án (goalpilot/)
cd apps/frontend

# 3. (Nếu chưa chạy lần nào) Cài đặt dependencies
npm install

# 4. Tạo file .env nếu chưa có và cấu hình URL của Backend
# Thay <IP_CỦA_BẠN> bằng địa chỉ IP vừa tìm được ở bước 1 (ví dụ: 192.168.1.5)
echo "EXPO_PUBLIC_API_URL=http://<IP_CỦA_BẠN>:8000" > .env

# 5. Khởi động Expo
npm start
```
> Quét mã QR hiện ra trên terminal hoặc trình duyệt bằng ứng dụng **Expo Go** trên điện thoại (đảm bảo điện thoại và máy tính dùng chung mạng Wi-Fi) để xem kết quả.
