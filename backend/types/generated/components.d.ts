import type { Schema, Attribute } from '@strapi/strapi';

export interface ElementsLink extends Schema.Component {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    text: Attribute.String;
    href: Attribute.String;
    isButton: Attribute.Boolean & Attribute.DefaultTo<false>;
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface ElementsLogo extends Schema.Component {
  collectionName: 'components_elements_logos';
  info: {
    displayName: 'Logo';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
  };
}

export interface LayoutNavigation extends Schema.Component {
  collectionName: 'components_layout_navigations';
  info: {
    displayName: 'Navigation';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    location: Attribute.String;
    navItem: Attribute.Component<'elements.link', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'elements.link': ElementsLink;
      'elements.logo': ElementsLogo;
      'layout.navigation': LayoutNavigation;
    }
  }
}
