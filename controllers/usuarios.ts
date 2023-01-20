import {Request, Response} from 'express'
import Usuario from '../models/usuario';
import ITusuario from '../interface/usuario';

export const getUsuarios = async (req: Request, res: Response)=>{

    const usuarios = await Usuario.findAll({
        where : {
            estado : true
        }
    });

    res.json({
        msg : "getUsuarios",
        usuarios
    })
}


export const getUsuario = async (req: Request, res: Response)=>{
    const {id} = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        return res.status(404).json({
            msg : `No existe un usuario con el id ${id}`
        })
    }
    res.json({
        msg : "getUsuario",
        usuario
    })
}

export const postUsuario = async (req: Request, res: Response)=>{
    let body = req.body;
    let usuario;
    
    try {
        let existeEmail = await Usuario.findOne({
            where : {
                email : body.email
            }
        })
        if (!existeEmail) {
           return res.status(400).json({
            msg : "Existe un email registrado"
           });
        }

        usuario = await Usuario.create(body);
       
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg : "hable con el administrador"
        })
    }

    res.json({
        msg : "postUsuario",
        usuario
        
    })
}

export const putUsuario = async (req: Request, res: Response)=>{
    const {id} = req.params;
    const {body} = req;
    let usuario
    
    try {
        usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg : "No se ha encontrado el usuario"
            })
        }
        await usuario.update(body);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg : "hable con el administrador"
        })
    }


    res.json({
        msg : "putUsuario",
        usuario
    })
}

export const deleteUsuario = async (req: Request, res: Response)=>{
    const {id} = req.params;
    let usuario;

    try {
        usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg : "No se ha encontrado el usuario"
            })
        }

        await usuario.update({estado : false});
        // await usuario.destroy();

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg : "hable con el administrador"
        })
    }

    res.json({
        msg : "usuario borrado",
        id,
        usuario
    })
}