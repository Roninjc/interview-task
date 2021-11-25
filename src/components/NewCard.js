import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Fade,
    IconButton,
    InputBase,
    Paper,
    Typography,
} from '@mui/material';
import Link from '@material-ui/core/Link';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { styled } from '@mui/system';

import { useWindowSize } from '../hooks/useWindowsSize';
import { startNewsDelete } from '../actions/news';




const MyComponent = styled('div')({
    padding: "0 10px 0 10px",
    transform: "translate(0, -65px)"
});

export const NewCard = (noticia) => {

    const { noti } = noticia;

    const dispatch = useDispatch();

    const { width } = useWindowSize();

    const imageWidth = (noti.width / 12) * width;
    // const imageWidth = ((noti.width / 12) * width) / 2;
    const newImageUrl = noti.imageUrl.concat("&width=", imageWidth);
    noti.imageUrl = newImageUrl;

    const [edit, setEdit] = useState(false);
    const [check, setCheck] = useState(false);

    const handleEditClick = () => {
        setCheck( !check );
        setEdit( !edit );
    };

    const [title, setTitle] = useState(noti.title);
    const handleInputChanges = (event) => {
        setTitle(event.target.value);
        noti.title = event.target.value;
    }

    const handleDeleteTitle = () => {
        setTitle("");
        noti.title = "";
    }

    const handleRemoveNew = () => {
        dispatch( startNewsDelete(noti.title) );
    }
    
    return (
        <Card
            sx={{
                height: "100%",
                position: "relative"
            }}
        >
            <CardActionArea
                disabled={edit}
            >
                <Link underline='none' component={RouterLink} to={ noti.url }>
                    {
                        (window.location.pathname === "/full") ? 
                        <CardMedia
                            component="img"
                            height="250"
                            image={noti.imageUrl}
                            alt="green iguana"
                        /> : ""
                    }
                    <Box
                    >
                        <CardContent>
                            <Fade
                                in={!edit}
                            >
                                <Typography
                                    gutterBottom variant="h5"
                                    component="div"
                                    color="text.primary"
                                >
                                    {noti.title}
                                </Typography>
                            </Fade>
                        </CardContent>
                    </Box>
                </Link>
            </CardActionArea>
            <MyComponent >
                <Fade
                    in={edit}
                >
                    <Paper
                        component="form"
                        sx={{ 
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder={noti.title}
                            inputProps={{ 'aria-label': 'search google maps', style: {fontSize: "1.5rem"} }}
                            value={ title || noti.title }
                            onChange={ handleInputChanges }
                            multiline
                        />
                        <IconButton
                            sx={{ p: '10px' }}
                            aria-label="search"
                            onClick={ handleDeleteTitle }
                        >
                            <CancelRoundedIcon />
                        </IconButton>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton
                            color="primary"
                            sx={{ p: '10px' }}
                            aria-label="directions"
                            onClick={ handleEditClick }
                        >
                            <CheckCircleRoundedIcon />
                        </IconButton>
                    </Paper>
                </Fade>
            </MyComponent>
            <CardActions
                sx={{
                    position: "absolute",
                    bottom: 0,
                }}
            >
                <Button size="small" color="primary" onClick={ handleEditClick }>
                    {(edit) ? "Close edit" : "Edit title"}
                </Button>
                <Button
                    size="small"
                    color="error"
                    onClick={ handleRemoveNew }
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    )
}
