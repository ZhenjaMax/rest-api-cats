import { Module } from '@nestjs/common';
import { CatsService } from "./cats.service";
import { CatsController } from "./cats.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cat } from "./cats.model";

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports: [TypeOrmModule.forFeature([Cat])]
})
export class CatsModule {}
