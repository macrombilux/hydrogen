import {json, redirect, type LoaderArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {
  Pagination__unstable as Pagination,
  getPaginationVariables__unstable as getPaginationVariables,
  Image,
  useVariantUrl,
} from '@shopify/hydrogen';
import type {ProductItemFragment} from 'storefrontapi.generated';

export async function loader({request, params, context}: LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    return redirect('/collections');
  }

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, ...paginationVariables},
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }
  return json({collection});
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();

  return (
    <section className="collection">
      <h1>{collection.title}</h1>
      <p className="collection-description">{collection.description}</p>
      <Pagination connection={collection.products}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <>
            <PreviousLink>
              {isLoading ? (
                'Loading...'
              ) : (
                <span>
                  <mark>↑</mark> Load previous
                </span>
              )}
            </PreviousLink>
            <ProductsGrid products={nodes} />
            <br />
            <NextLink>
              {isLoading ? (
                'Loading...'
              ) : (
                <span>
                  Load more <mark>↓</mark>
                </span>
              )}
            </NextLink>
          </>
        )}
      </Pagination>
    </section>
  );
}

function ProductsGrid({products}: {products: ProductItemFragment[]}) {
  return (
    <div className="products-grid">
      {products.map((product, index) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 8 ? 'eager' : undefined}
          />
        );
      })}
    </div>
  );
}

function ProductItem({
  product,
  loading,
}: {
  product: ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variant = product.variants.nodes[0];
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return (
    <Link
      className="product-item"
      key={product.id}
      prefetch="intent"
      to={variantUrl.to}
    >
      {/* TODO: @ben welp with sizes and url transform? */}
      {product.featuredImage && (
        <Image
          alt={product.featuredImage.altText || product.title}
          aspectRatio="1/1"
          data={product.featuredImage}
          loading={loading}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <h4>{product.title}</h4>
    </Link>
  );
}

const MONEY_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
` as const;

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      ## url: transformedSrc(maxWidth: 800, maxHeight: 800, crop: CENTER)
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
  ${MONEY_FRAGMENT}
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
        }
      }
    }
  }
  ${PRODUCT_ITEM_FRAGMENT}
` as const;