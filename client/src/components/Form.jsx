import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
  const API_URL = "http://localhost:5000/tweets";

  const [allTweets, setAllTweets] = useState([]);

  async function getAllTweets() {
    try {
      const response = await axios.get(API_URL);
      console.log(response.data);
      setAllTweets(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllTweets();
  }, []);

  const sendForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target.form);

    const name = formData.get("name");
    const content = formData.get("content");

    const tweet = {
      name,
      content,
    };

    console.log(tweet);

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(tweet),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        e.target.form.reset();
      });
  };

  return (
    <main>
      <form className="tweetForm">
        <label htmlFor="name">İsminiz</label>
        <input type="text" id="name" name="name" className="u-full-width" />

        <label htmlFor="content">Ne düşünüyorsunuz?</label>
        <textarea
          id="content"
          name="content"
          className="u-full-width"
        ></textarea>

        <button onClick={sendForm} className="button-primary submitBtn">
          Gönder
        </button>
      </form>
      <div className="tweetList">
        {allTweets.map((tweet, index) => {
          return (
            <div key={index} className="tweet">
              <h3 className="tweetName">{tweet.name}</h3>
              <p className="tweetContent">{tweet.content}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Form;
