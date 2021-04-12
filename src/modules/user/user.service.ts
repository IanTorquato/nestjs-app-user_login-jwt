import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ResponseError } from 'src/globalDto/error.dto';
import { CreateUserDto, FindUserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {
    // Empty
  }

  async create(data: CreateUserDto): Promise<FindUserDto | ResponseError> {
    const { name, email, password } = data;

    const userExist = await this.userRepository.findOne({ email });

    if (userExist) {
      return { error: 'Este e-mail já está sendo usado!' };
    }

    const passwordEncrypted = await bcrypt.hash(password, 8);

    const user = new User();

    user.name = name;
    user.email = email;
    user.password = passwordEncrypted;

    return this.userRepository
      .save(user)
      .then(({ id, name, email, created_at }) => {
        return { id, name, email, created_at };
      })
      .catch((err) => {
        console.log(err);

        return { error: 'Falha ao criar um novo usuário!' };
      });
  }

  async findAll(): Promise<FindUserDto[] | ResponseError> {
    const users = await this.userRepository.find({
      select: ['id', 'name', 'email', 'created_at'],
    });

    if (!users[0]) {
      return { error: 'Nenhum usuário encontrado!' };
    }

    return users;
  }

  async findOne(email: string): Promise<FindUserDto | ResponseError> {
    const userExist = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'created_at'],
    });

    if (!userExist) {
      return { error: 'Nenhum usuário encontrado!' };
    }

    return userExist;
  }

  async findOneLogin(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
