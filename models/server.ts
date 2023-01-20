import express, {Application} from 'express';
import userRouter from '../routes/usuario';
import cors from 'cors'
import db from '../db/connection';


class Server{
    private app: Application;
    private port : string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';


        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        //definir mis rutas
        this.routes();

    }
    
    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Database Online')
        } catch (error) {
            console.log(error)
            throw new Error();
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //LECTURA DEL BODY
        this.app.use(express.json());
        //CARPETA PUBLICA
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.apiPaths.usuarios, userRouter)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto' + this.port);
            console.log('http://localhost:' + this.port);
        })
    }
}


export default Server