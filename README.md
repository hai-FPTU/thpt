# Kiến Tạo Số – Trí tuệ nhân tạo & An toàn thông tin

Tài liệu tương tác (HTML, CSS, JavaScript thuần, không cần máy chủ) cho chuyên đề
**“Trí tuệ nhân tạo & An toàn thông tin – Kỷ nguyên AI: Từ người dùng thụ động đến nhà kiến tạo số”**,
phiên bản chung dùng được cho mọi trường THPT (không gắn tên trường).

## Các mục

| Mục | Đường dẫn | Nội dung |
|---|---|---|
| Trang chủ | `#home` | Hero, lối tắt, 4 nguyên tắc vàng khi dùng AI, 4 bậc lên nhà kiến tạo số, 5 bước xử lý, kênh hỗ trợ |
| Cẩm nang | `#camnang` | Sách lật 15 trang (có thêm: Con người làm chủ AI, 6 nguyên tắc đạo đức khi thiết kế AI, Thang rủi ro): tự lật, toàn màn hình, nghe đọc, in / lưu PDF |
| Bài học | `#baihoc` | 12 bài: AI là gì; bên trong AI; AI tạo sinh; dùng AI thông minh; an toàn thông tin khi dùng AI; deepfake; thuật toán gợi ý & thiên kiến; pháp luật & đạo đức AI; **con người làm chủ AI (YCCĐ 12.A1)**; **nguyên tắc đạo đức khi thiết kế AI, trách nhiệm công dân (12.A2, 12.A3)**; **sai lệch, rủi ro và trách nhiệm trong hệ sinh thái AI (12.B1–B3)**; nhà kiến tạo số. Mỗi bài có “Em có biết?”, “Thử ngay” và câu hỏi kiểm tra |
| Thực hành | `#thuchanh` | 7 trò chơi: Soi ảnh AI (tìm điểm bất thường), Dạy AI (huấn luyện AI nhỏ chạy ngay trên máy), Đoán từ như AI, Mê cung an toàn số, Nối khái niệm, Đoán từ AI, Có AI hay không (kéo thả). 6 bài thực hành: Prompt Lab, Dữ liệu nào đưa cho AI (kéo thả), Soi tin nhắn, Link AI thật – giả, Xử lý tình huống, Quy trình kiến tạo. 5 hoạt động theo yêu cầu cần đạt lớp 12: Vòng đời AI – ai kiểm soát? (12.A1.1, A1.2, A1.MR1), Bộ nguyên tắc dự án AI – có tải tệp .txt (12.A2.1, A2.MR1), Truy nguyên nhân sai lệch (12.B1.MR1), Thang rủi ro 4 mức (12.B2.1), Ai chịu trách nhiệm? (12.B3.1) |
| Yêu cầu cần đạt | `#yccd` | Bảng đối chiếu 10 YCCĐ lớp 12 mạch A, B (Khung nội dung giáo dục AI, QĐ 2422/QĐ-BGDĐT) với bài học, hoạt động; đánh dấu ✓ phần em đã hoàn thành |
| Minigame | `#minigame` | “Thật hay Giả?” về AI: 10 câu ngẫu nhiên / 24 câu, 15 giây mỗi câu |
| Pháp luật | `#phapluat` | Luật Trí tuệ nhân tạo, NĐ 142/2026, Luật An ninh mạng, Luật BVDLCN, NĐ 330/2026, QĐ 2422/QĐ-BGDĐT + đề luyện |
| Hỗ trợ | `#hotro` | 113, 111, 156/5656, canhbao.khonggianmang.vn; lưu bằng chứng; báo cho ai |
| Chứng nhận | `#chungnhan` | Cam kết 5 điều, giấy chứng nhận PNG (nền tối / nền sáng) |
| Báo cáo viên | `#baocao` | Chương trình mẫu 60 phút, đồng hồ đếm ngược, nút mở nhanh từng trang |

## Sửa nội dung

Muốn in tên trường lên trang: mở `js/data.js`, điền `site.school` (ví dụ `'Trường THPT ABC'`), `site.unit` (ví dụ `'Tổ Tin học'`), `site.date` (ví dụ `'Ngày 16/11/2026'`) và `certificate.org`. Để trống `site.school` thì trang hiển thị bản chung; trên giấy chứng nhận, học sinh tự nhập tên trường.


Toàn bộ chữ nằm trong `js/data.js`: bài học, cẩm nang, câu hỏi, thẻ luật, tình huống,
yêu cầu cần đạt (`yccd`), dữ liệu các hoạt động (`lifecycle`, `principles`, `riskBins`, `biasPairs`, `roleBins`),
chương trình, thông tin giấy chứng nhận (`certificate`: tên đơn vị, người ký, số bài tối thiểu – mặc định 8/12 bài).

## Đưa lên mạng (GitHub Pages)

1. Tạo repository Public, tải **toàn bộ nội dung bên trong** thư mục này lên (index.html nằm ở gốc).
2. Settings → Pages → Branch `main`, thư mục `/ (root)` → Save.
3. Sau 1–2 phút có địa chỉ `https://<tài-khoản>.github.io/<tên-repo>/`. Tạo mã QR từ địa chỉ này để chiếu lên màn hình.

Có thể mở trực tiếp `index.html` trên máy tính mà không cần mạng (phông chữ sẽ dùng phông mặc định của máy).

## Lưu ý

- Tiến độ, tên học sinh chỉ lưu trong trình duyệt của chính thiết bị (localStorage), không gửi đi đâu.
- Mật khẩu gõ vào “Máy đo mật khẩu” chỉ được tính trên máy, không lưu.
- Nội dung pháp luật được tóm tắt, cập nhật đến tháng 11/2026. Theo kế hoạch, bộ phận pháp chế cần rà soát trước khi phổ biến.
- Đề luyện tập không phải đề thi chính thức.
- Các tin nhắn, tên miền lừa đảo trong bài thực hành là ví dụ hư cấu.
- Tiến độ lưu riêng cho trang này (khoá `kientaoso-chung-v1`), không lẫn với trang Lá Chắn Số nếu cùng tên miền.
