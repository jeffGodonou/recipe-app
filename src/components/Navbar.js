import React from "react";
import SearchBar from "./SearchBar";
// import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from 'react-router-dom';
// import { alpha, styled } from '@mui/material/styles'
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import './Navbar.scss'

/*const Search = styled('div')(({ theme }) => ({
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
})); */

const Navbar = ({searchTerm, handleSearchChange, handleSearch,  }) => {
    return (
        <AppBar position='static' color='success'>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1}} className="title" >
                    Welcome to Let's eat!
                </Typography>
                {
                    /*
                        <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        value={searchTerm}
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => handleSearch(e.target.value)}
                        onSearch={}
                    />
                </Search>
                    */
                }
                <SearchBar
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onSearch={handleSearch}
                />
                <Button color='inherit' component={Link} to={`/shopping-list`}>
                    <ShoppingCartIcon/>
                </Button>

                < Button color='inherit' component={Link} to={`/add-recipe`}>
                    <EditIcon />
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;