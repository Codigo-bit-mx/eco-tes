import React from 'react'
import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '../interface';

// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

export const useProduct = (url: string, config: SWRConfiguration = {} ) => {
    // const {data, error} = useSWR(`/api${url}`, fetcher, config );
    const {data, error} = useSWR<IProduct[]>(`/api${url}`, config );

    return{
        products: data || [],
        isLoading: !error && !data,
        isError: error
    }
}
