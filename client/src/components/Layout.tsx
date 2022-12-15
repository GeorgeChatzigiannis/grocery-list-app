import * as React from 'react';
import { AppBar, Toolbar, Typography, Paper } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = React.memo(({ children }: LayoutProps) => (
  <Paper
    elevation={0}
    style={{padding: 0, margin: 0, backgroundColor: '#fafafa'}}
  >
    <AppBar position="static" style={{height: 64, backgroundColor: '#1795d4'}}>
      <Toolbar style={{height: 64}}>
        <div style={{ width: 100, paddingRight: 15 }}>
          <img
            className="logo"
            src="src/assets/logo.png"
            alt="Logo"
          />
        </div>
        <Typography color="inherit">GROCERY LIST</Typography>
      </Toolbar>
    </AppBar>
    {children}
  </Paper>
));

export default Layout;