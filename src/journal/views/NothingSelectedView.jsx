import { StarOutline } from "@mui/icons-material"
import { Grid, TextField, Typography } from "@mui/material"


export const NothingSelectedView = () => {
  return (

        <Grid 
        className="animate__animated animate__fadeIn"
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor : 'primary.main', padding: 4}}
        > 
            <Grid item xs={12}>
                <StarOutline sx={{ fontSize: 65, color: 'white' }} />    
            </Grid>
            <Grid item xs={12}>
                <Typography color='white' variant="h5">Select or create a note</Typography>  
            </Grid>
            
        </Grid>



  )
}


