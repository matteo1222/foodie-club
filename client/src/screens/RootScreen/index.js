import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../constants/theme'
import { COLORS } from '../../constants/colors'
import { Link as RouterLink } from 'react-router-dom';
import './index.css'

const drawerWidth = 240;

function RootScreen(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button component={RouterLink} to='/join-a-group' key='Join a Group'>
          <ListItemIcon>
            <GroupAddIcon sx={{color: COLORS.white}} />
          </ListItemIcon>
          <ListItemText primary='Join a Group' />
        </ListItem>
        <ListItem button component={RouterLink} to='/start-a-group' key='Start a Group'>
          <ListItemIcon>
            <RestaurantIcon sx={{color: COLORS.white}} />
          </ListItemIcon>
          <ListItemText primary='Start a Group' />
        </ListItem>
        <ListItem button component={RouterLink} to='/my-groups' key='My Groups'>
          <ListItemIcon>
            <GroupsIcon sx={{color: COLORS.white}} />
          </ListItemIcon>
          <ListItemText primary='My Groups' />
        </ListItem>
        <ListItem button key='Preferences'>
          <ListItemIcon>
            <FavoriteIcon sx={{color: COLORS.white}} />
          </ListItemIcon>
          <ListItemText primary='Preferences' />
        </ListItem>
        <ListItem button component={RouterLink} to='/profile'  key='Profile'>
          <ListItemIcon>
            <AccountBoxIcon sx={{color: COLORS.white}} />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </ListItem>
        <ListItem button key='Log out' sx={{'&.MuiListItem-root': {marginTop: 35}}}>
          <ListItemIcon>
            <LogoutIcon sx={{color: COLORS.white}} />
          </ListItemIcon>
          <ListItemText primary='Log out' />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar sx={{ display: { md: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6" noWrap component="div">
              Join a Group
            </Typography> */}
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, color: COLORS.white, background: 'linear-gradient(135deg, var(--red) 0%, var(--yellow) 100%)' },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, color: COLORS.white, background: 'linear-gradient(135deg, var(--red) 0%, var(--yellow) 100%)' },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default RootScreen;