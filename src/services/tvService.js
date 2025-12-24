import axios from "axios";

export const fetchChannels = async (playlistUrl) => {
  try {
    const res = await axios.get(playlistUrl);
    const data = res.data;

    const lines = data.split("\n");
    const channels = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("#EXTINF")) {
        let nameMatch = line.match(/,(.*)$/);
        let name = nameMatch ? nameMatch[1] : "Unknown";

        let logoMatch = line.match(/tvg-logo="(.*?)"/);
        let countryMatch = line.match(/group-title="(.*?)"/);

        const logo = logoMatch ? logoMatch[1] : null;
        const country = countryMatch ? countryMatch[1] : "World";

        const streamUrl = lines[i + 1] ? lines[i + 1].trim() : null;

        channels.push({ name, logo, country, streamUrl });
        i++;
      }
    }

    return channels;
  } catch (err) {
    console.error("Failed to fetch channels:", err);
    return [];
  }
};
