import { Mapper } from '../../base/mapper';
import { SuperHeroModel } from '../../domain/models';
import { SuperHeroMockEntity } from '../entities/super-hero-mock.entity';

export class SuperHeroMapper extends Mapper<
  SuperHeroMockEntity,
  SuperHeroModel
> {
  override mapFrom(param: SuperHeroMockEntity): SuperHeroModel {
    return {
      id: param.id.toString(),
      name: param.name,
      power: param.power,
    };
  }

  override mapTo(param: SuperHeroModel): SuperHeroMockEntity {
    return {
      id: Number(param.id),
      name: param.name,
      power: param.power,
    };
  }
}
