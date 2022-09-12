import { Product, ProductImage } from "../../common/types/product";
import { ImageEdge, Product as ShopifyProduct } from "../schema";

const normalizeProductImage = ({
  edges,
}: {
  edges: Array<ImageEdge>;
}): ProductImage[] =>
  edges.map(({ node: { originalSrc: url } }) => ({
    url: `/images/${url}`,
  }));

export const normalizeProduct = (productNode: ShopifyProduct): Product => {
  const {
    id,
    title: name,
    handle,
    vendor,
    description,
    images: imageConnection,
    ...rest
  } = productNode;

  const product = {
    id,
    name,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle.replace(/^\?\/+|\/+$/g, ""),
    images: normalizeProductImage(imageConnection),
    ...rest,
  };

  return product;
};
