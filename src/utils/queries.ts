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

export const GET_COLLECTION_PAGE_DATA = gql`
  query GetCollectionPageData($collectionHandle: String!, $after: String) {
    collection(handle: $collectionHandle) {
      id
      products(first: 32, after: $after) {
        edges {
          cursor
          node {
            handle
            title
            availableForSale
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
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`;

export const GET_SEARCH_RESULTS = gql`
  query GetSearchResults($query: String!) {
    search(
      first: 32
      query: $query
      types: [PRODUCT]
      unavailableProducts: LAST
    ) {
      nodes {
        ... on Product {
          handle
          title
          availableForSale
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

export const GET_PRODUCT = gql`
  query FetchProduct($handle: String!) {
    product(handle: $handle) {
      id
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

export const GET_THEOS_BUBBLES_PAGE = gql`
  query GetTheosBubbles {
    metaobject(handle: { handle: "theos-bubbles", type: "theos_bubbles" }) {
      title: field(key: "title") {
        value
      }
      mainVideo: field(key: "main_video") {
        reference {
          ... on Video {
            previewImage {
              url
            }
            sources {
              url
              mimeType
              width
              height
            }
          }
        }
      }
      story: field(key: "story") {
        value
      }
      photoshootImages: field(key: "photoshoot_images") {
        references(first: 50) {
          nodes {
            ... on MediaImage {
              image {
                url
              }
            }
          }
        }
      }
    }
  }
`;
