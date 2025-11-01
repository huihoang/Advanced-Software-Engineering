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
