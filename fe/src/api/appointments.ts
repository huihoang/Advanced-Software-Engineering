import type { AppointmentDetailDto, AppointmentDto } from "@/types/dto";
import axiosClient from "@/utils/axios-client";
import _ from "lodash";

const mockAppointments: AppointmentDetailDto[] = [
  {
    id: 1,
    shift: {
      id: 1,
      date: "2025-11-05",
      time: "09:00 - 10:00",
    },
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
    shift: {
      id: 2,
      date: "2025-11-05",
      time: "14:00 - 15:00",
    },
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
    shift: {
      id: 3,
      date: "2025-11-04",
      time: "10:00 - 11:00",
    },
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
    shift: {
      id: 4,
      date: "2025-11-04",
      time: "08:30 - 09:30",
    },
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
    shift: {
      id: 5,
      date: "2025-11-05",
      time: "13:00 - 14:00",
    },
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
    shift: {
      id: 6,
      date: "2025-11-06",
      time: "09:00 - 09:30",
    },
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
    shift: {
      id: 7,
      date: "2025-11-06",
      time: "10:00 - 10:30",
    },
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
    shift: {
      id: 8,
      date: "2025-11-07",
      time: "15:00 - 16:00",
    },
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
  getAll(page: number, limit: number): Promise<AppointmentDto> {
    return axiosClient.get("/appointments", {
      params: { page, limit },
    });
  },
  getById(id: number): Promise<AppointmentDetailDto> {
    // return axiosClient.get(`/appointments/${id}`);
    return new Promise((resolve, reject) => {
      const appointment = _.find(mockAppointments, { id: id });
      if (appointment) setTimeout(() => resolve(appointment), 500);
      else setTimeout(() => reject(new Error("Doctor not found")), 500);
    });
  },
  book(id: number): Promise<any> {
    // return axiosClient.patch(`/appointments/${id}/book`);
    return new Promise((resolve) => {
      setTimeout(() => resolve(""), 500);
    });
  },
  confirm(id: number): Promise<any> {
    // return axiosClient.patch(`/appointments/${id}/confirm`);
    return new Promise((resolve) => {
      setTimeout(() => resolve(""), 500);
    });
  },
  cancel(id: number): Promise<any> {
    // return axiosClient.patch(`/appointments/${id}/cancel`);
    return new Promise((resolve) => {
      setTimeout(() => resolve(""), 500);
    });
  },
};
