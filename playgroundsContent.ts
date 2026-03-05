/**
 * Content sourced from https://weareplaygrounds.nl/
 * Playgrounds is an institute and platform that connects and forms international
 * creative communities within illustration, animation, film, games, digital design and art.
 */

const BASE_URL = "https://weareplaygrounds.nl";

export const ABOUT = {
  tagline:
    "Playgrounds is an institute and platform that connects and forms international creative communities within the fields of illustration, animation, film, games, digital design and art.",
  goal: "Our goal is to increase creative self-confidence, skills, knowledge and inclusivity within the creative industry.",
  replay:
    "Dive into our free rich archive of talks, interviews and panels on RePlay.",
  replayUrl: "https://replay.weareplaygrounds.nl/",
  youtubeUrl: "https://www.youtube.com/@WeArePlaygrounds/videos",
};

export type EventItem = {
  id: string;
  title: string;
  dateLabel: string;
  description: string;
  url: string;
  type: "festival" | "workshop" | "talent" | "conference";
  location?: string;
};

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: "tad-eindhoven-2026",
    title: "The Art Department Eindhoven 2026",
    dateLabel: "15 – 17 April 2026",
    description: "Festival dedicated to design and craftsmanship in film, animation and games.",
    url: `${BASE_URL}/event/the-art-department-eindhoven-2026/`,
    type: "festival",
    location: "Klokgebouw, Eindhoven",
  },
  {
    id: "tad-in-depth-2026",
    title: "The Art Department 2026: In-Depth Day",
    dateLabel: "15 April 2026",
    description: "Extra festival day filled with in-depth artist talks and masterclasses.",
    url: `${BASE_URL}/event/the-art-department-2026-in-depth-day/`,
    type: "festival",
    location: "Eindhoven",
  },
  {
    id: "piff-2026",
    title: "Playgrounds International Film Festival 2026",
    dateLabel: "15 – 19 April 2026",
    description: "Film festival on the art of filmmaking.",
    url: `${BASE_URL}/event/playgrounds-international-film-festival-2026/`,
    type: "festival",
  },
  {
    id: "film-talent-industry-day",
    title: "Film & Talent Industry Day",
    dateLabel: "17 April 2026",
    description: "Connect with film industry professionals during PIFF.",
    url: `${BASE_URL}/event/film-talent-industry-day/`,
    type: "conference",
  },
  {
    id: "in-motion-london-2026",
    title: "In Motion London 2026",
    dateLabel: "18 – 19 September 2026",
    description: "London's creative meet-up of the year. Animation and motion design in all its forms.",
    url: `${BASE_URL}/event/in-motion-london-2026/`,
    type: "festival",
    location: "Barbican Centre, London",
  },
  {
    id: "dutch-game-week-2026",
    title: "Dutch Game Week 2026",
    dateLabel: "14 – 22 November 2026",
    description: "A full week dedicated to the world of play.",
    url: "https://dutchgameweek.nl/",
    type: "festival",
    location: "Breda",
  },
  {
    id: "workshop-nathan-fowkes",
    title: "Workshop: Nathan Fowkes – Environment Design",
    dateLabel: "14 April 2026",
    description: "The creation of extraordinary places. 6-hour workshop.",
    url: `${BASE_URL}/event/workshop-by-nathan-fowkes-environment-design-the-creation-of-extraordinary-places/`,
    type: "workshop",
  },
  {
    id: "workshop-alex-grigg",
    title: "Workshop: Alex Grigg – Animations That Soothe the Soul",
    dateLabel: "15 April 2026",
    description: "Sharpen your skills. 4-hour workshop.",
    url: `${BASE_URL}/event/workshop-animations-that-sooth-the-soul-and-sharpen-your-skills-by-alex-grigg/`,
    type: "workshop",
  },
  {
    id: "filmhelpdesk-28",
    title: "Filmhelpdesk #28: Sacha Gertsik",
    dateLabel: "20 March 2026",
    description: "Next Talent Program.",
    url: `${BASE_URL}/event/filmhelpdesk-28-sacha-gertsik/`,
    type: "talent",
  },
  {
    id: "next-real-talks-horror",
    title: "Next Real Talks: Homegrown Horror",
    dateLabel: "24 March 2026",
    description: "Next Talent Program.",
    url: `${BASE_URL}/event/next-real-talks-homegrown-horror/`,
    type: "talent",
  },
];

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  url: string;
};

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "industry-garden",
    title: "Pick your partner package and join the Industry Garden!",
    excerpt: "Connect with the industry, interact with talents, network with your peers.",
    url: `${BASE_URL}/pick-your-partner-package-and-join-the-industry-garden/`,
  },
  {
    id: "in-motion-london",
    title: "In Motion is returning in London!",
    excerpt: "Save the date: 18+19 September 2026 & get your ticket!",
    url: `${BASE_URL}/in-motion-is-returning-in-london/`,
  },
  {
    id: "next-sxsw",
    title: "A touch of Next at SXSW 2026",
    excerpt: "3 projects in the official selection.",
    url: `${BASE_URL}/a-touch-of-next-at-sxsw-2026/`,
  },
  {
    id: "20-years",
    title: "First glimpses of Playgrounds 20 years anniversary",
    excerpt: "2026 will be extra special for us!",
    url: `${BASE_URL}/first-glimpses-of-playgrounds-20-years-anniversary/`,
  },
  {
    id: "tad-2026-part",
    title: "Want to take part in The Art Department 2026?",
    excerpt: "Don't be shy, reach out to us!",
    url: `${BASE_URL}/want-to-take-part-in-the-art-department-2026/`,
  },
  {
    id: "next-gen-ticket",
    title: "What is a Next Gen ticket?",
    excerpt: "If you are aged 25 or under you can enjoy TAD 2026 with a discount!",
    url: `${BASE_URL}/what-is-a-next-gen-ticket/`,
  },
  {
    id: "referral-tad",
    title: "Join our referral program – The Art Department Eindhoven 2026",
    excerpt: "Join the Playgrounds community.",
    url: `${BASE_URL}/join-our-tad-referral-program-2026/`,
  },
];
