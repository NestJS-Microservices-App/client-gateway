import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PRODUCT_SERVICE } from 'src/config/services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
   return this.productsClient.send({cmd: 'create_product'}, createProductDto)
  }

  @Get()
  findProducts(@Query() paginationDto:PaginationDto) {
    return this.productsClient.send({cmd: 'find_all_products'}, {limit: 2})
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: String) {
    
    try {
      const prod = await firstValueFrom(
        this.productsClient.send({cmd: 'find_one_product'}, {id})
      );

      return prod
      
    } catch (error) {
      throw new RpcException(error)
    }
    
   
  }

  @Delete(':id')
  deleteProduct(@Param('id') id:string){
    return this.productsClient.send({cmd: 'delete_product'},{
      id
    }).pipe(
      catchError(err => {throw new RpcException(err)})
    )
  }

  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number ,  @Body() updateProdDto: UpdateProductDto) {
    return this.productsClient.send({cmd: 'update_product'},{
      id,
      ...updateProdDto
    }).pipe(
      catchError(err => {throw new RpcException(err)})
    )
  }


}
