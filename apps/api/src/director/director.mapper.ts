import { Director } from '@/generated/prisma/client';
import { DirectorResponse } from '@contracts/schemas/director/DirectorResponse';

export class DirectorMapper {
  static toResponse(entity: Director): DirectorResponse {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
    };
  }
}
