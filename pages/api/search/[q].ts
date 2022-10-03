import type { NextApiRequest, NextApiResponse } from 'next'
import { productModel } from '../../../models';
import {db} from '../../../database'
import {IProduct} from '../../../interface'

type Data = 
 | {message: string}
 | IProduct[]

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  
    switch(req.method){

        case 'GET':      
           return getSearchProduct(req, res)
        
        default:
            res.status(400).json({message: 'Endpoint no permitido'})
    }

}


const getSearchProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    let { q = '' } = req.query

    if( q.length === 0 ){
        return res.status(400).json({
            message: 'Debe de especificar el query de busqueda'
        })
    }

    q = q.toString().toLowerCase()
    
    await db.connect()
    const product = await productModel.find({
        $text: {$search: q}
    })
    .select('title images prices inStock slug -_id')
    .lean()

    await db.disconnect()
   
    res.status(200).json(product)
  
}

