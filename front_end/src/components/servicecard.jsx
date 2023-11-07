import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {CardHeader} from '@mui/material'
import {Avatar} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';


export default function ServiceCard() {

   
        const [value, setValue] = React.useState(4);
    return (
        <Card sx={{ maxWidth: 345 }}>
            <Grid
            sx={{
                marginTop:-1,marginBottom:-1
            }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: '#6f0094' }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Royal Event Planners"
    
            />
            </Grid>

            <CardActionArea>
                <CardMedia
                    component="img"
                    height="190"
                    image="/freelancing.jpg"
                    alt="service picture"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: '500'}}>
                        Event Planning
                    </Typography>

                    <Grid container sx={{ display:'flex',alignItems:'center'}} >
                    <Rating name="read-only" value={value} readOnly size='small'
                        sx={{ marginTop: '-8px' }}/>
                    
                    <Typography variant='body3' color='textSecondary' sx={{marginBottom:'5px'}}>(12)</Typography>
                    </Grid>

                    <Grid item style={{ display: 'flex', alignItems: 'center', marginTop:'4px',justifyContent:'space-between'}}>
                        <Grid container sx={{alignItems:'center', justifyContent:'start'}}>
                        <Typography variant="body1" sx={{ fontWeight: '500' , mr:'8px'}}>
                            From
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: '500'}}>
                             ₹1000
                        </Typography>
                        </Grid>
                        
                        <Typography variant='body3' color='grey' sx={{textAlign:'right'}}>
                            MARGAO,GOA
                        </Typography>
                        
                        
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
