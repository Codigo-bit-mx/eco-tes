import React, {FC} from 'react'
import Head from 'next/head'
import {Navbar} from '../ui'
import {SideMenu} from '../ui'

interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
    children: any;
}

export const ShopLayout: FC<Props> = ({title, children, pageDescription, imageFullUrl}) => {
  return (
    <>
    <Head>
        <title>{title}</title>

        <meta name='descripction' content={pageDescription} />
        <meta name='og:title' content={pageDescription}/>
        {
         imageFullUrl && (
            <meta name='og:image' content={imageFullUrl}/>
         )
        
        }
    </Head>

    <nav>
        <Navbar />        
    </nav>

    <SideMenu />
    
    <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>
            {children}
    </main>

    <footer>
        
    </footer>
    </>
  )
}
