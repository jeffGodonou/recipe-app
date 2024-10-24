import React, {useEffect, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AddIcon from '@mui/icons-material/Add';
import { Link, useLocation } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles'
import { AppBar, Button, InputBase, InputAdornment, IconButton, Toolbar, Typography } from "@mui/material";
import ShoppingList from "./ShoppingList";
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

const Navbar = ({searchTerm, handleSearchChange, handleSearch, onAddShoppingList}) => {
    const [isShoppingPage, setShoppingPage] = useState(false);
    const [isMealPlanPage, setMealPlanPage] = useState(false);
    const [isAddRecipePage, setIsAddRecipePage] = useState(false);

    const [open, setOpen] = useState(false);
    const location = useLocation();
    useEffect(()=> {
        if (location.pathname === '/shopping-list') {
            setShoppingPage(true);
            setMealPlanPage(false);
            setIsAddRecipePage(false);
        }
        else if (location.pathname === '/mealplan') {
            setMealPlanPage(true);
            setShoppingPage(false);
            setIsAddRecipePage(false);
        }
        else if (location.pathname === '/add-recipe') {
            setIsAddRecipePage(true);
            setShoppingPage(false);
            setMealPlanPage(false);
        }
        else {
            setShoppingPage(false);
            setMealPlanPage(false);
            setIsAddRecipePage(false);
        }
            
    }, [location]);

    const handleClickOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };

    return (
        <AppBar position='static' sx={{ backgroundColor: 'rgb(18, 26, 25)'}}>
            <Toolbar>
                {
                    isShoppingPage ? (
                        <>
                            <Typography variant='h6' component='div' sx={{ flexGrow: 1}} className='title'> 
                                Shopping Lists 
                            </Typography>
                            
                            <Button onClick={() => handleClickOpen()} color='inherit' size='small' className='button'>
                                <AddIcon/>
                            </Button>    
                            <ShoppingList open={open} handleClose={handleClose} size='small' onAddShoppingList={onAddShoppingList} />
                            <Button color='inherit' size="small" component={Link} to={`/add-recipe`}>
                                <EditIcon fontSize="small"/>
                            </Button>
                            <Button color='inherit' size="small" component={Link} to={`/mealplan`}>
                                <CalendarTodayIcon fontSize="small"/>
                            </Button>
                            <Button component={Link} to='/' color='inherit' className='button'>
                                <HomeTwoToneIcon/>
                            </Button>
                        </>
                    ) : isMealPlanPage ? (
                        <>
                            <Typography variant='h6' component='div' sx={{ flexGrow: 1}} className='title'> 
                                Meal Plan 
                            </Typography>
                            
                            <Button color='inherit' size="small" component={Link} to={`/add-recipe`}>
                                <EditIcon fontSize="small"/>
                            </Button>
                            <Button color='inherit' size="small" component={Link} to={`/shopping-list`}>
                                <AddShoppingCartIcon fontSize="small"/>
                            </Button>
                            <Button component={Link} to='/' color='inherit' className='button'>
                                <HomeTwoToneIcon/>
                            </Button>
                        </>
                    ) : isAddRecipePage ? (
                        <>
                            <Typography variant='h6' component='div' sx={{ flexGrow: 1}} className='title'> 
                                Add a recipe
                            </Typography>
                            
                            
                            <Button color='inherit' size="small" component={Link} to={`/shopping-list`}>
                                <AddShoppingCartIcon fontSize="small"/>
                            </Button>
                            <Button color='inherit' size="small" component={Link} to={`/mealplan`}>
                                <CalendarTodayIcon fontSize="small"/>
                            </Button>
                            <Button component={Link} to='/' color='inherit' className='button'>
                                <HomeTwoToneIcon/>
                            </Button>
                        </>
                    ):(
                        <>
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
                            <Button color='inherit' size="small" component={Link} to={`/add-recipe`}>
                                <EditIcon fontSize="small"/>
                            </Button>
                            <Button color='inherit' size="small" component={Link} to={`/shopping-list`}>
                                <AddShoppingCartIcon fontSize="small"/>
                            </Button>
                            <Button color='inherit' size="small" component={Link} to={`/mealplan`}>
                                <CalendarTodayIcon fontSize="small"/>
                            </Button>

                        </>
                    )
                }

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;