import type { NextApiRequest, NextApiResponse } from 'next'
import {db} from '../../database'
import { productModel, userModel } from '../../models'
import {initialData} from '../../database'

type Data = {
  message: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  
    if(process.env.NODE_ENV === 'production') return 

await db.connect();

await userModel.deleteMany()
await userModel.insertMany(initialData.user)
await productModel.deleteMany();
await productModel.insertMany(initialData.products);

await db.disconnect();
  
  res.status(200).json({ message:'Exito se cargo la informacion' })
}
