import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NatsModule } from 'src/nats/nats.module';


@Module({
 
  providers: [],
  imports: [
    NatsModule
  ]
})
export class OrdersModule {}
