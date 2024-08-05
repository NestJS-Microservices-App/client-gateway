import { Catch, RpcExceptionFilter, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter{
    
    
    catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
        
        const ctx = host.switchToHttp()
        const response = ctx.getResponse();

        const rpcError = exception.getError();

        //condicion para atrapar un filtro de error 500
        if(rpcError.toString().includes('Empty respone')){
            return response.status(500).json({
                status: 500,
                //toma todo el mensaje de string hasta que aparezca un parentesis y lo elimina, dejando solo el msj
                message: rpcError.toString().substring(0,rpcError.toString().indexOf('(') - 1)
            })
        }

        if(typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError){
            const status = rpcError.status;
            return response.status(status).json(rpcError)
        }



        return response.status(401).json({
            status: 400,
            message: rpcError
        })


    }
}