import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CoffeeService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller('coffees') // Rota base para todo o controller
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Post() // Rota: POST /coffees
  create(@Body() createCafeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCafeDto);
  }

  @Get() // Rota: GET /coffees
  findAll() {
    return this.coffeeService.findAll();
  }

  @Get('most-ordered') // Rota: GET /coffees/most-ordered
  findMaisVendidos(
    @Query('tipo') tipo?: string,
    @Query('nome') nome?: string,
  ) {
    return this.coffeeService.findMaisVendidos(tipo, nome);
  }

  @Get(':id/orders') // Rota: GET /coffees/1/orders
  findPedidosByCafeId(@Param('id', ParseIntPipe) id: number) {
    return this.coffeeService.findPedidosByCafeId(id);
  }

  @Delete(':id') // Rota: DELETE /coffees/1
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coffeeService.remove(id);
  }
}