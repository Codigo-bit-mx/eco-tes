import React, {useContext, useState} from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { AppBar, Toolbar, Link, Typography, Button, Box, IconButton, Badge, Input, InputAdornment } from '@mui/material'
import {ClearOutlined, SearchOutlined, ShoppingCartOutlined} from '@mui/icons-material'
import { UIContext } from '../../context/ui'



export const Navbar = () => {
    
const {pathname, push}= useRouter()
const {openMenuSidebar} = useContext(UIContext)
const [isVisibleSearch, setisVisibleSearch] = useState(false)
const [ searchTerm, setSearchTerm ] = useState('')

const redirectSearch = () => {
    if(searchTerm.trim().length === 0) return 
    push(`/search/${searchTerm}`)
}

  return (
    <AppBar>
        <Toolbar>
            <NextLink href={'/'} passHref>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6'>Teslo |</Typography>
                    <Typography sx={{ml:0.5}}>Shop</Typography>
                </Link>
            </NextLink>
        
        
        <Box flex={1}/>
        
        <Box sx={{ display: isVisibleSearch ? 'none' : {xs:'none', sm:'block'} }}>
            <NextLink href='/category/men' passHref>
                <Link>
                <Button color={ pathname === '/category/men' ? 'primary' : 'info'} >Hombres</Button>
                </Link>
            </NextLink>
            <NextLink href='/category/woman' passHref>
                <Link>
                <Button color={ pathname === '/category/woman' ? 'primary' : 'info'}>Mujeres</Button>
                </Link>
            </NextLink>
            <NextLink href='/category/kid' passHref>
                <Link>
                <Button color={ pathname === '/category/kid' ? 'primary' : 'info'}>Niños</Button>
                </Link>
            </NextLink>
        </Box>

        <Box flex={1}/>

       {/* Busqueda para pantallas mas grandes */}
        {
            isVisibleSearch 
            ? (
                <Input
                 sx={{display:{ sx: 'none', sm: 'flex'}}}
                 autoFocus
                 value={ searchTerm }
                 onChange={ (e) => setSearchTerm(e.target.value)}
                 onKeyPress= { (e) => e.key === 'Enter' ? redirectSearch() : null} 
                 type='text'
                 placeholder="Buscar..."
                 endAdornment={
                     <InputAdornment position="end">
                         <IconButton
                            onClick={ () => setisVisibleSearch(false)}
                         >
                          <ClearOutlined />
                         </IconButton>
                     </InputAdornment>
                 }
               />
              )

            : (
                <IconButton 
                sx={{ display:{ xs: 'none', sm: 'flex'}}}
                    className='fadeIn'
                    onClick={() => setisVisibleSearch(true)}
                >
                <SearchOutlined  />
                </IconButton> 
              )
        }


        {/* busuqeda para pantallas pequeñas */}
        <IconButton
            sx={{ display: { xs: 'flex', sm: 'none'} }}
            onClick={openMenuSidebar}
        >
            <SearchOutlined/>
        </IconButton>



        <NextLink href={'/cart'} passHref>
            <Link>
                <IconButton>
                    <Badge badgeContent={2} color='secondary'>
                        <ShoppingCartOutlined />
                    </Badge>
                </IconButton>
            </Link>
        </NextLink>

        <Button
            onClick={ openMenuSidebar }
        >
            Menu
        </Button>

        </Toolbar>
    </AppBar>

  )
}
