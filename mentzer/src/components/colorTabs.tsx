import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

export interface ColorTabsProps {
  route: string
}

const ColorTabs = (props: ColorTabsProps) => {
  const [value, setValue] = React.useState(props.route);
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue)
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="/" label="Home" />
        <Tab value="/outlines/" label="Outlines" />
        <Tab value="/records" label="Records" />
        <Tab value="/profile/" label="Profile (will remove this)" />
      </Tabs>
    </Box>
  );
}

export default ColorTabs;