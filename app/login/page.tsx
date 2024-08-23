"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log("Submitting form", data);

    const email = data.get('email');
    const password = data.get('password');

    try {
      const response: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log({ response });
      if (!response?.error) {
        router.push("/");
        router.refresh();
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
      console.log("Login Successful", response);
    } catch (error: any) {
      console.error("Login Failed:", error);
    }
  };

  return (
      <form
        onSubmit={onSubmit}
        className="text-white p-4 md:p-16 border-[1.5px] rounded-lg border-gray-300 flex flex-col items-center justify-center gap-y-6"
      >
        <input type="email" name="email" id="email" />
        <input type="text" name="password" id="password" />

        <input type="submit" value="Submit" />
      </form>
  );
}