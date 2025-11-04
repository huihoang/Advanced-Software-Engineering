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
        shift: { id: 1, date: "2025-11-01", time: "09:00 - 10:00" },
        status: "CONFIRMED",
      },
      {
        id: 1,
        patientId: 1,
        shift: { id: 1, date: "2025-11-05", time: "09:00 - 10:00" },
        status: "CONFIRMED",
      },
      {
        id: 2,
        patientId: 2,
        shift: { id: 2, date: "2025-11-05", time: "11:00 - 12:00" },
        status: "PENDING",
      },
      {
        id: 3,
        shift: { id: 3, date: "2025-11-05", time: "13:00 - 14:00" },
        status: "AVAILABLE",
      },
      {
        id: 4,
        patientId: 2,
        shift: { id: 4, date: "2025-11-05", time: "16:00 - 17:00" },
        status: "COMPLETED",
      },
      {
        id: 5,
        patientId: 1,
        shift: { id: 5, date: "2025-11-05", time: "17:00 - 18:00" },
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
        id: 6,
        patientId: 2,
        shift: { id: 4, date: "2025-11-04", time: "08:30 - 09:30" },
        status: "CONFIRMED",
      },
      {
        id: 7,
        patientId: 1,
        shift: { id: 3, date: "2025-11-05", time: "10:00 - 11:00" },
        status: "PENDING",
      },
    ],
  },
];

export const doctorsAPI = {
  getAll(page: number, limit: number): Promise<AllDoctorsDto> {
    return axiosClient.get("/doctors", {
      params: { page, limit },
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
};
