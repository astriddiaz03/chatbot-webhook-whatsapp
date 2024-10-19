//impirtar mongoose
const mongoose= require ('mongoose');

// hacer el metodo de conexion  asíncrono
const connection = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/solicitud');
        console.log('conexion exitosa');
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo conectar a la base de datos');
    }

}


//exportar conexion

module.exports = connection;
