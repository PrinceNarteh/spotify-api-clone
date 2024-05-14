import { PartialType } from '@nestjs/mapped-types';
import { Artist } from 'artists/entities/artist.entity';
import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  readonly artists: Artist[];

  @IsNotEmpty()
  @IsDateString()
  readonly releasedDate: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}

export class UpdateSongDTO extends PartialType(CreateSongDTO) { }
