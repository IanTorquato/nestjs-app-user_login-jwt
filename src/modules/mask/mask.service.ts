import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ResponseError } from 'src/globalDto/error.dto';
import { MaskDataCreate } from './dto/mask.dto';
import { Mask } from './mask.entity';

@Injectable()
export class MaskService {
  constructor(
    @Inject('MASK_REPOSITORY')
    private maskRepository: Repository<Mask>,
  ) {
    // Empty
  }

  async create(data: MaskDataCreate): Promise<Mask | ResponseError> {
    const mask = new Mask();

    mask.color = data.color;
    mask.cost = data.cost;
    mask.size = data.size;
    // mask.user = data.userId;

    return await this.maskRepository
      .save(mask)
      .then((newMask) => newMask)
      .catch((error) => {
        console.log(error);
        return { error: 'Falha ao cadastrar sua máscara!' };
      });
  }

  async findAll(): Promise<any> {
    // const masks = await this.maskRepository
    //   .createQueryBuilder('mask')
    //   .leftJoinAndSelect('mask.user', 'user')
    //   .getMany();

    const masks = this.maskRepository.find({
      relations: ['user'],
      select: ['color', 'user'],
    });

    return masks;
  }
}
