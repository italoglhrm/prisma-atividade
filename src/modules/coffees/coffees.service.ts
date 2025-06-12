import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeeService {
  constructor(private readonly prisma: PrismaService) {}

  // POST /coffees
  async create(createCafeDto: CreateCoffeeDto) {
    const { nome, tipo, preco, descricao, tags } = createCafeDto;

    return this.prisma.cafe.create({
      data: {
        nome,
        tipo,
        preco,
        descricao,
        tags: {
          create: tags.map((tagName) => ({ nome: tagName })),
        },
      },
      include: {
        tags: true,
      },
    });
  }

  // GET /coffees
  async findAll() {
    const cafes = await this.prisma.cafe.findMany({
      include: {
        tags: {
          select: {
            nome: true,
          },
        },
      },
    });

    return cafes.map((cafe) => ({
      id: cafe.id,
      nome: cafe.nome,
      tags: cafe.tags.map((tag) => tag.nome),
    }));
  }

  // GET /coffees/:id/orders
  async findPedidosByCafeId(id: number) {
    const cafe = await this.prisma.cafe.findUnique({ where: { id } });
    if (!cafe) {
      throw new NotFoundException(`Café com ID ${id} não encontrado.`);
    }

    return this.prisma.itemPedido.findMany({
      where: {
        cafeId: id,
      },
      include: {
        pedido: {
          include: {
            cliente: true,
          },
        },
      },
    });
  }

  // GET /coffees/most-ordered
  async findMaisVendidos(tipo?: string, nome?: string) {
    const whereClause: any = {};
    if (tipo) {
      whereClause.tipo = { contains: tipo, mode: 'insensitive' };
    }
    if (nome) {
      whereClause.nome = { contains: nome, mode: 'insensitive' };
    }

    const cafesFiltrados = await this.prisma.cafe.findMany({
      where: whereClause,
      select: { id: true },
    });
    const cafeIds = cafesFiltrados.map((c) => c.id);

    const itensAgrupados = await this.prisma.itemPedido.groupBy({
      by: ['cafeId'],
      where: {
        cafeId: {
          in: cafeIds,
        },
      },
      _sum: {
        quantidade: true,
      },
      orderBy: {
        _sum: {
          quantidade: 'desc',
        },
      },
      take: 3,
    });

    const cafesMaisPedidos = await this.prisma.cafe.findMany({
      where: {
        id: {
          in: itensAgrupados.map((item) => item.cafeId),
        },
      },
      include: {
        tags: true,
      },
    });

    return cafesMaisPedidos.map((cafe) => {
      const vendaInfo = itensAgrupados.find((item) => item.cafeId === cafe.id);
      return {
        ...cafe,
        totalVendido: vendaInfo._sum.quantidade,
      };
    });
  }

  // DELETE /coffees/:id
  async remove(id: number) {
    const cafe = await this.prisma.cafe.findUnique({
      where: { id },
      include: { itensPedido: true },
    });

    if (!cafe) {
      throw new NotFoundException(`Café com ID ${id} não encontrado.`);
    }

    if (cafe.itensPedido.length > 0) {
      throw new ConflictException(
        `Não é possível deletar o café com ID ${id}, pois ele está associado a pedidos existentes.`,
      );
    }

    return this.prisma.cafe.delete({
      where: { id },
    });
  }
}