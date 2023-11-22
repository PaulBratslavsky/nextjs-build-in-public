const { errors } = require("@strapi/utils");
const { PolicyError } = errors;

/**
 * Policy to ensure a user can only update their own event.
 */

// TODO: FIND OUT WHY RETURNING GENERIC MESSAGE
export default async (policyContext, config, { strapi }) => {
  const user = policyContext.state.user;
  
  if (!user) {
    throw new PolicyError("You are not allowed to perform this action.", {
      policy: "update-own-event",
    });
  }

  const entryId = Number(policyContext.params.id);
  const eventEntry = await strapi.entityService.findOne("api::event.event", entryId, { populate: "*" });

  if (eventEntry && eventEntry.user.id !== user.id) {
    throw new PolicyError("You are not allowed to perform this action.", {
      policy: "update-own-event",
    });
  }
  
  return true;
};
