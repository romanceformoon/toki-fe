import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const DesktopRoute = () => {
  const pages = [
    { name: 'ANALYZE', link: 'analyze' },
    { name: 'RANKING', link: 'ranking' },
    { name: '5KEYS AERY' },
    { name: 'TOOLS' }
  ];

  const subPages = {
    aery: [
      { name: '난이도표', link: 'table' },
      { name: '단위인정', link: 'skill' }
      // { name: '서열표', link: 'grade' }
    ],
    tools: [{ name: 'BMS 채보 뷰어', link: 'tools/viewer' }]
  };

  const router = useRouter();

  const [anchorElAery, setAnchorElAery] = useState<null | HTMLElement>(null);
  const [anchorElTools, setAnchorElTools] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, menu: string) => {
    switch (menu) {
      case '5KEYS AERY':
        setAnchorElAery(event.currentTarget);
        break;

      case 'TOOLS':
        setAnchorElTools(event.currentTarget);
        break;
    }
  };

  const handleCloseAeryMenu = () => {
    setAnchorElAery(null);
  };

  const handleCloseToolsMenu = () => {
    setAnchorElTools(null);
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: '1.5rem' }}>
      {pages.map(page => {
        if (page.link) {
          return (
            <Button
              key={page.name}
              onClick={() => {
                router.push(`/${page.link}`);
              }}
              sx={{ my: 2, color: 'white' }}
            >
              <Typography variant='h4'>{page.name}</Typography>
            </Button>
          );
        } else {
          return (
            <Button
              key={page.name}
              onClick={(event: React.MouseEvent<HTMLElement>) => handleOpenMenu(event, page.name)}
              sx={{ my: 2, color: 'white' }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              <Typography variant='h4'>{page.name}</Typography>
            </Button>
          );
        }
      })}

      <Menu
        sx={{ mt: '4.5rem' }}
        id='menu-appbar'
        anchorEl={anchorElAery}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElAery)}
        onClose={handleCloseAeryMenu}
      >
        {subPages.aery.map(page => (
          <MenuItem key={page.name} onClick={handleCloseAeryMenu}>
            <Typography
              variant='h4'
              onClick={async () => {
                router.push(`/${page.link}`);
              }}
            >
              {page.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      <Menu
        sx={{ mt: '4.5rem' }}
        id='menu-appbar'
        anchorEl={anchorElTools}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElTools)}
        onClose={handleCloseToolsMenu}
      >
        {subPages.tools.map(page => (
          <MenuItem key={page.name} onClick={handleCloseToolsMenu}>
            <Typography
              variant='h4'
              textAlign='center'
              onClick={async () => {
                router.push(`/${page.link}`);
              }}
            >
              {page.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
