import { useEffect } from "react";
import  { useState } from "react"
import axios from "axios"
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import "./App.css"
import { debounce } from "lodash";

const imageSliderV2 = () => {
  const [imageURLs, setImageURLs] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [timeout, setTimeoutId] = useState(null)
  const [query, setQuery] = useState("yellow+flower")


  useEffect(() => {
    const key = '48004283-04c438227074dbfb0f3b46909';
    const url = `https://pixabay.com/api/?key=${key}&q=${query}&image_type=photo`;
    if (!query.trim()) return
    axios
      .get(url)
      .then((response) => {
        setImageURLs(response.data.hits.map((value) => { return value.previewURL }))
        setImageIndex(0)
        console.log("Fresh Image URLS", response.data.hits)
        setLoading(false)
      })
      .catch(() => {
        setError("Unable to fetch URLs")
        setLoading(false)
      })
  }, [query])

  const clearExistingTimeout = () => {
    clearTimeout(timeout)
    setTimeoutId(null)
  }

  console.log("Cached Image URLS", imageURLs)

  const previousImage = () => {

    if (timeout) return;
    const timeoutId = setTimeout(() => {
      console.log("Previous Image")
      imageIndex === 0 ? setImageIndex(imageURLs.length - 1) : setImageIndex((index) => index - 1)
      clearExistingTimeout()
      console.log(imageURLs[imageIndex])
    }, 300)
    setTimeoutId(timeoutId)
  }

  const nextImage = () => {
    if (timeout) return;
    const timeoutId = setTimeout(() => {
      console.log("Next Image")
      imageIndex === imageURLs.length - 1 ? setImageIndex(0) : setImageIndex((index) => index + 1)
      clearExistingTimeout()
    }, 300)
    setTimeoutId(timeoutId)
  }

  const Image = () => (<>
    <img src={imageURLs[imageIndex]} alt={imageIndex} style={{
      border: "solid",
      borderColor: "blue",
      objectFit: "cover",
      width: "100px",
      height: "100px"
    }}></img></>)

  function ImagePreview() {
    return (
      <>
        {error ? <p>{error}</p> :
          imageURLs.length === 0 ? <p>No Images to preivew</p> : <div className="Imagecontainer">
            <div
              onPointerEnter={() => { previousImage() }}
              onPointerLeave={() => { clearExistingTimeout() }}
            ><SlArrowLeft /></div>
            <Image />
            <div
              onPointerEnter={() => { nextImage() }}
              onPointerLeave={() => { clearExistingTimeout() }}
            ><SlArrowRight /></div>
          </div>}
      </>
    )
  }

  const handleQueryChange = debounce((e) => {
    setQuery((e.target.value).replace(" ", "+"))
  }, 500)

  return (
    <>
      {loading ? <p>Loading......</p> : <ImagePreview />}
      <input onChange={handleQueryChange} ></input>
    </>
  )
}

export default imageSliderV2