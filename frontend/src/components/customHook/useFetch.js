import axios from 'axios'
import React, { useEffect, useState } from 'react'



export const useFetch = (url) => {
    const [store, setStore] = useState([])

    useEffect(() => {
        axios.get(url)
            .then((res) => {
                setStore(res.data)
            })
    }, [url]
)
    return [store]
}
