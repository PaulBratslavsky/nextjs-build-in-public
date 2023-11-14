"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {

    if (!ctx.state.user) {
      console.log("No user, Public events only.");
      ctx.query = {
        ...ctx.query,
        filters: { isPublic: true },
      };
      return await next();
    }

    const user = ctx.state.user;
    const userId = user?.id;

    // This query allows user to populate the fields and relations
    // if you need additional security you would update the query accordingly
    // and remove ...ctx.query

    ctx.query = {
      ...ctx.query,
      filters: { user: userId },
    };

    console.log("Has user, get own events.");
    console.log(user);


    const entryId = ctx.params.id ? ctx.params.id : undefined;

    let entry = null;

    if (entryId) {
      entry = await strapi.entityService.findOne("api::event.event", entryId, {
        populate: "*",
      });
    }

    if (entry && entry.author.id !== userId) {
      return ctx.unauthorized(`You can't access this entry`);
    }

    await next();
  };
};
