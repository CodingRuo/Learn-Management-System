import arcjet, { fixedWindow, shield, protectSignup, sensitiveInfo, slidingWindow, detectBot } from "@arcjet/next";
import { env } from "./env";

const aj = arcjet({
  key: env.ARCJET_KEY,
  characteristics: ["fingerprint"],
  rules: [
    fixedWindow({
      mode: "LIVE",
      window: "1h",
      max: 60,
    }),
    fixedWindow({
      mode: "DRY_RUN",
      characteristics: ['http.request.headers["x-api-key"]'],
      window: "1h",
      max: 600,
    }),
  ],
});

export { aj, detectBot, fixedWindow, protectSignup, sensitiveInfo, shield, slidingWindow };