import React from 'react'
import NextLink from 'next/link'
import { Chip, Grid, Typography, Link } from '@mui/material'
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid'
import { ShopLayout } from '../../components/layout'


const colums: GridColDef[] = [
    {field: 'id', headerName:'ID', width: 100},
    {field: 'fullname', headerName: 'Nombre Completo', width: 300},
    {
        field:'paid',
        headerName: 'Pagada',
        description:'Muestra información si esta pagada la orden o no',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid
                ? <Chip color="success" label='Pagada' variant='outlined'/>
                : <Chip color='error' label='No Pagada' variant='outlined'/>
            )
        }
    },
    {
        field:'Ir',
        headerName: 'Enlaces',
        description:'Ver orden',
        width: 150, 
        renderCell:(params: GridValueGetterParams) => {
            return (
                    <NextLink href={`/orders/${params.row.id}`} passHref>
                        <Link underline='always'>Orden</Link>
                    </NextLink>
            )
        }
    }

];

const rows = [
    {id: 1, paid:true, fullname:'Ossmar Gonzalez' },
    {id: 2, paid:false, fullname:'El bebe' },
    {id: 3, paid:true, fullname:'AMLO2018' },
    {id: 4, paid:false, fullname:'Los pietrains' }
]

const HistoryPage = () => {
  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>

        <Typography variant='h1' component="h1">Historial de ordenes</Typography>

        <Grid container>
            <Grid item xs={12}>
                <DataGrid 
                    rows={rows}
                    columns={colums}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    autoHeight
                />
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default HistoryPage