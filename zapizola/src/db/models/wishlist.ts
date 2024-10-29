import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { UserModel } from "./user";
import { ProductModel, getProductById } from "./product";

export type WishlistModel = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  user: UserModel;
  product: ProductModel;
};

export type WishlistModelInput = Omit<WishlistModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "zapizola";

const COLLECTION_WISHLIST = "Wishlist";

export const getDb = async () => {
  const client = await getMongoClientInstance();

  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getWishlistById = async (id: string) => {
  console.log(id);

  const db = await getDb();

  const agg = [
    { $match: { userId: new ObjectId(id) } },
    {
      $lookup: {
        from: "User",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "Products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  const wishlist = (await db
    .collection(COLLECTION_WISHLIST)
    .aggregate(agg)
    .toArray()) as WishlistModel[];

  return wishlist;
};

export const createWishlist = async (userId: string, productId: string) => {
  const body = {
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const db = await getDb();

  const foundProduct = await getProductById(productId);
  if (!foundProduct) throw new Error("Product Not Found");

  const response = await db.collection(COLLECTION_WISHLIST).insertOne(body);
  const foundWishlist = (await db.collection(COLLECTION_WISHLIST).findOne({
    _id: response.insertedId,
  })) as WishlistModel;

  return foundWishlist;
};

export const deleteWishlistByProductId = async (
  productId: string,
) => {
  const db = await getDb();

  const wishlistFound = (await db
    .collection(COLLECTION_WISHLIST)
    .find({ _id: new ObjectId(productId) })
    .toArray()) as WishlistModel[];

  if (!wishlistFound) throw new Error("Not Found");

  await db
    .collection(COLLECTION_WISHLIST)
    .deleteOne({ _id: new ObjectId(productId) });

  return "Whislist removed";
};
