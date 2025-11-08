import type { DepartmentDto, DoctorDto } from "@/types/dto";

import _ from "lodash";

export const mockDoctors: DoctorDto[] = [
  {
    userId: 1,
    firstName: "Nguyen",
    lastName: "An",
    email: "nguyen.an@example.com",
    phoneNumber: "+84 90 123 4567",
    dateOfBirth: "1980-05-12",
    role: "DOCTOR",
    bio: "Dr. Nguyen An is a general practitioner with 15 years of experience in family medicine. He focuses on preventive care and chronic disease management.",
    licenseNumber: "LIC-VD-2020-001",
    citizen: { id: "VN", name: "Vietnam" },
    department: { id: 1, name: "General Practice" },
    consultationFee: 20,
    rating: 4.6,
    clinicInfo: { id: 1, name: "Central Clinic", address: "123 Le Loi, Hanoi" },
    appointments: [
      {
        id: 1,
        patientId: 1,
        scheduleDate: "2025-11-07",
        scheduleTime: "09:00",
        endTime: "10:00",
        status: "CONFIRMED",
      },
      {
        id: 2,
        patientId: 1,
        scheduleDate: "2025-11-07",
        scheduleTime: "16:00",
        endTime: "17:00",
        status: "CONFIRMED",
      },
      {
        id: 3,
        patientId: 2,
        scheduleDate: "2025-11-07",
        scheduleTime: "11:00",
        endTime: "12:00",
        status: "PENDING",
      },
      {
        id: 4,
        scheduleDate: "2025-11-07",
        scheduleTime: "08:00",
        endTime: "09:00",
        status: "AVAILABLE",
      },
      {
        id: 5,
        patientId: 2,
        scheduleDate: "2025-11-07",
        scheduleTime: "13:00",
        endTime: "14:00",
        status: "COMPLETED",
      },
      {
        id: 6,
        patientId: 1,
        scheduleDate: "2025-11-07",
        scheduleTime: "09:00",
        endTime: "09:30",
        status: "CANCELED",
      },
    ],
  },
  {
    userId: 2,
    firstName: "Tran",
    lastName: "Binh",
    email: "tran.binh@example.com",
    phoneNumber: "+84 91 234 5678",
    dateOfBirth: "1975-11-02",
    role: "DOCTOR",
    bio: "Cardiologist specialised in interventional cardiology. Passionate about patient education and evidence-based care.",
    licenseNumber: "LIC-CRD-2015-045",
    citizen: { id: "VN", name: "Vietnam" },
    department: { id: 2, name: "Cardiology" },
    consultationFee: 50,
    rating: 4.9,
    clinicInfo: {
      id: 2,
      name: "Heart Care Center",
      address: "45 Tran Hung Dao, Hanoi",
    },
    appointments: [
      {
        id: 7,
        patientId: 2,
        scheduleDate: "2025-11-07",
        scheduleTime: "10:00",
        endTime: "11:00",
        status: "CONFIRMED",
      },
      {
        id: 8,
        patientId: 1,
        scheduleDate: "2025-11-07",
        scheduleTime: "15:00",
        endTime: "16:00",
        status: "PENDING",
      },
    ],
  },
];

export const doctorsAPI = {
  getAll(
    search?: string,
    departmentId?: string,
    scheduleDate?: Date
  ): Promise<DoctorDto[]> {
    // return axiosClient.get("/doctors", {
    //   params: { search, departmentId, scheduleDate },
    // });
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDoctors), 500);
    });
  },
  getById(id: number): Promise<DoctorDto> {
    // return axiosClient.get(`/doctors/${id}`);
    return new Promise((resolve, reject) => {
      const doctor = _.find(mockDoctors, { userId: id });
      if (doctor) setTimeout(() => resolve(doctor), 500);
      else setTimeout(() => reject(new Error("Doctor not found")), 500);
    });
  },
  getAllDepartments(): Promise<DepartmentDto[]> {
    // return axiosClient.get("/api/departments");
    return new Promise((resolve) => {
      const departments = [
        { id: 1, name: "Khoa Hồi sức" },
        { id: 2, name: "Khoa Nội tổng quát" },
        { id: 3, name: "Khoa Ngoại tổng quát" },
        { id: 4, name: "Khoa Tim mạch" },
        { id: 5, name: "Khoa Hô hấp" },
        { id: 6, name: "Khoa Thần kinh" },
        { id: 7, name: "Khoa Tai mũi họng" },
        { id: 8, name: "Khoa Mắt" },
        { id: 9, name: "Khoa Da liễu" },
        { id: 10, name: "Khoa Nhi" },
        { id: 11, name: "Khoa Sản" },
        { id: 12, name: "Khoa Tiêu hóa" },
        { id: 13, name: "Khoa Thận - Tiết niệu" },
        { id: 14, name: "Khoa Cơ xương khớp" },
        { id: 15, name: "Khoa Ung bướu" },
        { id: 16, name: "Khoa Truyền nhiễm" },
        { id: 17, name: "Khoa Y học cổ truyền" },
        { id: 18, name: "Khoa Chấn thương chỉnh hình" },
        { id: 19, name: "Khoa Răng - Hàm - Mặt" },
        { id: 20, name: "Khoa Tâm thần" },
      ];
      setTimeout(() => resolve(departments), 300);
    });
  },
};
