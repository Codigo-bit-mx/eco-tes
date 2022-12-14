import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material'
import {SWRConfig} from 'swr'
import { lightTheme } from '../themes'
import {UIProvider} from '../context/ui'
import { CartProvider } from '../context/cart/CartProvider'
import { AuthProvider } from '../context/auth'


function MyApp({ Component, pageProps }: AppProps) {
  return (

    <SWRConfig 
    value={{
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
  >
  <AuthProvider>
  <CartProvider>
    <UIProvider>
    <ThemeProvider theme={ lightTheme }>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
    </UIProvider>
  </CartProvider>
  </AuthProvider>
  </SWRConfig>



    
    
    )
}

export default MyApp
