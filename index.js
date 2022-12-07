// const superagent = require("superagent");

import request from "request";
import superagent from "superagent";
import fs from "fs";
import axios from "axios";
import cheerio from "cheerio";

const download = (uri, filename, callback) => {
  const requestOptions = {
    method: "get",
    uri,
    headers: { "User-Agent": "Mozilla/5.0" },
    endocing: null,
  };

  request(requestOptions).pipe(fs.createWriteStream(filename));
};

const run = async () => {
  try {
    const res = await superagent
      .get("https://www.instagram.com/p/Cl0CyiIBTGZ/")
      .set(
        "sec-ch-ua",
        '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"'
      )
      .set("sec-ch-ua-mobile", "?0")
      .set("sec-ch-ua-platform", "macOS")
      .set("sec-fetch-dest", "empty")
      .set("sec-fetch-mode", "cors")
      .set(
        "user-agent",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
      )
      .set("sec-fetch-site", "same-origin");

    const splitText = res.text.split("instagram://media?id=");
    const dIndex = splitText[1].split('" />');
    console.log(dIndex[0]);

    const d = await superagent
      .get(`https://www.instagram.com/api/v1/media/${dIndex[0]}/info/`)
      .set("accept", "*/*")
      .set("accept-encoding", "gzip, deflate, br")
      .set("accept-language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7")
      .set(
        "cookie",
        "mid=Ys2mBwAEAAGjzgh0RLHfYNpLpMMs; ig_did=021C6D0A-E6F8-41BB-B993-6E915C6AA094; ig_nrcb=1; fbm_124024574287414=base_domain=.instagram.com; ds_user_id=50891905995; csrftoken=3pObqN7rZ6Mx1q3pCxjqzX0c4wDY9WzD; sessionid=50891905995%3AetCGxAETAnTPgZ%3A12%3AAYcvVRTPblKbIoZIYGalL6Z5ruJ7P7RrstKNmz8H6A;"
      )
      .set("sec-ch-prefers-color-scheme", "dark")
      .set(
        "sec-ch-ua",
        '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"'
      )
      .set("sec-ch-ua-mobile", "?0")
      .set("sec-ch-ua-platform", "macOS")
      .set("sec-fetch-dest", "empty")

      .set("sec-fetch-mode", "cors")
      .set("sec-fetch-site", "same-origin")
      .set(
        "user-agent",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
      )
      .set("viewport-width", "687")
      .set("x-asbd-id", "198387")
      .set("x-csrftoken", "3pObqN7rZ6Mx1q3pCxjqzX0c4wDY9WzD")
      .set("x-ig-app-id", "936619743392459")
      .set(
        "x-ig-www-claim",
        "hmac.AR0FUTibCtoJGCFWobLuluNJFMqtexXionzDURojc6Rx4nMx"
      )
      .set("x-instagram-ajax", "1006680798")
      .set("x-requested-with", "XMLHttpRequest");

    const originalUrl = d._body.items[0].video_versions[0].url;
    const pk = d._body.items[0].caption.pk;
    const content = d._body.items[0].caption.text;
    console.log("originalUrl: ", originalUrl);

    const f = originalUrl.split("?");

    const reF = f[1].replaceAll("/", "%2F");

    const url = `${f[0]}?${reF}`;

    download(url, `${pk}.mp4`, () => {
      console.log(`${pk}.mp4 done`);
    });

    console.log(content);
    console.log("Done!");
  } catch (e) {
    console.log("error");
    console.log(e);
  }
};

run();
