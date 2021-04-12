import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';

import { ResponseError } from 'src/globalDto/error.dto';
import { CreateMaskDto } from './dto/mask.dto';
import { Mask } from './mask.entity';

@Injectable()
export class MaskService {
  constructor(
    @Inject('MASK_REPOSITORY')
    private maskRepository: Repository<Mask>,
  ) {
    // Empty
  }

  async create(data: CreateMaskDto): Promise<Mask | ResponseError> {
    const mask = new Mask();

    mask.color = data.color;
    mask.cost = data.cost;
    mask.size = data.size;
    mask.user = data.user;

    return await this.maskRepository
      .save(mask)
      .then((newMask) => newMask)
      .catch((error) => {
        console.log(error);

        return { error: 'Falha ao cadastrar sua máscara!' };
      });
  }

  async findAll(): Promise<Mask[]> {
    // return await this.maskRepository.find({ relations: ['user'] });
    const masks = await this.maskRepository.find();

    if (!masks[0]) {
      throw new EntityNotFoundError('Mask', 'Nenhuma máscara cadastrada.');
    }

    return masks;
  }
}
