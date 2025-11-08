import type {
  AppointmentDetailDto,
  AppointmentDto,
  BookAppointmentDto,
  CreateAppointmentDto,
} from "@/types/dto";
import axiosClient from "@/utils/axios-client";
import _ from "lodash";

const mockAppointments: AppointmentDetailDto[] = [
  {
    id: 1,
    scheduleDate: "2025-11-07",
    scheduleTime: "09:00",
    endTime: "10:00",
    doctor: {
      userId: 1,
      firstName: "Nguyen",
      lastName: "An",
      consultationFee: 20,
      clinicInfo: {
        id: 1,
        name: "Central Clinic",
        address: "123 Le Loi, Hanoi",
      },
    },
    patient: {
      userId: 1,
      firstName: "Tran",
      lastName: "Mai",
      gender: "female",
      email: "tran.mai@example.com",
      phoneNumber: "+84 98 111 2222",
      dateOfBirth: "1995-06-15",
    },
    status: "AVAILABLE",
  },
  {
    id: 2,
    scheduleDate: "2025-11-07",
    scheduleTime: "16:00",
    endTime: "17:00",
    doctor: {
      userId: 1,
      firstName: "Nguyen",
      lastName: "An",
      consultationFee: 20,
      clinicInfo: {
        id: 1,
        name: "Central Clinic",
        address: "123 Le Loi, Hanoi",
      },
    },
    patient: {
      userId: 2,
      firstName: "Le",
      lastName: "Hoang",
      gender: "male",
      email: "le.hoang@example.com",
      phoneNumber: "+84 91 333 4444",
      dateOfBirth: "1988-05-22",
    },
    status: "PENDING",
  },
  {
    id: 3,
    scheduleDate: "2025-11-07",
    scheduleTime: "11:00",
    endTime: "12:00",
    doctor: {
      userId: 1,
      firstName: "Nguyen",
      lastName: "An",
      consultationFee: 20,
      clinicInfo: {
        id: 1,
        name: "Central Clinic",
        address: "123 Le Loi, Hanoi",
      },
    },
    status: "CANCELED",
  },
  {
    id: 4,
    scheduleDate: "2025-11-07",
    scheduleTime: "08:00",
    endTime: "09:00",
    doctor: {
      userId: 2,
      firstName: "Tran",
      lastName: "Binh",
      consultationFee: 50,
      clinicInfo: {
        id: 2,
        name: "Heart Care Center",
        address: "45 Tran Hung Dao, Hanoi",
      },
    },
    patient: {
      userId: 3,
      firstName: "Pham",
      lastName: "Linh",
      gender: "female",
      email: "pham.linh@example.com",
      phoneNumber: "+84 97 555 6666",
      dateOfBirth: "1992-11-08",
    },
    status: "CONFIRMED",
  },
  {
    id: 5,
    scheduleDate: "2025-11-07",
    scheduleTime: "13:00",
    endTime: "14:00",
    doctor: {
      userId: 2,
      firstName: "Tran",
      lastName: "Binh",
      consultationFee: 50,
      clinicInfo: {
        id: 2,
        name: "Heart Care Center",
        address: "45 Tran Hung Dao, Hanoi",
      },
    },
    status: "PENDING",
  },
  {
    id: 6,
    scheduleDate: "2025-11-07",
    scheduleTime: "09:00",
    endTime: "09:30",
    doctor: {
      userId: 3,
      firstName: "Le",
      lastName: "Trang",
      consultationFee: 25,
      clinicInfo: {
        id: 3,
        name: "Children's Health Clinic",
        address: "9 Nguyen Trai, Hanoi",
      },
    },
    patient: {
      userId: 4,
      firstName: "Nguyen",
      lastName: "Minh",
      gender: "male",
      email: "nguyen.minh@example.com",
      phoneNumber: "+84 96 777 8888",
      dateOfBirth: "2010-01-20",
    },
    status: "CONFIRMED",
  },
  {
    id: 7,
    scheduleDate: "2025-11-07",
    scheduleTime: "10:00",
    endTime: "11:00",
    doctor: {
      userId: 3,
      firstName: "Le",
      lastName: "Trang",
      consultationFee: 25,
      clinicInfo: {
        id: 3,
        name: "Children's Health Clinic",
        address: "9 Nguyen Trai, Hanoi",
      },
    },
    patient: {
      userId: 5,
      firstName: "Vo",
      lastName: "Anh",
      gender: "female",
      email: "vo.anh@example.com",
      phoneNumber: "+84 95 999 0000",
      dateOfBirth: "2015-08-12",
    },
    status: "COMPLETED",
  },
  {
    id: 8,
    scheduleDate: "2025-11-07",
    scheduleTime: "15:00",
    endTime: "16:00",
    doctor: {
      userId: 3,
      firstName: "Le",
      lastName: "Trang",
      consultationFee: 25,
      clinicInfo: {
        id: 3,
        name: "Children's Health Clinic",
        address: "9 Nguyen Trai, Hanoi",
      },
    },
    status: "COMPLETED",
  },
];

export const appointmentsAPI = {
  getAll(doctorId?: string, patientId?: string): Promise<AppointmentDto[]> {
    return axiosClient.get("/appointments", {
      params: { doctorId, patientId },
    });
  },
  getById(id: number): Promise<AppointmentDetailDto> {
    return axiosClient.get(`/appointments/${id}`);
  },
  create(payload: CreateAppointmentDto): Promise<any> {
    return axiosClient.post("/appointments", payload);
  },
  delete(id: number): Promise<any> {
    return axiosClient.delete(`/appointments/${id}`);
  },
  book(id: number, payload: BookAppointmentDto): Promise<any> {
    return axiosClient.patch(`/appointments/${id}/book`, payload);
  },
  confirm(id: number): Promise<any> {
    return axiosClient.patch(`/appointments/${id}/confirm`);
  },
  cancel(id: number): Promise<any> {
    return axiosClient.patch(`/appointments/${id}/cancel`);
  },
};
