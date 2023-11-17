import { gql } from "@apollo/client";

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
