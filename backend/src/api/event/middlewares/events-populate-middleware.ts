/**
 * `events-populate-middleware` middleware
 */

// import { Strapi } from '@strapi/strapi';

"use strict";

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query = {
      ...ctx.query,
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        user: {
          fields: ["username","bio", "twitter", "youtube", "linkedin"],
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        }
      },
    };

    await next();
  };
};

