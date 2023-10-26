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

export interface ElementsListText extends Schema.Component {
  collectionName: 'components_elements_list_texts';
  info: {
    displayName: 'List Text';
  };
  attributes: {
    text: Attribute.String;
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

export interface ElementsMetaData extends Schema.Component {
  collectionName: 'components_elements_meta_data';
  info: {
    displayName: 'Meta Data';
  };
  attributes: {
    metaTitle: Attribute.String;
    metaDescription: Attribute.Text;
    metaImage: Attribute.Media;
  };
}

export interface ElementsSocial extends Schema.Component {
  collectionName: 'components_elements_socials';
  info: {
    displayName: 'Social';
  };
  attributes: {
    link: Attribute.String;
    type: Attribute.Enumeration<['LINKEDIN', 'GITHUB', 'TWITTER', 'YOUTUBE']>;
  };
}

export interface LayoutHero extends Schema.Component {
  collectionName: 'components_layout_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    heading: Attribute.String;
    subHeading: Attribute.String;
    text: Attribute.Text;
    images: Attribute.Media;
    features: Attribute.Component<'elements.list-text', true>;
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
      'elements.list-text': ElementsListText;
      'elements.logo': ElementsLogo;
      'elements.meta-data': ElementsMetaData;
      'elements.social': ElementsSocial;
      'layout.hero': LayoutHero;
      'layout.navigation': LayoutNavigation;
    }
  }
}
