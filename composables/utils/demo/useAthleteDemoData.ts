import type { IAthlete } from "@/types/services/athletes";

export default (): IAthlete => {
  return {
    id: 0,
    firstname: "Demo",
    lastname: "Mode",
    createdAt: new Date(),
    username: "demo_mode",
    profile:
      "https://dgalywyr863hv.cloudfront.net/pictures/athletes/106035223/28203427/8/large.jpg",
    profileMedium:
      "https://dgalywyr863hv.cloudfront.net/pictures/athletes/106035223/28203427/8/medium.jpg",
  };
};
