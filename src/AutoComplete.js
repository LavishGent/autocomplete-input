import React from "react";
import { Box, Popover, TextField, Button, Typography } from "@mui/material";
import { FixedSizeList as List } from "react-window";
// Material UI Input, Dialog, List
//! Prop Merging
// flexible display option e.x Option for only pictures or only strings
//! React Children 
//? Algo for sorting
//TODO Start at Binary Search

const AutoComplete = ({ suggestions }) => {
  const [input, setInput] = React.useState("");
  const [filteredSuggestions, setFilteredSuggestions] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    setFilteredSuggestions(
      suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [input]);

  const open = Boolean(anchorEl);

  const handleChange = (e) => {
    setInput(e.target.value);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSuggestionClick = (e) => {
    setInput(e.target.innerText);
    setAnchorEl(null);
    setFilteredSuggestions(null);
  };

  return (
    <Box>
      <div>
        <TextField label="Search..." value={input} onChange={handleChange} />
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          disableAutoFocus={true}
          disableEnforceFocus={true}
        >
          {input !== "" && (
            <List
              innerElementType="ul"
              itemCount={filteredSuggestions.length}
              itemSize={20}
              height={100}
              width={230}
            >
              {({ index, style }) => {
                console.log(style)
                return (
                  <Typography sx={{ p: 2 }} key={index} style={style} onClick={handleSuggestionClick}>
                    {filteredSuggestions[index]}
                  </Typography>
                );
              }}
            </List>
          )}
        </Popover>
      </div>
    </Box>
  );
};

export default AutoComplete;
