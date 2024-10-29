"use client";

import { WishlistModel } from "@/db/models/wishlist";
import { MyResponse } from "../api/products/route";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ObjectId } from "mongodb";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistModel[]>([]);

  async function fetchProducts() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`,
      {
        cache: "no-store",
      }
    );
    const responseJson: MyResponse<WishlistModel[]> = await response.json();

    if (!response.ok) {
      throw new Error("Something Wrong!, Contact Our Admin");
    }

    const data = responseJson.data as WishlistModel[];
    console.log(data);
    setWishlist(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId: ObjectId) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/${productId}`,
      { method: "DELETE", credentials: "include" }
    );
    const responseJson: MyResponse<unknown> = await response.json();

    Swal.fire({
      text: responseJson.message,
      icon: "success",
    });

    fetchProducts();
  };

  return (
    <>
      <div className="bg-black-100 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-white-800 text-3xl font-semibold mb-8">
            Wishlist
          </h1>
          <div className="space-y-6">
            {wishlist?.map((prod) => (
              <div
                key={prod.product.slug}
                className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <Image
                      src={prod.product.thumbnail}
                      alt={prod.product.name}
                      width={192} // Adjust as needed
                      height={192} // Adjust as needed
                      className="h-48 w-full object-cover md:w-48"
                    />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      {prod.product.name}
                    </div>
                    <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
                      {prod.product.excerpt}
                    </h2>
                    <p className="mt-2 text-gray-500">
                      {prod.product.description}
                    </p>
                    <button
                      onClick={() => handleDelete(prod._id)}
                      className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
