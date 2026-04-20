
import { client } from "@/sanity/lib/sanityClient";
import Image from "next/image";
import Link from "next/link";
type Product = {
           price: number;
   imageUrl: string;
  slug: string;
  name: string;};

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const products = await client.fetch(
    `*[_type == "product" && category == $slug]{
      name,
      price,
      "imageUrl": image.asset->url,
      "slug": slug.current
    }`,
    {
      slug: slug,
    }
  );

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {params.slug} Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((item: Product) => (
          <Link href={`/product/${item.slug}`} key={item.slug}>
            <div className="bg-white p-4 shadow rounded-lg">
              
              <Image
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover rounded"
                width={500}
                height={300}
              />

              <h2 className="mt-2 font-bold">{item.name}</h2>
              <p className="text-[#C78238]">${item.price}</p>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}