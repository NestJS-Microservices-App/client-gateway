import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { StatusDto } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto)
  }

  @Get()
  findAllOrders(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send('findAllOrders', {})
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {

    try {
      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', {id})
      )
      
      return order
      
    } catch (error) {
      throw new RpcException(error)
    }

   
  }

  //filtrar las ordenes por el estatus en la url en vez de los parametros
  //es otra forma de paginar data
  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {

    try {
      
      return this.ordersClient.send('findAllOrders',{
        ...paginationDto,
        status: statusDto.status
      })
      
     
      
    } catch (error) {
      throw new RpcException(error)
    }

   
  }


  @Patch(':id')
  changeStatus(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ){
    try {
      return this.ordersClient.send('changeOrderStatus',{
        id,
        status: statusDto.status
      })
    } catch (error) {
      throw new RpcException(error)
    }
  }





  

  
  
}
