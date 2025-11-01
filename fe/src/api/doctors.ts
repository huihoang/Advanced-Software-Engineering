import axiosClient from "@/utils/axios-client";
import type { DoctorDto, AllDoctorsDto } from "@/types/dto";

import _ from "lodash";

export const mockDoctors: DoctorDto[] = [
  {
    userId: 1,
    firstName: "Nguyen",
    lastName: "An",
    email: "nguyen.an@example.com",
    phoneNumber: "+84 90 123 4567",
    dateOfBirth: "1980-05-12",
    role: "doctor",
    bio: "Dr. Nguyen An is a general practitioner with 15 years of experience in family medicine. He focuses on preventive care and chronic disease management.",
    licenseNumber: "LIC-VD-2020-001",
    citizen: { id: "VN", name: "Vietnam" },
    specialization: { id: 1, name: "General Practice" },
    consultationFee: 20,
    rating: 4.6,
    clinicInfo: { id: 1, name: "Central Clinic", address: "123 Le Loi, Hanoi" },
    shifts: [
      { id: 1, date: "2025-11-03", time: "09:00 - 10:00", status: "CONFIRMED" },
      { id: 2, date: "2025-11-03", time: "14:00 - 15:00", status: "PENDING" },
      { id: 3, date: "2025-11-04", time: "10:00 - 11:00", status: "CANCELED" },
    ],
  },
  {
    userId: 2,
    firstName: "Tran",
    lastName: "Binh",
    email: "tran.binh@example.com",
    phoneNumber: "+84 91 234 5678",
    dateOfBirth: "1975-11-02",
    role: "doctor",
    bio: "Cardiologist specialised in interventional cardiology. Passionate about patient education and evidence-based care.",
    licenseNumber: "LIC-CRD-2015-045",
    citizen: { id: "VN", name: "Vietnam" },
    specialization: { id: 2, name: "Cardiology" },
    consultationFee: 50,
    rating: 4.9,
    clinicInfo: {
      id: 2,
      name: "Heart Care Center",
      address: "45 Tran Hung Dao, Hanoi",
    },
    shifts: [
      { id: 4, date: "2025-11-04", time: "08:30 - 09:30", status: "CONFIRMED" },
      { id: 5, date: "2025-11-05", time: "13:00 - 14:00", status: "PENDING" },
    ],
  },
  {
    userId: 3,
    firstName: "Le",
    lastName: "Trang",
    email: "le.trang@example.com",
    phoneNumber: "+84 98 765 4321",
    dateOfBirth: "1988-03-22",
    role: "doctor",
    bio: "Pediatrician with a gentle approach to caring for children. Experienced in vaccination schedules and child development.",
    licenseNumber: "LIC-PED-2018-112",
    citizen: { id: "VN", name: "Vietnam" },
    specialization: { id: 3, name: "Pediatrics" },
    consultationFee: 25,
    rating: 4.7,
    clinicInfo: {
      id: 3,
      name: "Children's Health Clinic",
      address: "9 Nguyen Trai, Hanoi",
    },
    shifts: [
      { id: 6, date: "2025-11-06", time: "09:00 - 09:30", status: "CONFIRMED" },
      { id: 7, date: "2025-11-06", time: "10:00 - 10:30", status: "CONFIRMED" },
      { id: 8, date: "2025-11-07", time: "15:00 - 16:00", status: "COMPLETED" },
    ],
  },
];

export const doctorsAPI = {
  getAll(page: number, limit: number): Promise<AllDoctorsDto> {
    return axiosClient.get("/doctors", {
      params: { page, limit },
    });
  },
  getById(doctorId: number): Promise<DoctorDto> {
    // return axiosClient.get(`/doctors/${doctorId}`);
    return new Promise((resolve, reject) => {
      const doctor = _.find(mockDoctors, { userId: doctorId });
      if (doctor) setTimeout(() => resolve(doctor), 500);
      else setTimeout(() => reject(new Error("Doctor not found")), 500);
    });
  },
};
