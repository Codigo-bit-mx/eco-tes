import type {NextApiRequest, NextApiResponse} from 'next'
import bcrypt from 'bcryptjs'
import { db } from '../../../database'
import { userModel } from '../../../models'
import { signToken, isValidToken } from '../../../utils/jwt'
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
        case 'GET': 
            return checkJWT(req, res)

        default:
            res.status(400).json({

            })
    }
}

const checkJWT = async (req:NextApiRequest, res:NextApiResponse<Data>) => {

    const { token = '' } = req.cookies
   
    let userID = ''

    try {
        userID = await isValidToken(token)
    } catch (error) {
        return res.status(401).json({message: 'Token no valido'})
    }
  
    db.connect()
        const user = await userModel.findById(userID).lean()
     db.disconnect()

    if(!user) return res.status(400).json({message: 'El correo no existe - EMAIL'})

    const { _id, role, name, email } = user

   
    res.status(200).json({
        token: signToken(_id, email),
        user: {
           email,
           role, 
           name
        }
    })
}

