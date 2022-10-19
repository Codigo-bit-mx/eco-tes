import type {NextApiRequest, NextApiResponse} from 'next'
import bcrypt from 'bcryptjs'
import { db } from '../../../database'
import { userModel } from '../../../models'
import { signToken } from '../../../utils/jwt'

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
            return loginUser(req, res)

        default:
            res.status(400).json({

            })

    }

}

const loginUser = async(req:NextApiRequest, res:NextApiResponse<Data>) => {

    const { email= '', password= ''} = req.body
    
    db.connect()
    const user = await userModel.findOne({email})
    db.disconnect()

    if(!user) return res.status(400).json({message: 'Correo o password no validos - EMAIL'})

    if( !bcrypt.compareSync(password, user.password!) ) return res.status(400).json({message: 'Correo o password no validos - PASSWORD'})

    const { name, role, _id } = user

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

