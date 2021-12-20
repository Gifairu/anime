import got from "got";
import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ecchi = async () => {
  try {
    const { body } = await got("https://www.reddit.com/r/ecchi/new.json");
    const body_parse = JSON.parse(body);
    const data_parse = body_parse.data.children;

    const data_bot = {
      bot_api: "5023380526:AAFsj3wXu21e8tawtaLXNc28nFNtz7FhbOE",
      channel_id: "@assdsadsad",
    };

    let read_file = fs.readFileSync(__dirname + "/database.json");
    let read_parse = JSON.parse(read_file);

    if (read_parse[0].thumbnail === data_parse[0].data.thumbnail) return;

    const { title, thumbnail, subreddit, post_hint, permalink, url } =
      data_parse[0].data;

    if (post_hint === "image") {
      await got.post(
        `https://api.telegram.org/bot${data_bot.bot_api}/sendPhoto`,
        {
          json: {
            chat_id: data_bot.channel_id,
            caption: title,
            photo: url,
          },
        }
      );
    }

    read_parse = [
      {
        title: title,
        thumbnail: thumbnail,
        subreddit: subreddit,
        post_hint: post_hint || null,
        permalink: "https://www.reddit.com" + permalink,
        url: url,
      },
      ...read_parse,
    ];

    fs.writeFileSync(
      __dirname + "/database.json",
      JSON.stringify(read_parse, null, 4)
    );
  } catch (err) {}
};

export default ecchi;
