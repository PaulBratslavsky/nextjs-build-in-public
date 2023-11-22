/**
 * event router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::event.event", {
  config: {
    find: {
      middlewares: [
        "api::event.is-event-owner",
        "api::event.events-populate-middleware",
      ],
    },
    findOne: {
      middlewares: [
        "api::event.get-own-event",
        "api::event.events-populate-middleware",
      ],
    },
    update: {
      policies: ["api::event.update-own-event"],
    },
    delete: {
      policies: ["api::event.update-own-event"],
    },
  },
});
