import Swal from "sweetalert2";

import { fetchEvents } from "../helpers/fetch";
import { types } from '../types/types';


export const eventStartLoading = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchEvents();
            const body = await resp.json();

            // for (const key in body) {
                //     for
                // }
            const rows = body[0];
            const columnsData = [];
            for ( let i = 0; i < rows.length; i++ ) {
                columnsData.push( rows[i].columns );
            }
            const newsData = [];
            for ( let j = 0; j < columnsData.length; j++ ) {
                columnsData[j].map( n => newsData.push(n));
            }

            dispatch( newsLoaded( newsData ) );

        } catch (error) {
            console.log(error);
        }
    }
};

const newsLoaded = ( news ) => ({
    type: types.newsLoaded,
    payload: news
});

export const startNewsDelete = ( title ) => {
    return async(dispatch) => {
        const resp = await Swal.fire({
            icon: 'warning',
            title: 'The new is gonna be deleted!',
            text: 'Are you sure?',
            showDenyButton: true,
            denyButtonText: 'Cancel',
            denyButtonColor: 'grey',
            confirmButtonText: 'Delete',
            confirmButtonColor: 'orange',
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        console.log(resp);
        if (resp.isConfirmed || resp.dismiss === "timer") {
            dispatch( newsDeleted( title ) );
        }
    }
};

const newsDeleted = ( title ) => ({
    type: types.newsDeleted,
    payload: title
});
