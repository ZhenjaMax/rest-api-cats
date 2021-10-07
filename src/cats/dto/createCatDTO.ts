import { IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsUrl, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCatDTO{
  @ApiProperty({ example: "Чубайс", description: "Имя кота" })
  @IsNotEmpty({message: "required"})
  readonly name: string;

  @ApiProperty({ example: "Кимрская", description: "Порода кота" })
  @IsNotEmpty({message: "required"})
  readonly breed: string;

  @ApiProperty({ example: "Рыжий", description: "Цвет кота" })
  @IsNotEmpty({message: "required"})
  readonly color: string;

  @ApiProperty({ example: 250, description: "Стоимость аренды кота на 1 час" })
  @IsNotEmpty({message: "required"})
  @IsInt({message: "number expected"})
  @Min(0, {message: "non-negative number expected"})
  readonly costPerHour: number;

  @ApiProperty({ example: 8, description: "Возраст кота" })
  @IsNotEmpty({message: "required"})
  @IsInt({message: "number expected"})
  @Min(0, {message: "non-negative number expected"})
  readonly age: number;
}
