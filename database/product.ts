import { db } from "./"
import { IProduct } from "../interface"
import { productModel } from "../models"


export const getProduct = async (slug: string): Promise <IProduct | null> => {
    
    await db.connect()
    const product = await productModel.findOne({slug}).lean()
    await db.disconnect()

    if( !product ){
        return null
    }

    return JSON.parse(JSON.stringify(product))
}


interface ProductSlug {
    slug: string;
}

export const getAllProductsSlug = async(): Promise<ProductSlug[]> => {
    await db.connect()
    const slugs = await productModel.find().select('slug -_id').lean()
  
    await db.disconnect(); 
    
    return slugs
}


export const getAllSearchProduct = async (query: string): Promise<IProduct[]> => {

    await db.connect()

    query = query.toString().toLowerCase()
    const products = await productModel.find({
        $text: {$search: query}
    }).select('title images prices inStock slug -_id')

    await db.disconnect()

    return JSON.parse(JSON.stringify(products))

} 

export const getAllProducts = async (): Promise<IProduct[]> => {

    await db.connect()

    const products = await productModel.find().select('title images prices inStock slug -_id').lean()
    
    await db.disconnect();

    return  products
}
