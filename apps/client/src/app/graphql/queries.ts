import { gql } from 'apollo-angular';

export const FETCH_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      image
      isFeatured
    }
  }
`;
