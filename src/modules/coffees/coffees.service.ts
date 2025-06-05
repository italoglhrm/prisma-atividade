import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

export interface Cafe{
  nome: string;           // obrigatório
  tipo: string;           // obrigatório
  quantidade?: number;
  preco?: number;
  id: string;             // obrigatório
  descricao?: string;
  tags?: string[];
  data: Date
}

@Injectable()
export class CoffeeService {
  getHello(): string {
    return 'Hello World!';
  }

  private readonly cafes: Cafe[] = [ {
    "nome": "Encanto",
    "tipo": "Suave",
    "quantidade": 2,
    "preco": 22.0,
    "id": "30",
    "descricao": "Bebida delicada com notas florais e toque de frutas vermelhas.",
    "tags": ["floral", "frutas vermelhas", "suave"],
    "data": new Date(2025, 4, 28)
  }]

  getDetalhesCafe(id:string) : Cafe{
    const cafe = this.cafes.find( cafe => cafe.id === id)
    if(!cafe){
      throw new NotFoundException(`Café com ID ${id} não encontrado.`);
    }
    return cafe
  }

  createCoffee(cafe : Cafe){
    if(!cafe.nome) {
      throw new BadRequestException('O nome é obrigatório');
    }
    if(!cafe.tipo){
      throw new BadRequestException('O tipo é obrigatório');
    }
    if(!cafe.id){
      throw new BadRequestException('O id é obrigatório');
    }
    cafe.data = new Date()
    this.cafes.push(cafe)
    
    return {
      message: 'Café criado com sucesso',
      cafe
    }
  }

  criarDateDeStringBR(dataBR: string): Date {
    const [dia, mes, ano] = dataBR.split('/');
    return new Date(Number(ano), Number(mes) - 1, Number(dia)); // mês é zero-based
  }

  getDetalhesData(start_date: string, end_date: string) {
    const startD = this.criarDateDeStringBR(start_date)
    const endD = this.criarDateDeStringBR(end_date)

    const filterCoffes = this.cafes.filter(
      cafe => (cafe.data >= startD && cafe.data <= endD));
    return filterCoffes
  }


}
