const Joi = require('joi');

// Joi nos va a servir para hacer un filtrado de los datos obtenidos en el req.body

const newProductSchema = Joi.object().keys({
    name: Joi.string()
    .required()
    .min(3)
    .max(30)
    .regex(/[A-Za-z0-9]/)
    .error((errors) => {
        if (
            errors[0].code === 'any.required' ||
            errors[0].code === 'string.empty' 
        ){ 
            return new Error('El nombre es obligatorio'); 
        }

        return new Error(
            'El nombre del producto debe tener entre 3 y 30 caracteres'
        );
    }),
    price: Joi.number()
    .required()
    .min(1)
    .max(99999)
    .error((errors) => {
        if (
            errors[0].code === 'any.required' ||
            errors[0].code === 'string.empty'
            ){
                return new Error('El precio es obligatorio');
            }

            return new Error('El precio debe ser un valor entre 1 y 99999');
    }),
    description: Joi.string()
        .min(10)
        .max(300)
        .error((_) => {
            return new Error ('La descripción debe tener entre 10 y 300 caracteres');
        
        }),
    });

module.exports = newProductSchema;