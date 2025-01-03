import axios from "axios";
import { useEffect, useState } from "react";

function ImageSliderV1() {

    const [imageURLs, setImageURLs] = useState([]);
    const [imageIndex, setImageIndex] = useState(0);
    const [query, setQuery] = useState("YellowFlower");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);


    const Next = () => {
        imageIndex === imageURLs.length - 1 ? setImageIndex(0) : setImageIndex((index) => index + 1)
    }

    const Previous = () => {
        imageIndex === 0 ? setImageIndex(imageURLs.length - 1) : setImageIndex((index) => index - 1)
    }

    useEffect(() => {
        const key = '48004283-04c438227074dbfb0f3b46909';
        const url = `https://pixabay.com/api/?key=${key}&q=${query}&image_type=photo`;

        axios
            .get(url)
            .then((response) => {
                setImageURLs(response.data.hits.map((value) => value.previewURL))
                setImageIndex(0)
                setLoading(false)
            })
            .catch(() => {
                setError("Unable to Fetch URLs")
                setLoading(false)
            })

    }, [query])

    const timeoutid = setInterval(() => {
        imageIndex === imageURLs.length - 1 ? setImageIndex(0) : setImageIndex(imageIndex+1)
        return ()=>clearInterval(timeoutid)
    }, 2000)

    function ImagePreview() {
        if (error) return (<div>{error}</div>)

        return (
            <>
                <img src={imageURLs[imageIndex]} style={{
                    width: "100px",
                    height:"100px",
                    objectFit:"contain"
                }}></img>
                <button onClick={Next}>Next</button>
                <button onClick={Previous}>Previous</button>
            </>
        )
    }

    return (
        <>
            <input onChange={(e) => setQuery(e.target.value)} value={query}></input>
            {loading ? <p>loading...</p> : <ImagePreview />}
        </>
    )
}

export default ImageSliderV1