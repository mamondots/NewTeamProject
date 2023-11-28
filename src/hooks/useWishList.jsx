import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useWishList = () => {
    const {data: information=[],refetch} = useQuery({
        queryKey:['information'],
        queryFn:async() =>{
            const res = await fetch('https://litl-pal-server-margubtech-gmailcom.vercel.app/api/user-wishlist')
            return res.json()
        }
    })
    return [information,refetch]
};

export default useWishList;