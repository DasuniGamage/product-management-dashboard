import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar 
    position="fixed" 
    color="transparent" 
    elevation={4} 
     sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(10px)', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}>
        <Toolbar sx={{ display: 'flex',justifyContent: 'space-between', bgcolor:'primary'}}>
          {/* Logo */}
          <Typography variant="h6" component="div">
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
