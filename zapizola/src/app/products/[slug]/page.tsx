"use client";

import { MyResponse } from "@/app/api/products/route";
import ButtonAddWishlist from "@/components/ButtonAddWishlist";
import { ProductModel } from "@/db/models/product";
import { rupiah } from "@/app/types/rupiah";

import Image from "next/image";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "htttp://localhost:3000"

export default function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    // Fetch product data on initial render
    const fetchProducts = async (slug: string) => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/products/${slug}`,
          {
            cache: "no-store",
          }
        );
        const responseJson: MyResponse<ProductModel> = await response.json();

        if (response.ok) {
          setProduct(responseJson.data);
          // Set initial image
          setSelectedImage(responseJson.data?.images[0] || "");
        } else {
          console.error("Failed to fetch product data");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts(params.slug);
  }, [params.slug]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <section className="mt-20 md:mt-6 max-w-screen-lg mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {/* Main selected image */}
            <div className="relative aspect-square">
              <Image
                src={selectedImage}
                alt="Image Product"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            {/* Thumbnail images */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className={`rounded-md cursor-pointer ${
                    selectedImage === image ? "border-2 border-green-400" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="p-4 lg:p-8 border bg-gray-800 text-white rounded-lg">
            <h1 className="text-3xl font-semibold text-white">
              {product.name}
            </h1>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-white">
                {product.excerpt}
              </h2>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-white">Details</h2>
              <p className="mt-2 text-gray-300 list-disc list-inside">
                {product.description}
              </p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Price</h2>
              <p className="mt-2 text-green-400 font-semibold text-lg">
                {rupiah(+(product.price as number))}
              </p>
            </div>

            <div className="w-full mt-6">
              <ButtonAddWishlist prod={product._id} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}