import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={4}>
        <Toolbar sx={{ display: 'flex',justifyContent: 'space-between', bgcolor:'primary'}}>
          {/* Logo */}
          <Typography variant="h6" component="div">
            {/* <img src="/logo.jpg" alt="Company Logo" style={{ height: 70 }} /> */}
            Product Dashboard
          </Typography>
          <Box sx={{height:'full', mx:2}}>
                <IconButton color="primary">
                    <Avatar
                    alt="Remy Sharp"
                    >
                        RS
                    </Avatar>
                </IconButton>
          </Box>          
        </Toolbar>
      </AppBar>
  );
};

export default Header;
