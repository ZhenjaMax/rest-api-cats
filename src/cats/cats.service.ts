import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Cat } from "./cats.model";
import { CreateCatDTO } from "./dto/createCatDTO";
import { UpdateCatDTO } from "./dto/updateCatDTO";
import { GetCatDTO } from "./dto/getCatDTO";

import { HttpException, HttpStatus } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { Express } from "express";

@Injectable ({})
export class CatsService {
  constructor(@InjectRepository(Cat) private catRepository: typeof Cat) {}

  async createCat(dto: CreateCatDTO){
      const cat = await this.catRepository.create(dto);
      await this.catRepository.save(cat);
      return cat;
  }

  async getAll(){
    const cats = await this.catRepository.find();
    cats.sort(function(cat1: Cat, cat2: Cat): number {return cat1.id - cat2.id});
    return cats;
  }

  async getOne(dto: GetCatDTO){
    try{
      return await this.catRepository.findOneOrFail({ where: { id: dto.id } });
    } catch (getOneError){
      throw new HttpException('id: not found', HttpStatus.BAD_REQUEST);
    }
  }

  async getBooked(){
    const cats = await this.catRepository.find({ where: { isBooked: true } });
    cats.sort(function(cat1: Cat, cat2: Cat): number {return cat1.id - cat2.id});
    return cats;
  }

  async getAvailable(){
    const cats = await this.catRepository.find({ where: { isBooked: false } });
    cats.sort(function(cat1: Cat, cat2: Cat): number {return cat1.id - cat2.id});
    return cats;
  }

  async update(dto: UpdateCatDTO){
    let getCatDTO: GetCatDTO = new GetCatDTO();
    getCatDTO.id = dto.id;
    let cat = await this.getOne(getCatDTO);
    const updatedCat = this.catRepository.create({...cat, ...dto});
    await this.catRepository.save(updatedCat);
    return updatedCat;
  }

  async delete(dto: GetCatDTO){
    const cat = await this.getOne(dto);
    await this.catRepository.delete({id: dto.id});
    cat.id = -1;
    return cat;
  }

  async updateImage(id: number, file: Express.Multer.File){
    if(!file) throw new HttpException('file: not found', HttpStatus.BAD_REQUEST);
    let isImage: boolean = (file.mimetype === "image/png" ||
                            file.mimetype === "image/jpg" ||
                            file.mimetype === "image/jpeg");
    if(!isImage) throw new HttpException('file: incorrect format (png, jpg, jpeg only)', HttpStatus.BAD_REQUEST);

    let getCatDTO: GetCatDTO = new GetCatDTO();
    getCatDTO.id = id;
    let cat = await this.getOne(getCatDTO);
    let filename: string = `${id}_${file.originalname}`;

    if(cat.imageName) cat = await this.deleteImage(id);
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Body: file.buffer,
      Key: filename
    }).promise();

    cat.imageURL = await s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: filename
    });
    cat.imageName = filename;
    await this.catRepository.save(cat);
    return cat;
  }

  async deleteImage(id: number){
    let getCatDTO: GetCatDTO = new GetCatDTO();
    getCatDTO.id = id;
    let cat = await this.getOne(getCatDTO);

    if(cat.imageName == null)
      return cat;

    const s3 = new S3();
    await s3.deleteObject({
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: cat.imageName,
    }).promise();

    cat.imageURL = null;
    cat.imageName = null;
    await this.catRepository.save(cat);
    return cat;
  }

}
