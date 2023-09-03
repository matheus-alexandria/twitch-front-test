import { useEffect } from "react";

const client_id = import.meta.env.VITE_CLIENT_ID;
const api_url = import.meta.env.VITE_API_URL;
const state = 'djkasjdaskldalsdaklsdaskldlkasdklasjlfjk'
const scope = 'channel%3Amanage%3Apolls+channel%3Aread%3Apolls'
const url = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${api_url}&scope=${scope}&state=${state}`

function App() {
  async function saveRefreshToken(code: string) {
    const response = await fetch('http://localhost:9003/twitch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
      })
    });

    console.log(response.json());
  }

  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);

    const code = url.searchParams.get('code');
    if (code) {
      // history.pushState({}, document.title, window.location.pathname);
      saveRefreshToken(code);
    }
  }, []);

  return (
    <div style={{
      margin: "10px",
      width: "100%",
      height: "100vh",
      overflow: 'hidden',
    }}>
      {/* <button onClick={() => setCount((c) => c + 1)} >{`Click ${count}`}</button> */}
      <a style={{ fontSize: 50 }} href={url}>Click</a>
    </div>
  )
}

export default App
