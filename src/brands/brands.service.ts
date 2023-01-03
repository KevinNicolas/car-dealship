import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private _brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime(),
    },
  ];

  create(createBrandDto: CreateBrandDto) {
    const newBrand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLowerCase(),
      createdAt: new Date().getTime(),
    };
    this._brands.push(newBrand);
    return newBrand;
  }

  findAll() {
    return this._brands;
  }

  findOne(id: string) {
    const brand = this._brands.find(({ id: brandId }) => id === brandId);

    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDb = this.findOne(id);

    this._brands = this._brands.map((brand) => {
      if (brandDb.id === brand.id) {
        brandDb = {
          ...brandDb,
          ...updateBrandDto,
          id,
        };
        return brandDb;
      }
      return brand;
    });

    return brandDb;
  }

  remove(id: string) {
    const brandToDelete = this.findOne(id);

    this._brands = this._brands.filter(
      (brand) => brand.id !== brandToDelete.id,
    );

    return brandToDelete;
  }
}
