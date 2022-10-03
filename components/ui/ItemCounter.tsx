import React, {FC} from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
  
interface Props {
currentValue: number
maxValue: number
//metodo
updateQuantity: (cantidad: number) => void
}

  export const ItemCounter:FC<Props> = ({currentValue, maxValue, updateQuantity}) => {
    
    const addOrRemove = ( cantidad: number ) => {
      if(cantidad === -1 ) {
        if(currentValue === 1) return

        return updateQuantity(currentValue-1)
      }
      
      if(currentValue >= maxValue) return
     
      return updateQuantity(currentValue+1)

    }
    
    return (
      <Box display='flex' alignItems='center'>
        <IconButton
          disabled={ currentValue === 1 ? true : false }
          onClick={ () => addOrRemove(-1)}
        >
            <RemoveCircleOutline/>
        
        </IconButton>

      <Typography sx={{ width:40, textAlign:'center'}}> {currentValue} </Typography>
      <IconButton
        disabled={ currentValue >= maxValue ? true : false }
        onClick={ () => addOrRemove( +1 )}
      >
            <AddCircleOutline/>
        </IconButton>
      </Box>
    )
  }
  