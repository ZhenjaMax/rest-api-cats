import { BaseEntity, PrimaryGeneratedColumn, Entity, Column } from "typeorm"
import { ApiProperty } from "@nestjs/swagger";

@Entity("cat")
export class Cat extends BaseEntity{

  @ApiProperty({ example: 1, description: "Идентификатор данных кота" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Чубайс", description: "Имя кота" })
  @Column({})
  name: string;

  @ApiProperty({ example: "Кимрская", description: "Порода кота" })
  @Column({})
  breed: string;

  @ApiProperty({ example: "Рыжий", description: "Цвет кота" })
  @Column({})
  color: string;

  @ApiProperty({ example: 8, description: "Возраст кота" })
  @Column({})
  age: number;

  @ApiProperty({ example: 250, description: "Стоимость аренды кота на 1 час" })
  @Column({})
  costPerHour: number;

  @ApiProperty({ example: true, description: "Текущий статус аренды кота (true, если забронирован)" })
  @Column({ default: false })
  isBooked: boolean;

  @ApiProperty({ description: "URL изображения кота" })
  @Column({ default: null })
  imageURL: string | null;

  @ApiProperty({ description: "Название изображения кота" })
  @Column({ default: null })
  imageName: string | null;
}
