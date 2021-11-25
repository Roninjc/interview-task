import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import { NewCard } from './NewCard';

import { eventStartLoading } from '../actions/news';


export const NewsGrid = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch( eventStartLoading() );

    }, [ dispatch ]);

    const { news } = useSelector(state => state.news)

    return (
        <Grid container spacing={2}>
            {
                news.map( n => (
                        <Grid 
                            item xs={(window.location.pathname === "/full") ? n.width : 12}
                            key={ n.title }
                        >
                            <NewCard
                                noti={ n }
                            />
                        </Grid>
                ))
            }
        </Grid>
    )
}
