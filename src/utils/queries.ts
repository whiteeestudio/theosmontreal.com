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
