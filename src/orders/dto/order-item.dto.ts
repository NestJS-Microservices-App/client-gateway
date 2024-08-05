import { Type } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";
import { number } from "joi";


export class OrderItemDto{

    @IsNumber()
    @IsPositive()
    productId: number;


    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNumber()
    @IsPositive()
    price: number;


}