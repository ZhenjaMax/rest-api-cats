import { IsInt, IsNotEmpty, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetCatDTO{
  @ApiProperty({ example: 1, description: "Идентификатор данных кота"})
  @IsNotEmpty({message: "required"})
  @IsInt({message: "number expected"})
  @Min(0, {message: "number above 0 expected"})
  id: number;
}
