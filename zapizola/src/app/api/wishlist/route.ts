import { createWishlist, getWishlistById } from "@/db/models/wishlist";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MyResponse } from "../products/route";
import { getDb } from "@/db/models/product";
import { MyResponseMessage } from "./[productId]/route";

export type MyResponseError = {
  statusCode: number;
  message?: string;
  error?: string;
};

const wishlistInputSchema = z.object({
  productId: z.string(),
});

export const GET = async (request: NextRequest) => {
  // console.log("x-user-id", request.headers.get("x-user-id"));
  const id = request.headers.get("x-user-id") as string;
  const wishlist = await getWishlistById(id);
  return Response.json(
    {
      statusCode: 200,
      message: "Pong from GET /api/wishlist !",
      data: wishlist,
    },
    {
      status: 200,
    }
  );
};

export type WishlistInput = { productId: string };

export const POST = async (request: NextRequest) => {
  try {
    const db = await getDb();

    const userId = request.headers.get("x-user-id") as string;
    const { productId } = (await request.json()) as WishlistInput;

    if (!userId || !productId) throw new Error("Not Found");
    const wishlisted = await db.collection("Wishlist").findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });

    if (wishlisted) {
      return NextResponse.json<MyResponseMessage>(
        {
          statusCode: 401,
          message: "Already Wishlisted",
        },
        {
          status: 401,
        }
      );
    } else {
      const parsedData = wishlistInputSchema.safeParse({ productId });
      if (!parsedData.success) {
        throw parsedData.error;
      }

      const wishlist = await createWishlist(userId, productId);
      return NextResponse.json<MyResponse<unknown>>(
        {
          statusCode: 201,
          message: "Pong from POST /api/wishlist !",
          data: wishlist,
        },
        { status: 201 }
      );
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err);

      const errPath = err.issues[0].path[0];
      const errMessage = err.issues[0].message;

      return NextResponse.json<MyResponseError>(
        {
          statusCode: 400,
          error: `${errPath} - ${errMessage}`,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json<MyResponseError>(
      {
        statusCode: 500,
        message: "Internal Server Error !",
      },
      {
        status: 500,
      }
    );
  }
};
