import type { NextApiRequest, NextApiResponse } from 'next'
import {db, SHOP_CONSTANT} from '../../../database'
import { productModel } from '../../../models'
import {IProduct} from '../../../interface'

type Data = 
  |  {message: string}
  | IProduct[]


export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  
    switch(req.method){

        case 'GET':
           return getProducts( req, res )
         
        
         default: 
         return res.status(404).json({message: 'El Endpoint no se encontrado'})

    }

}


const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {gender = 'all'} = req.query;
   
    let condition = {}

    console.log(gender !== 'all' )
    console.log(SHOP_CONSTANT.validGender.includes(`${gender}`))

    if(gender !== 'all' && SHOP_CONSTANT.validGender.includes(`${gender}`)){
        console.log("so entro")
        condition={gender}
    }

    await db.connect();
    console.log(condition)
    const products = await productModel.find(condition)
                                       .select('title images inStock price slug -_id') 
                                       .lean()

    await db.disconnect();
    res.status(200).json(products)

}