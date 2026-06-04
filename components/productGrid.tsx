import Image from "next/image";
import Link from "next/link";

import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface Product {
  slug: string;
  name: string;
  price: number;
  imageUrl: SanityImageSource;
}

interface Props {
  products: Product[];
  urlFor: (source: SanityImageSource) => ImageUrlBuilder;
}

export default function ProductGrid({ products, urlFor }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((item) => (
        <div key={item.slug} className="bg-white shadow rounded-lg p-4">
          <Image
            src={urlFor(item.imageUrl).width(500).height(300).url()}
            alt={item.name}
            width={500}
            height={300}
            className="w-full h-48 object-cover rounded border-[#C78238] border"
          />

          <h2 className="text-lg font-bold mt-3">{item.name}</h2>

          <p className="text-[#C78238] font-semibold">
            Price ${item.price}
          </p>

          <Link
            href={`/product/${item.slug}`}
            className="text-white mt-2 block bg-[#C78238] py-2 px-4 rounded w-max text-center"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}