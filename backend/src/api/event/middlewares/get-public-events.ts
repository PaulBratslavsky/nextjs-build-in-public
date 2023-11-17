"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    ctx.query = {
      ...ctx.query,
      filters: { ...ctx.query.filters, isPublic: true },
    };

    await next();
  };
};
