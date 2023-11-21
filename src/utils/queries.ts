import { gql } from "@apollo/client";

export const GET_HOME_PAGE = gql`
  query GetHomePage {
    metaobject(handle: { handle: "home-page", type: "homepage" }) {
      banner: field(key: "banner") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      mobileBanner: field(key: "mobile_banner") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      logo: field(key: "logo") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
    }
  }
`;

export const GET_COLLECTION = gql`
  query GetCollection($collectionHandle: String!) {
    collection(handle: $collectionHandle) {
      products(first: 50) {
        nodes {
          handle
          title
          featuredImage {
            url
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query AllProducts {
    products(first: 50, sortKey: CREATED_AT) {
      nodes {
        handle
        title
        featuredImage {
          url
        }
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query FetchProduct($handle: String!) {
    product(handle: $handle) {
      title
      description
      availableForSale
      descriptionHtml
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 100) {
        edges {
          node {
            url
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            quantityAvailable
          }
        }
      }
      sizeGuide: metafield(namespace: "custom", key: "size_guide_v2") {
        value
      }
    }
  }
`;

export const GET_POLICY = gql`
  query GetPolicy($policy: String!) {
    metaobject(handle: { handle: $policy, type: "policy" }) {
      title: field(key: "title") {
        value
      }
      description: field(key: "description") {
        value
      }
      sections: field(key: "sections") {
        references(first: 50) {
          nodes {
            ... on Metaobject {
              title: field(key: "section_title") {
                value
              }
              body: field(key: "section_body") {
                value
              }
            }
          }
        }
      }
      questions: field(key: "questions") {
        references(first: 50) {
          nodes {
            ... on Metaobject {
              question: field(key: "question") {
                value
              }
              answer: field(key: "answer") {
                value
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_FREE_SHIPPING = gql`
  query GetFreeShipping {
    metaobject(handle: { handle: "free-shipping", type: "free_shipping" }) {
      text: field(key: "text") {
        value
      }
    }
  }
`;

export const GET_ABOUT_PAGE = gql`
  query GetFreeShipping {
    metaobject(handle: { handle: "about-data", type: "about_page" }) {
      shopImage: field(key: "shop_image") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      shopHours: field(key: "shop_hours") {
        value
      }
      shopAddress: field(key: "shop_address") {
        value
      }
      shopPhoneNumber: field(key: "shop_phone_number") {
        value
      }
      shopHolidayHours: field(key: "shop_holiday_hours") {
        value
      }
    }
  }
`;
