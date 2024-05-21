import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MovementsService } from './movements.service';
import {
  CreateIncomeExpense,
  DeleteMovement,
  IncomeOrExpense,
} from './dto/movements.dto';
import { ParseIntPipe } from '@nestjs/common';
import {} from './dto/movements.dto';

@Controller('')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Post('/create')
  create(
    @Body()
    movement: {
      mov: CreateIncomeExpense;
      type: IncomeOrExpense;
      balance: number;
    },
  ) {
    return this.movementsService.create(movement);
  }

  @Delete('/delete')
  delete(
    @Body()
    body: DeleteMovement,
  ) {
    return this.movementsService.delete(body);
  }

  @Get('/:userId/:type')
  findAll(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('type') type: string,
  ) {
    return this.movementsService.findAll(userId, type);
  }

  @Get('/:userId/:type/:category')
  findByCategory(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('type') type: string,
    @Param('category', ParseIntPipe) category: number,
  ) {
    return this.movementsService.findByCategory(userId, type, category);
  }
}
