import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import InputIcon from '@mui/icons-material/Input';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export interface ScrollableCardItem {
    id: number;
    name: string;
    children: string[];
}

export interface ScrollableCardProps {
    baseUrl: string;
    items: ScrollableCardItem[]
}

const ScrollableCard = ({ baseUrl, items }: ScrollableCardProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
    if (!items) { return null; }

    const goToPage = (destination: string) => {
        navigate(destination)
    }

    return (
        <Box
            display="flex"
            flexDirection="row"
            sx={{
                height: 1,
                flexGrow: 1,
                overflow: "auto"
            }}
        >
            <List
                sx={{
                    width: '100%',
                    borderTop: isSmall ? 0 : 1,
                    borderBottom: isSmall ? 0 : 1,
                    borderColor: theme.palette.primary.main,
                    position: 'relative',
                    overflow: 'auto',
                    mb: 2,
                    '& ul': { padding: 0 },
                }}
                subheader={<li />}
            >
                {items.map((item, idx) => {
                    return (
                        <li key={`section-${item.name}-${idx}`}>
                            <ul>
                                <Toolbar sx={{ marginBottom: 0 }}>
                                    <Typography component={"span"} sx={{ flexGrow: 1 }} color="primary">
                                        {item.name}
                                    </Typography>
                                    <IconButton color="primary" onClick={() => {goToPage(`/${baseUrl}/${item.id}`)}}>
                                        {baseUrl === "log"
                                            ? <InputIcon />
                                            : <TrendingUpIcon />
                                        }
                                    </IconButton>
                                </Toolbar>

                                {item.children && item.children.map((child, idx2) => (
                                    <ListItem key={`item-${item.name}-${idx}-${child}-${idx2}`} sx={{ py: 0.25, pl: 4, color: theme.palette.primary.main }}>{child}</ListItem>
                                ))}
                                <Divider />
                            </ul>
                        </li>
                    )
                })}
            </List>
        </Box>
    )
}

export default ScrollableCard;