import { IsPositiveInt } from 'common/decorators/is-positive-int.decorator';

export class IdDto {
  @IsPositiveInt()
  readonly id: number;
}
