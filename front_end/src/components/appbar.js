import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';


function mainAppBar({ open, toggleDrawer }) {
    return (
        <AppBar position="absolute" open={open} sx={{ backgroundColor: '#1d2247' }}>
            <Toolbar sx={{ pr: '24px' }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <img src="/skillsprint.png" alt="Logo" style={{ width: '200px', height: '60px' }} />
                </Grid>

                <Typography variant="h6">Welcome!</Typography>

                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                    }}
                ></Toolbar>

                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default mainAppBar;