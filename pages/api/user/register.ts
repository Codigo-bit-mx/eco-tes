import type {NextApiRequest, NextApiResponse} from 'next'
import bcrypt from 'bcryptjs'
import { db } from '../../../database'
import { userModel } from '../../../models'
import { signToken } from '../../../utils/jwt'
import { isValidEmail } from '../../../utils/validatorEmail'

type Data = 
| { message: string }
| { 
    token: string,
    user: { 
    email: string,
    name: string,
    role: string
    }
}

export default function handler (req:NextApiRequest, res:NextApiResponse) {

    switch(req.method){
        case 'POST': 
            return registerUser(req, res)

        default:
            res.status(400).json({

            })
    }
}

const registerUser = async (req:NextApiRequest, res:NextApiResponse<Data>) => {

    const { email= '', password= '', name= ''} = req.body
    
    if(password < 6) return res.status(400).json({message:' El password debe ser de 6 caracteres'})

    if( name.length < 2 ) {
        return res.status(400).json({message:' El nombre debe ser de 2 caracteres'})
    }

    if(!isValidEmail( email )){
        return res.status(400).json({
            message: 'El correo no es valido'
        })
    }

    db.connect()
        const user = await userModel.findOne({email})
    db.disconnect()

    if( user) return res.status(400).json({message: 'El correo ya existe - EMAIL'})

    const newUser = new userModel({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync( password ),
        role:'client',
        name
    })

    try {
        await newUser.save({validateBeforeSave: true})
    } catch (error) {
        res.status(500).json({message: 'Revisar los logs'})
    }


    const { _id, role } = newUser

    const token = signToken(_id, email)

    res.status(200).json({
        token,
        user: {
            email,
            role, 
            name
        }
    })
}

