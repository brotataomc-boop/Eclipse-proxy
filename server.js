```js
import express from "express";

const app = express();
const port = process.env.PORT || 8080;

/* =========================
   HOME PAGE
========================= */

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Eclipse Proxy</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      min-height: 100vh;
      font-family: Arial, Helvetica, sans-serif;
      color: white;

      background:
        radial-gradient(
          circle at 50% 35%,
          rgba(120, 80, 255, 0.18),
          transparent 35%
        ),
        radial-gradient(
          circle at 20% 80%,
          rgba(60, 120, 255, 0.10),
          transparent 30%
        ),
        #07070b;

      overflow-x: hidden;
    }

    /* Background stars */

    .stars,
    .stars::before,
    .stars::after {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: -1;
    }

    .stars {
      background-image:
        radial-gradient(circle, rgba(255,255,255,.5) 1px, transparent 1px);
      background-size: 80px 80px;
      opacity: .18;
    }

    .stars::before {
      content: "";
      background-image:
        radial-gradient(circle, rgba(255,255,255,.4) 1px, transparent 1px);
      background-size: 130px 130px;
      transform: translate(40px, 20px);
    }

    .stars::after {
      content: "";
      background-image:
        radial-gradient(circle, rgba(255,255,255,.35) 1px, transparent 1px);
      background-size: 190px 190px;
      transform: translate(-30px, 70px);
    }

    /* Main container */

    .container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px;
    }

    .content {
      width: 100%;
      max-width: 850px;
      text-align: center;
    }

    /* Eclipse logo */

    .eclipse {
      width: 105px;
      height: 105px;
      margin: 0 auto 30px;

      border-radius: 50%;

      background: #050509;

      box-shadow:
        0 0 25px rgba(130, 90, 255, .65),
        0 0 60px rgba(90, 60, 255, .35),
        inset 0 0 25px rgba(255,255,255,.04);

      position: relative;
    }

    .eclipse::after {
      content: "";

      position: absolute;

      width: 112px;
      height: 112px;

      top: -4px;
      left: -4px;

      border-radius: 50%;

      border: 2px solid rgba(155, 120, 255, .65);

      box-shadow:
        0 0 20px rgba(140, 100, 255, .5),
        0 0 45px rgba(100, 70, 255, .25);
    }

    /* Title */

    h1 {
      font-size: clamp(42px, 8vw, 72px);
      font-weight: 700;
      letter-spacing: -2px;

      background: linear-gradient(
        135deg,
        #ffffff,
        #cfc7ff,
        #927cff
      );

      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;

      margin-bottom: 12px;
    }

    .tagline {
      color: #9998a8;
      font-size: 17px;
      margin-bottom: 38px;
    }

    /* Search */

    .search-container {
      display: flex;
      align-items: center;

      padding: 7px;

      background: rgba(255,255,255,.055);

      border: 1px solid rgba(255,255,255,.11);

      border-radius: 18px;

      backdrop-filter: blur(18px);

      box-shadow:
        0 20px 60px rgba(0,0,0,.4),
        inset 0 1px rgba(255,255,255,.05);

      transition: .25s ease;
    }

    .search-container:focus-within {
      border-color: rgba(145,115,255,.55);

      box-shadow:
        0 20px 60px rgba(0,0,0,.5),
        0 0 35px rgba(110,80,255,.14);
    }

    .search-icon {
      width: 48px;
      color: #77758a;
      font-size: 20px;
      user-select: none;
    }

    #url {
      flex: 1;

      min-width: 0;

      background: transparent;
      border: none;
      outline: none;

      color: white;

      font-size: 16px;

      padding: 16px 5px;
    }

    #url::placeholder {
      color: #6e6c7c;
    }

    .go-button {
      border: none;

      padding: 14px 24px;

      border-radius: 13px;

      color: white;

      font-size: 15px;
      font-weight: 600;

      cursor: pointer;

      background: linear-gradient(
        135deg,
        #7558ff,
        #5438d8
      );

      box-shadow:
        0 7px 20px rgba(90,60,220,.3);

      transition: .2s ease;
    }

    .go-button:hover {
      transform: translateY(-1px);

      box-shadow:
        0 10px 28px rgba(90,60,220,.45);
    }

    .go-button:active {
      transform: translateY(1px);
    }

    /* Quick links */

    .quick-links {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;

      margin-top: 22px;
    }

    .quick-link {
      border: 1px solid rgba(255,255,255,.08);

      background: rgba(255,255,255,.035);

      color: #aaa8b8;

      padding: 9px 15px;

      border-radius: 999px;

      font-size: 13px;

      cursor: pointer;

      transition: .2s ease;
    }

    .quick-link:hover {
      color: white;

      background: rgba(255,255,255,.08);

      border-color: rgba(150,130,255,.3);
    }

    /* Status */

    .status {
      display: flex;
      align-items: center;
      justify-content: center;

      gap: 8px;

      margin-top: 35px;

      color: #777585;

      font-size: 12px;
    }

    .status-dot {
      width: 7px;
      height: 7px;

      border-radius: 50%;

      background: #6ee7a0;

      box-shadow: 0 0 10px rgba(110,231,160,.7);
    }

    /* Footer */

    footer {
      position: fixed;

      bottom: 20px;
      left: 0;
      right: 0;

      text-align: center;

      color: #555361;

      font-size: 12px;
    }

    /* Loading */

    .loading {
      display: none;

      position: fixed;

      inset: 0;

      background: rgba(5,5,9,.82);

      backdrop-filter: blur(8px);

      align-items: center;
      justify-content: center;

      flex-direction: column;

      z-index: 100;
    }

    .loading.show {
      display: flex;
    }

    .loader {
      width: 42px;
      height: 42px;

      border-radius: 50%;

      border: 3px solid rgba(255,255,255,.1);

      border-top-color: #8c73ff;

      animation: spin 0.8s linear infinite;

      margin-bottom: 18px;
    }

    .loading-text {
      color: #aaa8b8;
      font-size: 14px;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Mobile */

    @media (max-width: 600px) {

      .container {
        padding: 20px;
      }

      .search-container {
        border-radius: 15px;
      }

      .search-icon {
        display: none;
      }

      #url {
        padding-left: 12px;
      }

      .go-button {
        padding: 13px 17px;
      }

      footer {
        position: static;
        margin-top: 35px;
      }
    }
  </style>
</head>

<body>

  <div class="stars"></div>

  <div class="container">

    <main class="content">

      <div class="eclipse"></div>

      <h1>Eclipse</h1>

      <p class="tagline">
        A simple, clean gateway to the web.
      </p>

      <form
        class="search-container"
        action="/proxy"
        method="GET"
        onsubmit="fixUrl(event)"
      >

        <div class="search-icon">
          ⌕
        </div>

        <input
          id="url"
          name="url"
          type="text"
          autocomplete="off"
          placeholder="Enter a website address..."
          required
        >

        <button class="go-button" type="submit">
          Go
        </button>

      </form>

      <div class="quick-links">

        <button
          class="quick-link"
          onclick="setSite('https://example.com')"
        >
          Example
        </button>

        <button
          class="quick-link"
          onclick="setSite('https://wikipedia.org')"
        >
          Wikipedia
        </button>

        <button
          class="quick-link"
          onclick="setSite('https://www.mozilla.org')"
        >
          Mozilla
        </button>

      </div>

      <div class="status">

        <span class="status-dot"></span>

        Eclipse is online

      </div>

    </main>

  </div>

  <footer>
    Eclipse Proxy • Built for the web
  </footer>

  <div class="loading" id="loading">

    <div class="loader"></div>

    <div class="loading-text">
      Loading website...
    </div>

  </div>

  <script>

    function fixUrl(event) {

      const input = document.getElementById("url");

      let url = input.value.trim();

      if (
        !url.startsWith("http://") &&
        !url.startsWith("https://")
      ) {
        url = "https://" + url;
      }

      input.value = url;

      document
        .getElementById("loading")
        .classList.add("show");
    }

    function setSite(url) {

      const input = document.getElementById("url");

      input.value = url;

      input.focus();
    }

    /* Keyboard shortcut */

    document.addEventListener("keydown", (event) => {

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "l"
      ) {

        event.preventDefault();

        document.getElementById("url").focus();

      }

    });

  </script>

</body>
</html>
  `);
});


/* =========================
   PROXY
========================= */

app.get("/proxy", async (req, res) => {

  try {

    const target = new URL(req.query.url);

    if (
      !["http:", "https:"].includes(target.protocol)
    ) {
      return res
        .status(400)
        .send("Eclipse Proxy: Only HTTP and HTTPS are supported.");
    }

    const response = await fetch(target);

    if (!response.ok) {

      return res
        .status(response.status)
        .send(
          \`Eclipse Proxy: The website returned \${response.status}.\`
        );

    }

    const contentType =
      response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {

      return res
        .status(415)
        .send(
          "Eclipse Proxy: This version only supports HTML pages."
        );

    }

    const html = await response.text();

    res.set("Content-Type", "text/html");

    res.send(html);

  } catch (error) {

    console.error(error);

    res
      .status(400)
      .send(
        "Eclipse Proxy: Could not load that website."
      );

  }

});


/* =========================
   START SERVER
========================= */

app.listen(port, "0.0.0.0", () => {

  console.log(
    \`Eclipse Proxy is running on port \${port}\`
  );

});
```
