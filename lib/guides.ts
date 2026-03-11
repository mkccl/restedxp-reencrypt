export interface GuideConfig {
  id: string;
  title: string;
  expansion: string;
  description: string;
  levels: string;
  image: string;
  guideUrl: string;
  sourceTag: string;
}

export const GUIDES: GuideConfig[] = [
  {
    id: "midnight",
    title: "Midnight Leveling Guide",
    expansion: "Midnight",
    description: "Latest expansion leveling guide for both factions.",
    levels: "80-90",
    image: "/bg-midnight-art.jpg",
    guideUrl: "/guide_player_1234.txt",
    sourceTag: "player#1234",
  },
  {
    id: "tbc",
    title: "TBC Speedrun Guide",
    expansion: "The Burning Crusade",
    description: "Classic TBC speedrun guide for both Horde and Alliance.",
    levels: "1-70",
    image: "/bg-tbc.jpg",
    guideUrl: "/guide_tbc_player_1234.txt",
    sourceTag: "player#1234",
  },
  {
    id: "wotlk",
    title: "WotLK Leveling Guide",
    expansion: "Wrath of the Lich King",
    description: "Full 1-80 leveling guide for both factions.",
    levels: "1-80",
    image: "/bg-wotlk.jpg",
    guideUrl: "/guide_wotlk_player_1234.txt",
    sourceTag: "player#1234",
  },
];
