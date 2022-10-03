import mongoose, { Schema, model, Model } from "mongoose";
import { IProduct } from "../interface";


const productSchema = new Schema({
    description: { type: String, required: true },
    images: [{type: String}],
    inStock: {type: Number, required: true, default: 0},
    price: {type: Number, required: true, default: 0},
    sizes: [{
        type: String, 
        enum: {
           values:['XS','S','M','L','XL','XXL','XXXL'],
           message: '{VALUE} no es un tamaño valido' 
        }
    }],
    slug: { type: String, required: true, unique: true},
    tags: [{type: String}],
    title: { type: String, required: true },
    type: {
        type: String,
        enum:{
            values: ['shirts','pants','hoodies','hats']
        }
    },
    gender: {
        type: String,
        enum:{
            values: ['men','women','kid','unisex']
        }
    }
    
},{
    timestamps: true
});

productSchema.index({ title: 'text', tags: 'text' })

const productModel: Model<IProduct> = mongoose.models.Product || model('Product', productSchema)


export default productModel