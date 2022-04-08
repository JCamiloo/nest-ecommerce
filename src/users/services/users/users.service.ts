import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from '../../../common/services/generic.service';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService extends GenericService<User> {
  constructor(@InjectRepository(User) private repository: Repository<User>) {
    super(repository);
  }
}
