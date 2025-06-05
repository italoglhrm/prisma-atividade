import { Controller, Get, Post, Query, Param, Body } from '@nestjs/common';
import { CoffeeService, Cafe } from './coffees.service';

@Controller()
export class CoffeeController {
  constructor(private readonly appService: CoffeeService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/coffees/:id/detalhes')
  getDetalhesCafe(@Param('id') id: string) : Cafe | undefined{
    return this.appService.getDetalhesCafe(id)
  }

  @Post('/coffee-create')
  createCoffee(@Body() cafe : Cafe){
    return this.appService.createCoffee(cafe)
  }

  @Get('/coffee-query-all')
  getDetalhesPorDataCafe(@Query('start_date') start_date: string, @Query('end_date') end_date: string){
    console.log(start_date, end_date)
    return this.appService.getDetalhesData(start_date, end_date)
  }



}
