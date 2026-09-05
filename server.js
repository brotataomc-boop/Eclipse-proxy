import express from "express";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));

// ===============================
// HOME PAGE
// ===============================

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
        radial-gradient(circle at 50% 20%, #18203b 0%, #090b16 40%, #03040a 100%);
      overflow-x: hidden;
    }

    /* ===============================
       STAR BACKGROUND
       =============================== */

    .stars,
    .stars2,
    .stars3 {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }

    .stars {
      background-image:
        radial-gradient(1px 1px at 20px 30px, white, transparent),
        radial-gradient(1px 1px at 80px 100px, white, transparent),
        radial-gradient(1px 1px at 160px 40px, white, transparent),
        radial-gradient(1px 1px at 240px 180px, white, transparent),
        radial-gradient(1px 1px at 320px 80px, white, transparent),
        radial-gradient(1px 1px at 400px 200px, white, transparent),
        radial-gradient(1px 1px at 500px 50px, white, transparent),
        radial-gradient(1px 1px at 600px 140px, white, transparent),
        radial-gradient(1px 1px at 700px 20px, white, transparent),
        radial-gradient(1px 1px at 800px 160px, white, transparent);
      background-size: 900px 300px;
      opacity: 0.45;
    }

    .stars2 {
      background-image:
        radial-gradient(1px 1px at 40px 140px, white, transparent),
        radial-gradient(1px 1px at 130px 220px, white, transparent),
        radial-gradient(1px 1px at 230px 60px, white, transparent),
        radial-gradient(1px 1px at 350px 240px, white, transparent),
        radial-gradient(1px 1px at 470px 120px, white, transparent),
        radial-gradient(1px 1px at 580px 260px, white, transparent),
        radial-gradient(1px 1px at 690px 100px, white, transparent),
        radial-gradient(1px 1px at 820px 210px, white, transparent);
      background-size: 950px 350px;
      opacity: 0.25;
    }

    .stars3 {
      background-image:
        radial-gradient(2px 2px at 150px 150px, white, transparent),
        radial-gradient(2px 2px at 450px 250px, white, transparent),
        radial-gradient(2px 2px at 750px 100px, white, transparent);
      background-size: 1000px 400px;
      opacity: 0.2;
    }

    /* ===============================
       MAIN
       =============================== */

    .container {
      position: relative;
      z-index: 1;

      min-height: 100vh;

      display: flex;
      flex-direction: column;
      align-items: center;

      padding: 70px 20px 30px;
    }

    /* ===============================
       LOGO
       =============================== */

    .logo {
      width: 105px;
      height: 105px;

      border-radius: 50%;

      background:
        radial-gradient(
          circle at 35% 35%,
          #202944 0%,
          #101526 45%,
          #05070e 70%
        );

      box-shadow:
        0 0 20px rgba(115, 145, 255, 0.45),
        0 0 60px rgba(90, 110, 255, 0.18);

      position: relative;

      margin-bottom: 25px;
    }

    .logo::before {
      content: "";

      position: absolute;

      inset: -7px;

      border-radius: 50%;

      border: 3px solid rgba(155, 170, 255, 0.75);

      box-shadow:
        0 0 20px rgba(120, 140, 255, 0.6),
        inset 0 0 15px rgba(120, 140, 255, 0.3);
    }

    .logo::after {
      content: "";

      position: absolute;

      width: 65px;
      height: 65px;

      border-radius: 50%;

      background: #03040a;

      top: 20px;
      left: 20px;

      box-shadow:
        0 0 20px rgba(0, 0, 0, 0.9);
    }

    /* ===============================
       TITLE
       =============================== */

    h1 {
      font-size: clamp(42px, 8vw, 75px);

      font-weight: 800;

      letter-spacing: -2px;

      background:
        linear-gradient(
          90deg,
          #9ea9ff,
          #d9ddff,
          #8a96ff
        );

      -webkit-background-clip: text;
      background-clip: text;

      color: transparent;

      text-align: center;

      text-shadow:
        0 0 25px rgba(125, 140, 255, 0.25);

      margin-bottom: 10px;
    }

    .subtitle {
      color: #9da5c3;

      font-size: 17px;

      text-align: center;

      margin-bottom: 45px;
    }

    /* ===============================
       SEARCH BOX
       =============================== */

    .search-box {
      width: min(760px, 100%);

      display: flex;

      gap: 10px;

      padding: 9px;

      background: rgba(15, 19, 35, 0.8);

      border: 1px solid rgba(125, 140, 255, 0.25);

      border-radius: 18px;

      box-shadow:
        0 15px 50px rgba(0, 0, 0, 0.35),
        0 0 30px rgba(90, 110, 255, 0.08);

      backdrop-filter: blur(15px);

      margin-bottom: 25px;
    }

    .search-box input {
      flex: 1;

      min-width: 0;

      border: none;

      outline: none;

      padding: 17px 18px;

      border-radius: 12px;

      background: rgba(255, 255, 255, 0.05);

      color: white;

      font-size: 16px;
    }

    .search-box input::placeholder {
      color: #747c99;
    }

    .search-box button {
      border: none;

      border-radius: 12px;

      padding: 0 25px;

      font-size: 16px;

      font-weight: 700;

      color: white;

      cursor: pointer;

      background:
        linear-gradient(
          135deg,
          #6674ff,
          #8b5cf6
        );

      box-shadow:
        0 5px 20px rgba(100, 110, 255, 0.25);

      transition:
        transform 0.2s,
        box-shadow 0.2s;
    }

    .search-box button:hover {
      transform: translateY(-2px);

      box-shadow:
        0 8px 25px rgba(100, 110, 255, 0.4);
    }

    /* ===============================
       STATUS
       =============================== */

    .status {
      display: flex;

      align-items: center;

      gap: 8px;

      color: #9da5c3;

      font-size: 14px;

      margin-bottom: 45px;
    }

    .status-dot {
      width: 9px;
      height: 9px;

      border-radius: 50%;

      background: #6ee7b7;

      box-shadow:
        0 0 12px rgba(110, 231, 183, 0.8);
    }

    /* ===============================
       QUICK LINKS
       =============================== */

    .quick-title {
      color: #8e96b2;

      font-size: 13px;

      text-transform: uppercase;

      letter-spacing: 2px;

      margin-bottom: 15px;
    }

    .quick-links {
      display: flex;

      flex-wrap: wrap;

      justify-content: center;

      gap: 12px;

      width: min(760px, 100%);
    }

    .quick-links button {
      border: 1px solid rgba(140, 150, 210, 0.18);

      background: rgba(255, 255, 255, 0.035);

      color: #cbd0e6;

      padding: 11px 18px;

      border-radius: 10px;

      cursor: pointer;

      transition:
        background 0.2s,
        transform 0.2s,
        border-color 0.2s;
    }

    .quick-links button:hover {
      background: rgba(130, 140, 255, 0.1);

      border-color: rgba(130, 140, 255, 0.4);

      transform: translateY(-2px);
    }

    /* ===============================
       FOOTER
       =============================== */

    footer {
      margin-top: auto;

      padding-top: 60px;

      color: #5f6680;

      font-size: 13px;

      text-align: center;
    }

    /* ===============================
       LOADING
       =============================== */

    .loading {
      position: fixed;

      inset: 0;

      z-index: 10;

      display: none;

      align-items: center;

      justify-content: center;

      background: rgba(3, 4, 10, 0.8);

      backdrop-filter: blur(8px);
    }

    .loading.active {
      display: flex;
    }

    .loader {
      width: 50px;
      height: 50px;

      border-radius: 50%;

      border: 4px solid rgba(255, 255, 255, 0.1);

      border-top-color: #8b96ff;

      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* ===============================
       MOBILE
       =============================== */

    @media (max-width: 600px) {

      .container {
        padding-top: 45px;
      }

      .logo {
        width: 85px;
        height: 85px;
      }

      .logo::after {
        width: 53px;
        height: 53px;

        top: 16px;
        left: 16px;
      }

      .search-box {
        flex-direction: column;
      }

      .search-box button {
        padding: 15px;
      }

      .subtitle {
        font-size: 15px;
      }
    }

  </style>
</head>

<body>

  <div class="stars"></div>
  <div class="stars2"></div>
  <div class="stars3"></div>

  <main class="container">

    <div class="logo"></div>

    <h1>Eclipse Proxy</h1>

    <p class="subtitle">
      A simple and elegant web proxy
    </p>

    <form
      class="search-box"
      action="/proxy"
      method="GET"
      onsubmit="return fixUrl(event)"
    >

      <input
        id="url"
        name="url"
        type="text"
        placeholder="Enter a website URL..."
        autocomplete="off"
        spellcheck="false"
      >

      <button type="submit">
        Go
      </button>

    </form>

    <div class="status">
      <span class="status-dot"></span>
      Eclipse is online
    </div>

    <div class="quick-title">
      Quick Links
    </div>

    <div class="quick-links">

      <button
        type="button"
        onclick="setSite('https://example.com')"
      >
        Example
      </button>

      <button
        type="button"
        onclick="setSite('https://wikipedia.org')"
      >
        Wikipedia
      </button>

      <button
        type="button"
        onclick="setSite('https://developer.mozilla.org')"
      >
        MDN
      </button>

    </div>

    <footer>
      Eclipse Proxy • Educational Web Proxy
    </footer>

  </main>

  <div class="loading" id="loading">
    <div class="loader"></div>
  </div>

  <script>

    function fixUrl(event) {

      const input = document.getElementById("url");

      let url = input.value.trim();

      if (!url) {
        event.preventDefault();

        input.focus();

        return false;
      }

      if (
        !url.startsWith("http://") &&
        !url.startsWith("https://")
      ) {
        url = "https://" + url;
      }

      input.value = url;

      document.getElementById("loading").classList.add("active");

      return true;
    }

    function setSite(url) {

      const input = document.getElementById("url");

      input.value = url;

      input.focus();

    }

    document.addEventListener("keydown", function(event) {

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


// ===============================
// PROXY
// ===============================

app.get("/proxy", async (req, res) => {

  const rawUrl = req.query.url;

  if (!rawUrl || typeof rawUrl !== "string") {

    return res
      .status(400)
      .send("Eclipse Proxy: Please enter a website URL.");

  }

  let target;

  try {

    target = new URL(rawUrl);

  } catch {

    return res
      .status(400)
      .send("Eclipse Proxy: That is not a valid URL.");

  }

  // Only allow normal web URLs.
  if (
    target.protocol !== "http:" &&
    target.protocol !== "https:"
  ) {

    return res
      .status(400)
      .send("Eclipse Proxy: Only HTTP and HTTPS URLs are supported.");

  }

  try {

    const response = await fetch(target);

    if (!response.ok) {

      return res
        .status(response.status)
        .send(
          "Eclipse Proxy: The website returned " +
          response.status +
          "."
        );

    }

    const contentType =
      response.headers.get("content-type") || "";

    /*
      This simple version is designed for HTML pages.
      Other file types are not rewritten.
    */

    if (!contentType.includes("text/html")) {

      return res
        .status(415)
        .send(
          "Eclipse Proxy: This version currently supports HTML pages."
        );

    }

    const html = await response.text();

    res.set(
      "Content-Type",
      "text/html; charset=utf-8"
    );

    res.send(html);

  } catch (error) {

    console.error(error);

    res
      .status(500)
      .send(
        "Eclipse Proxy: Unable to load that website."
      );

  }

});


// ===============================
// START SERVER
// ===============================

app.listen(port, "0.0.0.0", () => {

  console.log(
    "Eclipse Proxy is running on port " +
    port
  );

});
