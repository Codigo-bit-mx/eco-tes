import type { NextApiRequest, NextApiResponse } from 'next'
import {db} from '../../../database'
import {IProduct} from '../../../interface'
import { productModel } from '../../../models'

type Data = 
  |  {message: string}
  | IProduct

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  
    switch(req.method){

        case 'GET':
           return getProductSlug( req, res )
         break
        
         default: 
         return res.status(404).json({message: 'El Endpoint no se encontrado'})

    }

}


const getProductSlug = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {slug} = req.query

    await db.connect()
    const productSlug = await productModel.findOne({slug}).lean()
    await db.disconnect()

    if(!productSlug){
        return res.status(404).json({
            message:'Producto no encontrado'
        })
    }

    res.status(200).json(productSlug)
}