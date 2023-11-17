/**
 * event router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::event.event", {
  config: {
    find: {
      middlewares: ["api::event.get-public-events"],
    },
    findOne: {
      middlewares: ["api::event.get-own-event"],
    },
    update: {
      policies: ["api::event.update-own-event"],
    },
    delete: {
      policies: ["api::event.update-own-event"],
    },
  },
});
