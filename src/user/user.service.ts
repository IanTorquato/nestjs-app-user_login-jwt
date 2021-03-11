import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ResponseError } from 'src/globalDto/error.dto';
import { UserDataCreate } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {
    // Empty
  }

  async create(data: UserDataCreate): Promise<User | ResponseError> {
    const password = await bcrypt.hash(data.password, 8);

    const user = new User();

    user.name = data.name;
    user.email = data.email;
    user.password = password;

    return this.userRepository
      .save(user)
      .then((newUser) => newUser)
      .catch(() => {
        return { error: 'Falha ao criar um novo usuário!' };
      });
  }

  async findAll(): Promise<any> {
    // const users = await this.userRepository.find();
    const users = await this.userRepository.find({
      select: ['id', 'name', 'email', 'created_at'],
    });

    return users;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }
}
