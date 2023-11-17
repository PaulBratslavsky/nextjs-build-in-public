"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    strapi.log.info("In is-event-owner middleware.");
    
    // Extract entryId and user from context
    const entryId = ctx.params.id;
    const user = ctx.state.user;
    const userId = user?.id;

    // This query allows user to populate the fields and relations
    // if you need additional security you would update the query accordingly
    // and remove ...ctx.query

    // If no user is logged in, adjust the query for public events
    if (!user) {
      strapi.log.info("No user, Public events only.");
      ctx.query = {
        ...ctx.query,
        filters: { ...ctx.query.filters, status: "PUBLIC" },
      };

      // Check if the specific entry is public
      if (entryId) {
        const entry = await strapi.entityService.findOne("api::event.event", entryId, { populate: "*" });
        if (entry && entry.status !== "PUBLIC") {
          return ctx.unauthorized(`You can't access this entry`);
        }
      }
    } else {
      // Update query filters for authenticated user
      ctx.query = {
        ...ctx.query,
        filters: { ...ctx.query.filters, user: userId },
      };

      // Check if the user owns the specific entry
      if (entryId) {
        const entry = await strapi.entityService.findOne("api::entry.entry", entryId, { populate: "*" });
        if (entry && entry.user.id !== userId) {
          return ctx.unauthorized(`You can't access this entry`);
        }
      }
    }

    // Proceed to the next middleware
    await next();
  };
};
