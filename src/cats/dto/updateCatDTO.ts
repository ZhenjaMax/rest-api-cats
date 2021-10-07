import { IsNotEmpty, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCatDTO{
  @ApiProperty({ example: 1, description: "Идентификатор данных кота"})
  @IsNotEmpty({message: "required"})
  @Min(1, {message: "positive number ID expected"})
  readonly id: number;

  @ApiProperty({ example: "Чубайс", description: "Имя кота", required: false  })
  readonly name: string;

  @ApiProperty({ example: "Кимрская", description: "Порода кота", required: false  })
  readonly breed: string;

  @ApiProperty({ example: "Рыжий", description: "Цвет кота", required: false  })
  readonly color: string;

  @ApiProperty({ example: 250, description: "Стоимость аренды кота на 1 час", required: false  })
  readonly costPerHour: number;

  @ApiProperty({ example: 8, description: "Возраст кота", required: false  })
  readonly age: number;

  @ApiProperty({ description: "Текущий статус аренды кота (true, если забронирован)", required: false })
  readonly isBooked: boolean;
}
