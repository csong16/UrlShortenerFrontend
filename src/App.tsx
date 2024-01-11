import { useState } from 'react'
import './App.css'

const URL_BASE = window.location.host

function App() {
  let [inputUrl, setInputUrl] = useState("")
  let [shortenedUrl, setShortenedUrl] = useState("")

  function bottonClick(){
    const api = "/api/urlshortener"
    const formData = {
      url: inputUrl
    }
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify(formData), // Convert the data to JSON format
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((result) => {
      setShortenedUrl(URL_BASE + "/j/" + result.data.id)
      console.log('POST response:', result);
    })
    .catch((error) => {
      console.error('There was a problem with the POST request:', error);
    });

  }
  return (
    <>
    <h1>URL Shortener</h1>
    <div>
    <label htmlFor='yourUrl'>Your Url:</label>
    <input id='yourUrl' value={inputUrl} onChange={(e) => {setInputUrl(e.target.value)}}/>
    </div>
    <button onClick={bottonClick}> Generate Url</button>
    <div>
    <label htmlFor='shortUrl' >Short Url:</label>
    <input id='shortUrl' value={shortenedUrl} onChange={(e) => {setShortenedUrl(e.target.value)}}/>
    </div>
      
    </>
  )
}

export default App
