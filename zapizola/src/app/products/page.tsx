"use client";

import { useEffect, useState, useCallback } from "react";
import { ProductModel } from "../../db/models/product";
import { MyResponse } from "../api/products/route";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from "../../components/Footer";
import { handleAddWishlist } from "./action";
import ClientFlashComponent from "../../components/ClientFlashComponent";
import { Heart } from "lucide-react";
import { rupiah } from "../types/rupiah";
import Image from "next/image";

export default function Products() {
  const [product, setProduct] = useState<ProductModel[]>([]);
  const [seeMore, setSeeMore] = useState(true);
  const [limit, setLimit] = useState(5);

  const fetchProduct = useCallback(async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?limit=${limit}`,
      {
        cache: "no-store",
      }
    );

    const responseJson: MyResponse<ProductModel[]> = await response.json();

    if (!response.ok) {
      throw new Error("Something Wrong!, Contact Our Admin");
    }

    const data = responseJson.data as ProductModel[];

    if (data.length < 52) {
      setTimeout(() => {
        setLimit((prevLimit) => prevLimit + 5);
        setProduct(data);
      }, 200);
    } else {
      setSeeMore(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchProduct();
  }, []);

  if (product.length > 0) {
    return (
      <>
        <section className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <InfiniteScroll
              dataLength={product.length}
              next={fetchProduct}
              hasMore={seeMore}
              loader={<p></p>}>
              <div className="mx-8">
                <ClientFlashComponent />
                <h6 className="text-white text-xl font-light tracking-widest mt-12">
                  Total Product : {product.length}{" "}
                </h6>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 justify-items-center m-8">
                {product?.map((prod) => (
                  <div
                    key={prod.slug}
                    className="relative flex flex-col text-white bg-gray-800 hover:bg-gray-700 bg-clip-border rounded-xl w-full max-w-[300px] h-[600px] mx-auto">
                    <div className="relative mx-4 mt-4 overflow-hidden text-white bg-white bg-clip-border rounded-xl h-[400px]">
                      <Image
                        src={prod.images[0]}
                        alt="card-image"
                        width={300} // Set the width according to your design
                        height={400} // Set the height according to your design
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="block font-sans text-lg antialiased font-medium leading-relaxed text-white">
                          {prod.name}
                        </p>
                        <button
                          onClick={() => {
                            handleAddWishlist(prod?._id).then(() => {
                              window.location.href = "/wishlist";
                            });
                          }}
                          className="block py-2 px-3 text-white md:border-0 md:hover:underline md:p-0">
                          <Heart />
                        </button>
                      </div>
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-white opacity-75">
                        {prod.excerpt}
                      </p>
                      <p className="block font-sans text-lg antialiased font-medium leading-relaxed text-white">
                        {rupiah(+prod.price)}
                      </p>
                    </div>
                    <div className="p-6 pt-0">
                      <Link href={`/products/${prod.slug}`}>
                        <button
                          className="align-middle select-none font-sans border border-white font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-white text-gray-800 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                          type="button">
                          Detail Product
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </section>

        <Footer />
      </>
    );
  }
}
