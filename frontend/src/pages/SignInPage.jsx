import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const formSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-950 text-gray-100 px-4">
      <Card className="bg-gray-900 border border-teal-700 shadow-lg p-8 w-full max-w-md rounded-xl">
        <h1 className="text-2xl font-bold text-teal-400 mb-6 text-center">
          Sign In to BloggR
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      {...field}
                      className="bg-gray-800 border border-teal-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="bg-gray-800 border border-teal-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-gray-100 font-semibold"
              >
                Sign In
              </Button>

              <p className="text-sm text-center text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-teal-400 hover:underline hover:text-teal-300 transition"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignInPage;
