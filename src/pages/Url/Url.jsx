import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import api from '../../utils/api'

const Url = () => {
    const params = useParams();
    const [error, setError] = useState('')
    const formatUrl = (url) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url
        }

        return `https://${url}`
    }

    useEffect(() => {
        api.get(`/${params.key}`).then(res => {
            window.location.replace(formatUrl(res.data.url))
        }).catch(err => {
            setError('Invalid key')
        })
    })

    return (
        <span>
            { error }
        </span>
    )


}

export default Url;