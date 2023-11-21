export default {
  register({ strapi }) {
    const userRoutes =
      strapi.plugins["users-permissions"].routes["content-api"].routes;
    const publicUserMiddleware = "global::user-data-public";

    const findUsers = userRoutes.findIndex(
      (route) => route.handler === "user.find" && route.method === "GET"
    );

    const findOneUser = userRoutes.findIndex(
      (route) => route.handler === "user.findOne" && route.method === "GET"
    );

    function initializeRoute(routes, index) {
      routes[index].config.middlewares = routes[index].config.middlewares || [];
      routes[index].config.policies = routes[index].config.policies || [];
    }

    if (findUsers) {
      initializeRoute(userRoutes, findUsers);
      userRoutes[findUsers].config.middlewares.push(publicUserMiddleware);
    }

    if (findOneUser) {
      initializeRoute(userRoutes, findOneUser);
      userRoutes[findOneUser].config.middlewares.push(publicUserMiddleware);
    }

    console.log(userRoutes[findUsers].config.middlewares);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
