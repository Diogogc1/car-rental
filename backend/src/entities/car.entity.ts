import { CarStatusPrisma } from 'generated/prisma';
import { Reservation } from './reservation.entity';

export interface ICar {
  id?: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
  reservations?: Reservation[];
}

export class Car implements ICar {
  id?: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  status: CarStatusPrisma;
  reservations?: Reservation[];

  constructor(car: ICar) {
    this.id = car.id;
    this.name = car.name;
    this.brand = car.brand;
    this.year = car.year;
    this.price = car.price;
    this.status = car.status;
    this.reservations = car.reservations;
  }

  isAvailable(startDate: Date, endDate: Date): boolean {
    const dataIsValid = endDate > startDate;

    if (!dataIsValid) {
      throw new Error('End date must be after start date');
    }

    const hasReservations =
      this.reservations &&
      this.reservations.length > 0 &&
      this.status === CarStatusPrisma.RESERVED;

    return !hasReservations && dataIsValid;
  }

  update({ name, brand, year, price, status }: Partial<ICar>): void {
    if (name !== undefined) {
      this.name = name;
    }
    if (brand !== undefined) {
      this.brand = brand;
    }
    if (year !== undefined) {
      this.year = year;
    }
    if (price !== undefined) {
      this.price = price;
    }
    if (status !== undefined) {
      this.status = status;
    }
  }
}
