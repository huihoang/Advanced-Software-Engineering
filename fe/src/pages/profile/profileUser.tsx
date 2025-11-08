import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [role, setRole] = useState<string | null>(null);
  // const [role, setRole] = useState<string>("doctor");
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  // Dữ liệu mẫu cho bác sĩ, bệnh nhân
  const doctorInfo = {
    name: "Tiến sĩ, Bác sĩ chuyên khoa II Lê Quốc Việt",
    experience: "Gần 40 năm kinh nghiệm khám và điều trị các bệnh nội cơ xương khớp, nội khoa và sức khỏe tổng quát",
    specialties:
      "Nhiều năm kinh nghiệm điều trị bệnh gout, thoái hóa khớp, cột sống, tiêm collagen, tiêm chất nhờn...",
    position: "Nguyên Phó Giám đốc Bệnh viện E",
    location: "Tổ hợp Y tế Mediplus, Tầng 2 trung tâm thương mại Mandarin Garden 2, 99 Tân Mai, phường Hoàng Mai, TP Hà Nội",
    price: "350.000đ",
    schedule: [
      "08:00 - 08:30",
      "08:30 - 09:00",
      "09:00 - 09:30",
      "09:30 - 10:00",
      "10:00 - 10:30",
      "10:30 - 11:00",
      "11:00 - 11:30",
      "11:30 - 12:00",
      "13:00 - 13:30",
      "13:30 - 14:00",
      "14:00 - 14:30",
      "14:30 - 15:00",
      "15:00 - 15:30",
      "15:30 - 16:00",
      "16:00 - 16:30",
      "16:30 - 17:00",
      "17:00 - 17:30",
      "17:30 - 18:00",
    ],
    reviews: [
      { name: "Nguyễn Thị Nguyện", date: "22/08/2025", comment: "Qui trình ngắn gọn, tiện ích, tối ưu thời gian..." },
      { name: "Nguyễn Thị Phượng", date: "10/08/2024", comment: "Nhân viên hỗ trợ tốt, không cần chờ lâu" },
      { name: "Nguyễn Quốc Minh", date: "18/02/2022", comment: "Tốt, BookingCare nên mở rộng thêm nhiều đối tác" },
      { name: "Nguyễn Thị Hồng", date: "09/06/2021", comment: "Mình thấy cũng khá tốt rồi ạ" },
    ],
  };
  // Dữ liệu mẫu cho patient
  const patientInfo = {
    username: "patient01@gmail.com",
    fullName: "Nguyễn Văn A",
    phone: "0909123456",
    dob: "01/01/1990",
    gender: "Nam",
    history: [
      { date: "22/08/2025", doctor: "Tiến sĩ Lê Quốc Việt", specialty: "Cơ Xương Khớp", note: "Khám định kỳ, kê thuốc bổ xương" },
      { date: "10/08/2024", doctor: "Bác sĩ Nguyễn Thị Lan", specialty: "Nội khoa", note: "Khám đau dạ dày" },
    ],
  };
  if (!role) return <p>Loading...</p>;
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Profile Page</h1>

      {role === "doctor" && (
        <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow mb-6 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Doctor Dashboard</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Add New Schedule</button>
          {/* Thông tin bác sĩ */}
          <section>
            <h2 className="text-xl font-semibold mb-2">{doctorInfo.name}</h2>
            <p className="text-gray-700 mb-1">{doctorInfo.experience}</p>
            <p className="text-gray-600 mb-1">{doctorInfo.specialties}</p>
            <p className="text-gray-500 mb-1">{doctorInfo.position}</p>
            <p className="text-gray-500">{doctorInfo.location}</p>
          </section>

          {/* Lịch khám */}
          <section>
            <h3 className="font-semibold mb-2">Lịch Khám</h3>
            <div className="grid grid-cols-4 gap-2">
              {doctorInfo.schedule.map((time) => (
                <button
                  key={time}
                  className="bg-blue-100 hover:bg-blue-200 rounded p-2 text-sm"
                >
                  {time}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Chọn và đặt (Phí đặt lịch 0đ). Miễn phí khám vào buổi chiều từ 13h hàng tuần.
            </p>
          </section>

          {/* Giá khám */}
          <section>
            <p className="text-lg font-semibold">GIÁ Khám: {doctorInfo.price}</p>
          </section>

          {/* Quá trình công tác */}
          <section>
            <h3 className="font-semibold mb-2">Quá trình công tác</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Giám đốc Phòng khám, Tổ hợp y tế Mediplus (2020 - nay)</li>
              <li>Tiến sĩ Nội xương khớp, Bệnh viện E (2018)</li>
              <li>Bác sĩ Chuyên khoa II, Học viện Quân Y (2004)</li>
              <li>Tốt nghiệp Đại học Y Hà Nội (1986)</li>
              {/* ... thêm các mục khác */}
            </ul>
          </section>

          {/* Đánh giá */}
          <section>
            <h3 className="font-semibold mb-2">Phản hồi của bệnh nhân</h3>
            <ul className="space-y-2">
              {doctorInfo.reviews.map((review, idx) => (
                <li key={idx} className="border p-2 rounded bg-gray-50">
                  <p className="font-semibold">{review.name} - {review.date}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {role === "patient" && (
        <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow mb-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Thông tin bệnh nhân</h2>

          <section>
            <p><strong>Username:</strong> {patientInfo.username}</p>
            <p><strong>Full Name:</strong> {patientInfo.fullName}</p>
            <p><strong>Phone:</strong> {patientInfo.phone}</p>
            <p><strong>Ngày sinh:</strong> {patientInfo.dob}</p>
            <p><strong>Giới tính:</strong> {patientInfo.gender}</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">Lịch sử khám bệnh</h3>
            <ul className="space-y-2">
              {patientInfo.history.map((item, idx) => (
                <li key={idx} className="border p-2 rounded bg-gray-50">
                  <p><strong>Ngày:</strong> {item.date}</p>
                  <p><strong>Bác sĩ:</strong> {item.doctor}</p>
                  <p><strong>Chuyên khoa:</strong> {item.specialty}</p>
                  <p><strong>Ghi chú:</strong> {item.note}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

    </div>
  );
};

export default ProfilePage;
