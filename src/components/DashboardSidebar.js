import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  ShoppingBag as ShoppingBagIcon, Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';

const items = [
  // {
  //   href: '/app/ships',
  //   icon: BarChartIcon,
  //   title: 'Ships'
  // },
  {
    href: '/app/systems',
    icon: ShoppingBagIcon,
    title: 'Systems',
  },
  {
    href: '/app/route-research',
    icon: ShoppingBagIcon,
    title: 'Route Research',
  },
  {
    href: '/app/users',
    icon: UsersIcon,
    title: 'Users'
  },
  // {
  //   href: '/app/automation',
  //   icon: UserIcon,
  //   title: 'Automation'
  // },
  // {
  //   href: '/app/market-data',
  //   icon: ShoppingBagIcon,
  //   title: 'Market Data',
  // },
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Typography
          color="textPrimary"
          variant="h5"
        >
          SpaceMonger
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
