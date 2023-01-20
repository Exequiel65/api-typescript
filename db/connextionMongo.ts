import mongoose from "mongoose";
let conectionString = "mongodb://localhost:27017/Ecommerce";

const dbMongo = async() => {

    try {

        await mongoose.set('strictQuery', false);
        await mongoose.connect( conectionString);
        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}



export default dbMongo
