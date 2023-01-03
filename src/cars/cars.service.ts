import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dtos';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  createCar(createCarDto: CreateCarDto) {
    const id = uuid();
    this.cars.push({ id, ...createCarDto });
    return this.findById(id);
  }

  deleteCar(id: string) {
    const carToDelete = this.findById(id);
    this.cars = this.cars.filter((car) => car.id !== carToDelete.id);
    return carToDelete;
  }

  findAll() {
    return this.cars;
  }

  findById(id: string) {
    const car = this.cars.find(({ id: carId }) => id === carId);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  updateCar(id: string, updateCarDto: UpdateCarDto) {
    let carDb = this.findById(id);

    this.cars = this.cars.map((car) => {
      if (car.id === car.id) {
        carDb = {
          ...carDb,
          ...updateCarDto,
          id,
        };
        return carDb;
      }

      return car;
    });

    return carDb;
  }
}
