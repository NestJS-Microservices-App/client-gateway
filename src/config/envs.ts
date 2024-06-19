import 'dotenv/config';
import * as joi from 'joi'



interface EnvVariables {
    PORT: number;
    PRODUCTS_MICROSERVICE_HOST: string;
    PRODUCTS_MICROSERVICE_PORT: number;
    ORDERS_MICROSERVICE_HOST: string;
    ORDERS_MICROSERVICE_PORT: number;
}

const envSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT:  joi.number().required(),
    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT:  joi.number().required()
})
.unknown(true);

const {error, value} = envSchema.validate(process.env);

if(error){
    throw new Error(`config validation error: ${error.message}`);
}

const envVars: EnvVariables = value;


export const envs = {
    port: envVars.PORT,
    prodMicroservideHost: envVars.PRODUCTS_MICROSERVICE_HOST,
    prodMicroservicePort: envVars.PRODUCTS_MICROSERVICE_PORT,
    orderMicroserviceHost: envVars.ORDERS_MICROSERVICE_HOST,
    orderMicroservicePort: envVars.ORDERS_MICROSERVICE_PORT
}