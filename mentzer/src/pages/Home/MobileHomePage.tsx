import { useState } from "react";
import { AppBar, Box, Chip, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import OutlineList from "./components/OutlineList";
import ExerciseList from "./components/ExerciseList";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3, background: "black" }}>
            <Typography component={'div'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

const MobileHomePage = () => {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleTabChange = (event: any, newValue: any) => {
        setValue(newValue);
    }

    return (
      <Box sx={{ height: "100vh", backgrorund: "black " }}>
          <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
          >
              <AppBar position="static">
                  <Tabs
                      value={value}
                      onChange={handleTabChange}
                      indicatorColor="secondary"
                      textColor="inherit"
                      variant="fullWidth"
                      aria-label="full width tabs example"
                      sx={{
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                  >
                      <Tab label="Outlines" />
                      <Tab label="Exercises" />
                  </Tabs>
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <OutlineList />
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <ExerciseList />
                  </TabPanel>
              </AppBar>
          </Box>
      </Box>
    )
}

export default MobileHomePage;