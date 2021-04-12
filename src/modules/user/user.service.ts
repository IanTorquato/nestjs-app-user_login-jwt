import { EntityNotFoundError, Repository } from 'typeorm';
import { Injectable, Inject, ConflictException } from '@nestjs/common';
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
      throw new ConflictException('Este e-mail já está sendo usado!');
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

  async findAll(): Promise<FindUserDto[]> {
    const users = await this.userRepository.find({
      select: ['id', 'name', 'email', 'created_at'],
    });

    if (!users[0]) {
      throw new EntityNotFoundError(
        'User',
        'modules/user/user.service.ts/findAll',
      );
    }

    return users;
  }

  async findOne(email: string): Promise<FindUserDto> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'created_at'],
    });

    if (!user) {
      throw new EntityNotFoundError(
        'User',
        'modules/user/user.service.ts/findOne',
      );
    }

    return user;
  }

  async findOneLogin(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
