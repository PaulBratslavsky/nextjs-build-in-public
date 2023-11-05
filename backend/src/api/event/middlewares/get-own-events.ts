/**
 * `get-own-events` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    strapi.log.info("In get-own-events middleware.");

    const user = ctx.state.user;
    if (!user) return next();
    
    const userId = user.id;
    const query = {
      ...ctx.query,
      filters: { user: userId },
    };
    ctx.query = query;
    await next();
  };
};
