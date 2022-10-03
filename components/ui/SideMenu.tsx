import React, {useContext, useState} from 'react'
import {useRouter} from 'next/router'
import { Drawer, Box, ListItem, List, Input, InputAdornment, IconButton, ListItemIcon, ListItemText,Divider, ListSubheader  } from '@mui/material'
import { MaleOutlined, 
         AccountCircleOutlined,
         ConfirmationNumberOutlined,
         FemaleOutlined,
         EscalatorWarningOutlined,
         VpnKeyOutlined,
         LoginOutlined,
         CategoryOutlined,
         AdminPanelSettings, 
         SearchOutlined
        } from '@mui/icons-material'
import {UIContext} from  '../../context/ui'

export const SideMenu = () => {

const router = useRouter();
const { menuOpen, openMenuSidebar } = useContext(UIContext)
const [ searchTerm, setSearchTerm ] = useState('')

const redirectSearch = () => {
    if(searchTerm.trim().length === 0) return 
    router.push(`/search/${searchTerm}`)
    openMenuSidebar()
}


const navigateTo = (url: string) => {
    router.push(url)
    openMenuSidebar()
}

  return (
    <Drawer
        open={ menuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(3px)'}}
        onClose={openMenuSidebar}
    >
        <Box>
            <List>
            <ListItem>
                    <Input
                        autoFocus
                        value={ searchTerm}
                        onChange={ (e) => setSearchTerm(e.target.value)}
                        onKeyPress= { (e) => e.key === 'Enter' ? redirectSearch() : null} 
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <AccountCircleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Perfil'} />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mis Ordenes'} />
                </ListItem>

                <ListItem button sx={{display: {sx: '', sm: 'none'}}}
                   onClick={() => navigateTo('/category/men')}
                >
                <ListItemIcon>
                    <MaleOutlined />
                </ListItemIcon>
                <ListItemText primary={'hombres'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }}
                      onClick={() => navigateTo('/category/woman')}
                >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }}
                      onClick={() => navigateTo('/category/kid')}
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItem>


                <ListItem button>
                    <ListItemIcon>
                        <VpnKeyOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Ingresar'} />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <LoginOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Salir'} />
                </ListItem>

                   {/* Admin */}
                   <Divider />
                <ListSubheader>Admin Panel</ListSubheader>

                <ListItem button>
                    <ListItemIcon>
                        <CategoryOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Productos'} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Ordenes'} />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <AdminPanelSettings/>
                    </ListItemIcon>
                    <ListItemText primary={'Usuarios'} />
                </ListItem>

            </List>
        </Box>

    </Drawer>
  )
}
