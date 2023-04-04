import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState();
  const [results, setResults] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setInput("");
      const text1 = <p className={styles.paragraphs}><b>You: </b>{input}</p>;
      const text2 = <p className={styles.paragraphs}><b>AIrtist: </b>{data.result}</p>;
      setResults(results => [...results, text1]);
      setResults(results => [...results, text2]);
      
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.total}>
      <Head>
        <title>Artioma</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <video autoPlay muted loop className={styles.backgroundVideo}>
            <source src="background.mp4" type="video/mp4"></source>
      </video>

      <main className={styles.main}>
        <img src="/artioma.png" className={styles.icon} />
        <div className={styles.resultContainer}>
          <div className={styles.topBar}></div>
          <div className={styles.results}>
            {
              results
            }
          </div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="animal"
              placeholder="Let's talk about art!"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
          <div className={styles.bottomBar}></div>
        </div>
      </main>
    </div>
  );
}
