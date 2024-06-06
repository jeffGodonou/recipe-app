import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.scss';

const SearchBar = ({ value, onChange, onSearch }) => {
    return (
        <TextField
            variant="outlined"
            width = '20%'
            value={value}
            onChange={onChange}
            placeholder="Search for recipes"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={onSearch}>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchBar;