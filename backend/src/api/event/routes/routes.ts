export default {
  routes: [
    {
      method: "GET",
      path: "/events/get-slug/:slug",
      handler: "event.slugExists",
    }
  ],
}