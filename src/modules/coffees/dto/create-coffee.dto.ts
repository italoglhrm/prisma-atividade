import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  MinLength,
  IsPositive,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  @MinLength(3)
  nome: string;

  @IsString()
  @MinLength(3)
  tipo: string;

  @IsNumber()
  @IsPositive()
  preco: number;

  @IsString()
  @IsOptional()
  descricao: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];
}