import express from "express";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Eclipse Proxy</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background: #111;
            color: white;
          }

          h1 {
            font-size: 42px;
          }

          input {
            width: 70%;
            max-width: 600px;
            padding: 14px;
            border-radius: 8px;
            border: none;
            font-size: 16px;
          }

          button {
            padding: 14px 22px;
            margin-left: 8px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
          }
        </style>
      </head>

      <body>
        <h1>🌑 Eclipse Proxy</h1>

        <p>Enter a website address below.</p>

        <form action="/proxy" method="GET">
          <form action="/proxy" method="GET" onsubmit="fixUrl(event)">
  <input
    id="url"
    name="url"
    type="text"
    placeholder="Enter a website..."
    required
  >

  <button type="submit">Go</button>
</form>

<script>
  function fixUrl(event) {
    const input = document.getElementById("url");
    let url = input.value.trim();

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    input.value = url;
  }
</script>

          <button type="submit">Go</button>
        </form>
      </body>
    </html>
  `);
});

app.get("/proxy", async (req, res) => {
  try {
    const target = new URL(req.query.url);

    if (!["http:", "https:"].includes(target.protocol)) {
      return res.status(400).send("Eclipse Proxy: Only HTTP and HTTPS are supported.");
    }

    const response = await fetch(target);

    if (!response.ok) {
      return res
        .status(response.status)
        .send(`Eclipse Proxy: The website returned ${response.status}.`);
    }

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return res
        .status(415)
        .send("Eclipse Proxy: This version only supports HTML pages.");
    }

    const html = await response.text();

    res.set("Content-Type", "text/html");
    res.send(html);

  } catch (error) {
    console.error(error);

    res
      .status(400)
      .send("Eclipse Proxy: Could not load that website.");
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Eclipse Proxy is running on port ${port}`);
});
