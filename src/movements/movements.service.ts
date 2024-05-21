import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateIncomeExpense, DeleteMovement } from './dto/movements.dto';
import { error } from 'console';
import { IncomeOrExpense } from './dto/movements.dto';

@Injectable()
export class MovementsService {
  constructor(private prisma: PrismaService) {}

  updateIncomesAndExpenses(userId: number, balance: number) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: balance,
      },
    });
  }

  async create(movement: {
    mov: CreateIncomeExpense;
    type: IncomeOrExpense;
    balance: number;
  }) {
    const { mov, type, balance } = movement;
    await this.updateIncomesAndExpenses(mov.userId, balance);
    if (type == 'incomes') {
      return this.prisma.incomes.create({
        data: {
          title: mov.title,
          type: mov.type,
          total: mov.total,
          userId: mov.userId,
        },
      });
    } else if (type == 'expenses') {
      return this.prisma.expenses.create({
        data: {
          title: mov.title,
          type: mov.type,
          total: mov.total,
          userId: mov.userId,
        },
      });
    } else {
      throw error('Invalid type');
    }
  }
  async delete({ id, balance, userId, type }: DeleteMovement) {
    await this.updateIncomesAndExpenses(userId, balance);

    if (type == 'incomes') {
      return this.prisma.incomes.delete({
        where: {
          id: id,
        },
      });
    } else {
      return this.prisma.expenses.delete({
        where: {
          id: id,
        },
      });
    }
  }

  findAll(userId: number, type: string) {
    if (type == 'incomes') {
      return this.prisma.incomes.findMany({
        where: {
          userId: userId,
        },
      });
    } else if (type == 'expenses') {
      return this.prisma.expenses.findMany({
        where: {
          userId: userId,
        },
      });
    } else {
      throw error('Invalid type');
    }
  }

  findByCategory(userId: number, type: string, category: number) {
    if (type == 'incomes') {
      return this.prisma.incomes.findMany({
        where: {
          userId: userId,
          type: category,
        },
      });
    } else if (type == 'expenses') {
      return this.prisma.expenses.findMany({
        where: {
          userId: userId,
          type: category,
        },
      });
    } else {
      throw error('Invalid type');
    }
  }
}
