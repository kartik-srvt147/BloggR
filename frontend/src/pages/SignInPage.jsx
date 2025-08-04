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
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { showToast } from "@/helpers/showToast";
import { axiosInstance } from "@/lib/axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import GoogleLogin from "@/components/GoogleLogin";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: values.email,
        password: values.password,
      });

      const userData = response.data.user;

      showToast("success", response.data.message);
      dispatch(setUser(userData));
      navigate("/");
    } catch (error) {
      const message =
        error.response.data.message ||
        "Something went wrong. Please try again.";
      showToast("error", message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-950 text-gray-100 px-4">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="bg-gray-900 border border-teal-700 shadow-lg p-8 rounded-xl">
          <motion.h1
            className="text-2xl font-bold text-teal-400 mb-6 text-center"
            variants={childVariants}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            Sign In to BloggR
          </motion.h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <motion.div
                variants={childVariants}
                custom={1}
                initial="hidden"
                animate="visible"
              >
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
              </motion.div>

              {/* Password */}
              <motion.div
                variants={childVariants}
                custom={2}
                initial="hidden"
                animate="visible"
              >
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
              </motion.div>

              {/* Submit Button and Link */}
              <motion.div
                className="flex flex-col gap-3"
                variants={childVariants}
                custom={3}
                initial="hidden"
                animate="visible"
              >
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-gray-100 font-semibold"
                >
                  Sign In
                </Button>
                <div>
                  <GoogleLogin />
                </div>

                <p className="text-sm text-center text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/sign-up"
                    className="text-teal-400 hover:underline hover:text-teal-300 transition"
                  >
                    Sign Up
                  </Link>
                </p>
              </motion.div>
            </form>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignInPage;
