import { Body, Controller, Get, Post, Delete, UsePipes, Param, UseInterceptors, UploadedFile } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { CreateCatDTO } from "./dto/createCatDTO";
import { UpdateCatDTO } from "./dto/updateCatDTO";
import { GetCatDTO } from "./dto/getCatDTO";
import { ValidationPipe } from "../validation/validation.pipe";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Cat } from "./cats.model";

import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express"

@ApiTags("Описание API методов")
@Controller("cats")
export class CatsController {
  constructor(private catsService: CatsService) {}

  @ApiOperation({ summary: "Добавить новый экземпляр данных кота в БД" })
  @ApiResponse({ status: 201, type: Cat })
  @UsePipes(ValidationPipe)
  @Post("create")
  create(@Body() dto: CreateCatDTO){ return this.catsService.createCat(dto); }

  @ApiOperation({ summary: "Изменить информацию о коте по ID" })
  @ApiResponse({ status: 201, type: Cat })
  @Post("update")
  update(@Body() dto: UpdateCatDTO){ return this.catsService.update(dto); }

  @ApiOperation({ summary: "Получить список, содержащий всех котов" })
  @ApiResponse({ status: 200, type: [Cat] })
  @UsePipes(ValidationPipe)
  @Get("get/all")
  getAll(){ return this.catsService.getAll(); }

  @ApiOperation({ summary: "Получить информацию о коте по ID" })
  @ApiResponse({ status: 200, type: Cat })
  @UsePipes(ValidationPipe)
  @Get("get/one")
  getOne(@Body() dto: GetCatDTO){ return this.catsService.getOne(dto); }

  @ApiOperation({ summary: "Получить список, содержащий всех забронированных котов" })
  @ApiResponse({ status: 200, type: [Cat] })
  @Get("get/booked")
  getBooked(){ return this.catsService.getBooked(); }

  @ApiOperation({ summary: "Получить список, содержащий всех доступных для бронирования котов" })
  @ApiResponse({ status: 200, type: [Cat] })
  @Get("get/available")
  getAvailable(){ return this.catsService.getAvailable(); }

  @ApiOperation({ summary: "Удалить информацию о коте по ID" })
  @ApiResponse({ status: 200, type: Cat })
  @UsePipes(ValidationPipe)
  @Delete("delete")
  delete(@Body() dto: GetCatDTO){ return this.catsService.delete(dto); }

  @ApiOperation({ summary: "Загрузить изображение кота по ID из URL" })
  @ApiResponse({ status: 201, type: Cat })
  @UseInterceptors(FileInterceptor("file"))
  @Post('img_update/:id')
  updateImage(@Param('id') id: number, @UploadedFile() file: Express.Multer.File){ return this.catsService.updateImage(id, file); }

  @ApiOperation({ summary: "Удалить изображение кота по ID из URL" })
  @ApiResponse({ status: 200, type: Cat })
  @Delete('img_delete/:id')
  deleteImage(@Param('id') id: number){ return this.catsService.deleteImage(id); }
}
