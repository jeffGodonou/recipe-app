import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles'
import { AppBar, Button, InputBase, InputAdornment, IconButton, Toolbar, Typography } from "@mui/material";
import './Navbar.scss';

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
    [theme.breakpoints.up('sm')] : {
        marginLeft: theme.spacing(3),
        width: 'auto',
    }
}));

const SearchIconWrapper = styled('div') (({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase) (({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
})); 

const Navbar = ({searchTerm, handleSearchChange, handleSearch,  }) => {
    return (
        <AppBar position='static' sx={{ backgroundColor: 'rgb(18, 26, 25)'}}>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1}} className="title">
                    Welcome to Let's eat!
                </Typography>

                <Search>
                    <StyledInputBase
                        value={searchTerm}
                        placeholder="Search..."
                        onChange={handleSearchChange}
                        endAdornment={
                            <InputAdornment position="start">
                                <IconButton onClick={handleSearch}>
                                    <SearchIconWrapper>
                                        <SearchIcon sx={{ color:'white' }}/>
                                    </SearchIconWrapper>
                                </IconButton>
                            </InputAdornment>                
                        }
                        inputProps={{ 'aria-label': 'search',}}
                    />
                </Search>
                <Button color='inherit' size="small" component={Link} to={`/shopping-list`}>
                    <AddShoppingCartIcon fontSize="small"/>
                </Button>
                <Button color='inherit' size="small" component={Link} to={`/add-recipe`}>
                    <EditIcon fontSize="small"/>
                </Button>
                <Button color='inherit' size="small" component={Link} to={`/mealplan`}>
                    <CalendarTodayIcon fontSize="small"/>
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;