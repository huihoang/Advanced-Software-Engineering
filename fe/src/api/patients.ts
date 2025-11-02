import axiosClient from "@/utils/axios-client";
import type { PatientDetailDto, PatientDto } from "@/types/dto";

import _ from "lodash";

export const mockPatients: PatientDetailDto[] = [
  {
    userId: 1,
    firstName: "Tran",
    lastName: "Mai",
    email: "tran.mai@example.com",
    phoneNumber: "+84 98 111 2222",
    dateOfBirth: "1995-06-15",
    role: "PATIENT",
    gender: "female",
    citizen: { id: "VN", name: "Vietnam" },
    specialization: { id: 0, name: "" },
    emergencyName: "Tran Van Binh",
    emergencyPhone: "+84 98 222 3333",
    address: {
      addressLine: "456 Nguyen Trai Street",
      city: "Hanoi",
      provinceState: "Hanoi",
      country: "Vietnam",
    },
    appointments: [
      {
        id: 1,
        shift: { id: 1, date: "2025-11-03", time: "09:00 - 10:00" },
        doctorId: 1,
        patientId: 1,
        status: "CONFIRMED",
      },
      {
        id: 2,
        shift: { id: 2, date: "2025-11-05", time: "10:00 - 11:00" },
        doctorId: 2,
        patientId: 1,
        status: "PENDING",
      },
      {
        id: 3,
        shift: { id: 3, date: "2025-10-28", time: "14:00 - 15:00" },
        doctorId: 1,
        patientId: 1,
        status: "COMPLETED",
      },
      {
        id: 4,
        shift: { id: 4, date: "2025-11-10", time: "11:00 - 12:00" },
        doctorId: 3,
        patientId: 1,
        status: "PENDING",
      },
      {
        id: 5,
        shift: { id: 5, date: "2025-10-15", time: "09:00 - 10:00" },
        doctorId: 2,
        patientId: 1,
        status: "COMPLETED",
      },
    ],
  },
  {
    userId: 2,
    firstName: "Le",
    lastName: "Hoang",
    email: "le.hoang@example.com",
    phoneNumber: "+84 91 333 4444",
    dateOfBirth: "1988-03-22",
    role: "PATIENT",
    gender: "male",
    citizen: { id: "VN", name: "Vietnam" },
    specialization: { id: 0, name: "" },
    emergencyName: "Le Thi Lan",
    emergencyPhone: "+84 91 444 5555",
    address: {
      addressLine: "789 Le Loi Avenue",
      city: "Ho Chi Minh City",
      provinceState: "Ho Chi Minh",
      country: "Vietnam",
    },
    appointments: [
      {
        id: 6,
        shift: { id: 6, date: "2025-11-03", time: "14:00 - 15:00" },
        doctorId: 1,
        patientId: 2,
        status: "COMPLETED",
      },
      {
        id: 7,
        shift: { id: 7, date: "2025-11-06", time: "09:00 - 10:00" },
        doctorId: 3,
        patientId: 2,
        status: "CONFIRMED",
      },
      {
        id: 8,
        shift: { id: 8, date: "2025-10-20", time: "15:00 - 16:00" },
        doctorId: 2,
        patientId: 2,
        status: "COMPLETED",
      },
      {
        id: 9,
        shift: { id: 9, date: "2025-11-08", time: "10:00 - 11:00" },
        doctorId: 1,
        patientId: 2,
        status: "CONFIRMED",
      },
      {
        id: 10,
        shift: { id: 10, date: "2025-10-10", time: "13:00 - 14:00" },
        doctorId: 3,
        patientId: 2,
        status: "CANCELED",
      },
      {
        id: 11,
        shift: { id: 11, date: "2025-11-12", time: "16:00 - 17:00" },
        doctorId: 2,
        patientId: 2,
        status: "PENDING",
      },
    ],
  },
];

export const patientsAPI = {
  getAll(): Promise<PatientDto[]> {
    return axiosClient.get("/patients");
  },
  getById(id: number): Promise<PatientDetailDto> {
    // return axiosClient.get(`/patients/${id}`);
    return new Promise((resolve, reject) => {
      const patient = _.find(mockPatients, { userId: id });
      if (patient) setTimeout(() => resolve(patient), 500);
      else setTimeout(() => reject(new Error("Patient not found")), 500);
    });
  },
};
