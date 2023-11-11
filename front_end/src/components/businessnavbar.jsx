import { Mail, Notifications, Pets } from "@mui/icons-material";
import { Link, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Divider,
    InputBase,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Typography,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import React, { useState } from "react";
import { Grid } from "@mui/material";
import { alpha } from '@mui/material/styles';




const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#0a0936"
});



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
        display: "flex",
    },
}));

const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
}));

const BusinessNavbar = () => {

    const navigate = useNavigate();

    const reset = () => {
        localStorage.removeItem('user');
        navigate("/login");
    }
    const [open, setOpen] = useState(false);
    return (
        <AppBar position="sticky">
            <StyledToolbar>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <img src="/skillsprint.png" alt="Logo" style={{ width: '220px', height: '60px' }} />
                </Grid>
                <Pets sx={{ display: { xs: "block", sm: "none" } }} />
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Icons>

                    <Button variant="contained" startIcon={<AddBoxIcon />}
                    sx={{
                        marginRight:'16px'
                    }}>
                        New Ad
                    </Button>

                    <Badge badgeContent={4} color="error" sx={{ mr: '24px', mt: '6px' }}>
                        <Notifications />
                    </Badge>

                    <Avatar
                        sx={{ width: 30, height: 30 }}
                        src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        onClick={(e) => setOpen(true)}
                    />
                </Icons>
                <UserBox onClick={(e) => setOpen(true)}>
                    <Avatar
                        sx={{ width: 30, height: 30 }}
                        src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    />
                    <Typography variant="span">John</Typography>
                </UserBox>
            </StyledToolbar>


            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={(e) => setOpen(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <Divider />
                <MenuItem onClick={reset}>Logout</MenuItem>
            </Menu>
        </AppBar>
    );
};

export default BusinessNavbar;