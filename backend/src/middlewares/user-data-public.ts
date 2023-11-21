"use strict";

/**
 * `user-public-data` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In user-public-data middleware.");

    const user = ctx.state.user;
    const params = ctx.params.id;

    if (!user || (!user && params)) {
      ctx.query = {
        fields: ["id", "username"],
      };
    }

    if (user || (user && params)) {
      return ctx.unauthorized("You are not allowed to perform this action.");
    }

    await next();
  };
};
