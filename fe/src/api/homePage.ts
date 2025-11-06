// src/api/home.api.ts
import type { DoctorDto, AllDoctorsDto } from "@/types/dto";

// Mock data cho Home page
const mockDoctors: DoctorDto[] = [
  {
    userId: 1,
    firstName: "Nguyen",
    lastName: "An",
    email: "nguyen.an@example.com",
    phoneNumber: "+84 90 123 4567",
    dateOfBirth: "1980-05-12",
    role: "DOCTOR",
    bio: "Bác sĩ tổng quát với hơn 15 năm kinh nghiệm trong chăm sóc sức khỏe gia đình.",
    licenseNumber: "LIC-VD-2020-001",
    citizen: { id: "VN", name: "Vietnam" },
    department: { id: 1, name: "Tổng quát" },
    consultationFee: 200000,
    rating: 4.6,
    clinicInfo: { id: 1, name: "Trung tâm Y tế Quận 1", address: "123 Lê Lợi, Hà Nội" },
    appointments: [],
  },
  {
    userId: 2,
    firstName: "Tran",
    lastName: "Binh",
    email: "tran.binh@example.com",
    phoneNumber: "+84 91 234 5678",
    dateOfBirth: "1975-11-02",
    role: "DOCTOR",
    bio: "Chuyên gia tim mạch với hơn 20 năm kinh nghiệm, tận tâm trong chăm sóc bệnh nhân.",
    licenseNumber: "LIC-CRD-2015-045",
    citizen: { id: "VN", name: "Vietnam" },
    department: { id: 2, name: "Tim mạch" },
    consultationFee: 350000,
    rating: 4.9,
    clinicInfo: { id: 2, name: "Heart Care Center", address: "45 Trần Hưng Đạo, Hà Nội" },
    appointments: [],
  },
  {
    userId: 3,
    firstName: "Le",
    lastName: "Hoa",
    email: "le.hoa@example.com",
    phoneNumber: "+84 98 222 1111",
    dateOfBirth: "1988-07-22",
    role: "DOCTOR",
    bio: "Bác sĩ da liễu chuyên điều trị các bệnh lý về da và thẩm mỹ da liễu.",
    licenseNumber: "LIC-DAL-2018-022",
    citizen: { id: "VN", name: "Vietnam" },
    department: { id: 3, name: "Da liễu" },
    consultationFee: 250000,
    rating: 4.7,
    clinicInfo: { id: 3, name: "Dermacare Clinic", address: "22 Nguyễn Huệ, TP.HCM" },
    appointments: [],
  },
];

const mockDepartments = [
  { id: 1, name: "Tổng quát" },
  { id: 2, name: "Tim mạch" },
  { id: 3, name: "Da liễu" },
  { id: 4, name: "Nhi khoa" },
  { id: 5, name: "Tai Mũi Họng" },
];

const mockClinics = [
  { id: 1, name: "Trung tâm Y tế Quận 1", address: "123 Lê Lợi, Hà Nội" },
  { id: 2, name: "Heart Care Center", address: "45 Trần Hưng Đạo, Hà Nội" },
  { id: 3, name: "Dermacare Clinic", address: "22 Nguyễn Huệ, TP.HCM" },
  { id: 4, name: "FamilyCare Clinic", address: "12 Điện Biên Phủ, Đà Nẵng" },
];

export const homeAPI = {
  async getDepartments() {
    return new Promise<{ id: number; name: string }[]>((resolve) =>
      setTimeout(() => resolve(mockDepartments), 200)
    );
  },

  async getClinics() {
    return new Promise<{ id: number; name: string; address: string }[]>((resolve) =>
      setTimeout(() => resolve(mockClinics), 200)
    );
  },

  async getFeaturedDoctors(): Promise<AllDoctorsDto> {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            total: mockDoctors.length,
            doctors: mockDoctors,
          }),
        300
      )
    );
  },
};
