"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;

    // Handle public events for non-authenticated users
    if (!user) {
      console.log("No user, Public events only.");
      ctx.query = {
        ...ctx.query,
        filters: { ...ctx.query.filters, isPublic: true },
      };
      return await next();
    }

    // For authenticated users
    const userId = user.id;
    console.log("Has user, get own events.");
    ctx.query = {
      ...ctx.query,
      filters: { user: userId },
    };

    const entryId = ctx.params.id;
    if (entryId) {
      const entry = await strapi.entityService.findOne("api::event.event", entryId, { populate: "*" });
      if (entry && entry.author.id !== userId) {
        return ctx.unauthorized(`You can't access this entry`);
      }
    }

    await next();
  };
};

