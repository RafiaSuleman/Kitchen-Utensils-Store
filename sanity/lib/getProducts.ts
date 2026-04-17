import { client } from "@/sanity/lib/client";
export const getProducts = async () => {
  const query = `*[_type == "product"]{
    name,
    price,
    "imageUrl": image.asset->url,
    "slug": slug.current,
    category
  }`;

  return await client.fetch(query);
};