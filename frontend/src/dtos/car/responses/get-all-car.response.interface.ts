import { IGetAllReservationResponse } from "@/dtos/reservation/responses";

export interface IGetAllCarResponse {
  id: number;
  name: string;
  plate: string;
  brand: string;
  year: number;
  price: number;
  status: string;
  reservations?: IGetAllReservationResponse[];
}
