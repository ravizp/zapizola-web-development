"use client";

import Link from "next/link";
import { ProductModel } from "../db/models/product";
import { rupiah } from "@/app/types/rupiah";
import Image from "next/image";

const Card = ({ product }: { product: ProductModel }) => {
  return (
    <div
      key={(product?._id).toString()}
      className="relative flex flex-col bg-gray-800 text-white hover:bg-gray-700 bg-clip-border rounded-xl w-60 mx-8 h-[500px] transition-colors duration-200"
    >
      <div className="relative mx-4 mt-4 overflow-hidden bg-gray-200 bg-clip-border rounded-xl h-80">
        <Image
          src={product.images[0]}
          alt={`${product.name} image`}
          width={320} // Set a width here
          height={320} // Set a height here
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-white">
            {product.name}
          </p>
        </div>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-300 mb-2">
          {product.excerpt}
        </p>
        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-green-400">
          {rupiah(+product.price)}
        </p>
      </div>
      <div className="p-4 mt-auto">
        <Link href={`/products/${product.slug}`} className="block w-full">
          <button
            className="w-full select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-white text-gray-800 shadow-md hover:bg-gray-200 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            Detail Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;