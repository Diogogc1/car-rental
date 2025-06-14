import { ReservationPrisma, UserPrisma } from 'generated/prisma';
import { IUser, User } from 'src/entities';
import { ReservationMapper } from './reservation.mapper';

export class UserMapper {
  static toEntity(
    userPrisma: UserPrisma & { reservations?: ReservationPrisma[] },
  ): User {
    const userProps: IUser = {
      id: userPrisma.id,
      name: userPrisma.name,
      email: userPrisma.email,
      password: userPrisma.password,
      reservations: userPrisma.reservations?.map((reservation) =>
        ReservationMapper.toEntity(reservation),
      ),
    };
    return new User(userProps);
  }

  static toPrismaModel(user: IUser): {
    name: string;
    email: string;
    password: string;
  } {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
