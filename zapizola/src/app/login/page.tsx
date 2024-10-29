import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getUserByEmail } from "../../db/models/user";
import { compareTextWithHash } from "../../db/utils/bcrypt";
import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import ClientFlashComponent from "../../components/ClientFlashComponent";
import Image from "next/image";
import { Rabbit } from "lucide-react";

export default function Login() {

  const handleFormAction = async (formData: FormData) => {
    "use server";

    const loginInputSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const email = formData.get("email");
    const password = formData.get("password");

    const parsedData = loginInputSchema.safeParse({
      email,
      password,
    });

    if (!parsedData.success) {
      const errPath = parsedData.error.issues[0].path[0];
      const errMessage = parsedData.error.issues[0].message;
      const errFinalMessage = `${errPath} - ${errMessage}`;

      return redirect(`/login?error=${errFinalMessage}`);
    }

    //memvalidasi data input terhadap database
    const user = await getUserByEmail(parsedData.data.email);

    if (
      !user ||
      !compareTextWithHash(parsedData.data.password, user.password)
    ) {
      return redirect(`/login?error=Invalid%20Username%20Password`);
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = signToken(payload);

    cookies().set("token", token, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      sameSite: "strict",
    });

    return redirect(`/`);
  };

  return (
    <>
      <div className="flex min-h-screen bg-black text-white">
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <header className="absolute top-5 left-5 right-5 z-20">
              <div className="flex items-center justify-between">
                <Link href={"/"}>
                  <div className="flex items-center">
                    <Rabbit className="h-8 w-8 mr-2" />
                    <span className="text-4xl font-bold">Zapizola</span>
                  </div>
                </Link>
              </div>
            </header>
            <ClientFlashComponent />
            <div className="mt-8">
              <div className="mt-6">
                <h2 className="text-3xl font-extrabold text-center">Sign in</h2>
                <form
                  className="mt-8 space-y-6"
                  action={handleFormAction}
                  method="POST">
                  <div className="relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-black text-gray-400">
                        CONTINUE YOUR ACCOUNT IN HERE
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-black"
                        placeholder="Input your email here"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium">
                      Password
                    </label>
                    <div className="mt-1 relative">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-black"
                        placeholder="Input your password here"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                      Sign in
                    </button>
                  </div>
                </form>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      href="/register"
                      className="font-medium text-gray-400 hover:text-gray-300">
                      Dont have an account? Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src="https://res.cloudinary.com/dqczvxzoq/image/upload/v1727801493/samples/ecommerce/accessories-bag.jpg"
            alt="Skateboarder doing a trick"
            width={1470}
            height={980}
          />
          <div className="absolute bottom-0 right-0 p-4 text-sm text-white bg-black bg-opacity-50">
            Created by Zapizola
          </div>
        </div>
      </div>
    </>
  );
}
