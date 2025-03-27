import { SuperHeroMockEntity } from '@entities';
import { Mapper } from '../../base/mapper';
import { SuperHeroModel } from '@models';

export class SuperHeroMapper extends Mapper<
  SuperHeroMockEntity,
  SuperHeroModel
> {
  override mapFrom(param: SuperHeroMockEntity): SuperHeroModel {
    return {
      id: param.id.toString(),
      name: param.name,
      nickName: param.nickName,
      power: param.power,
    };
  }

  override mapTo(param: SuperHeroModel): SuperHeroMockEntity {
    return {
      id: Number(param.id),
      name: param.name,
      nickName: param.nickName,
      power: param.power,
    };
  }
}
