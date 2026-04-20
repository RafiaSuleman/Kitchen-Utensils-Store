import Hero from "@/components/hero";
import { getProducts } from "@/sanity/lib/getProducts";
import { urlFor } from "@/sanityImage";
import Image from "next/image";
import Link from "next/link";

const categories = ["kitchen", "electronics", "accessories"];

type Product = {
  slug: string;
  imageUrl: string;
  name: string;
  price: string | number;
};

export default async function Home() {
  const products = await getProducts();
  
  return (
    <div className="bg-[#DAE2E9]">
      <Hero />
      {/* sanity */}
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>
        <div className="flex gap-4 flex-wrap mb-6">
          {categories.map((cat) => (
            <Link key={cat} href={`/category/${cat}`}>
              <button className="px-4 py-2 bg-[#C78238] text-white rounded-full capitalize">
                {cat}
              </button>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {products.map((item: Product) => (
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
                className="text-white  mt-2 block bg-[#C78238] py-2 px-4 rounded w-max text-center"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
