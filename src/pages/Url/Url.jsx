import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const Url = () => {
    const params = useParams();
    const [error, setError] = useState('')
    console.log(params)
    const formatUrl = (url) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url
        }

        return `https://${url}`
    }

    useEffect(() => {
        axios.get(`https://fasturlshortenerapi.azurewebsites.net/${params.key}`).then(res => {
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