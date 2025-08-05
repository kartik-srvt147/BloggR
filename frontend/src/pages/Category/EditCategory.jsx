import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import slugify from "slugify";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { showToast } from "@/helpers/showToast";
import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import Loader from "@/components/Loader";

const formSchema = z.object({
  name: z.string().min(1, "Category name can't be empty"),
  slug: z.string(),
});

const EditCategory = () => {
  const { category_id } = useParams();
  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`/category/show/${category_id}`, { method: "GET" }, [
    category_id,
  ]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const categoryName = form.watch("name");

  useEffect(() => {
    if (categoryName) {
      const slug = slugify(categoryName, { lower: true });
      form.setValue("slug", slug);
    }
  }, [categoryName]);

  useEffect(() => {
    if (categoryData) {
      form.setValue("name", categoryData.category.name);
      form.setValue("slug", categoryData.category.slug);
    }
  }, [categoryData]);

  async function onSubmit(values) {
    try {
      const response = await axiosInstance.put(
        `/category/update/${category_id}`,
        {
          name: values.name,
          slug: values.slug,
        }
      );

      showToast("success", response.data.message);
    } catch (error) {
      const message =
        error.response.data.message ||
        "Something went wrong. Please try again.";
      showToast("error", message);
    }
  }

  if (loading) return <Loader text="Fetching category..." />;
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="pt-6 pb-8 px-4 sm:px-8 min-w-md max-w-xl mx-auto shadow-md rounded-2xl border border-neutral-800 bg-gray-900 backdrop-blur">
          <CardContent>
            <h2 className="text-2xl font-semibold text-center text-teal-400 mb-6">
              Update Category Name
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">
                        Category Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter category name"
                          className="bg-black/20 border border-neutral-700 focus:border-teal-500 text-white placeholder:text-neutral-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">
                        Generated Slug
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Slug"
                          readOnly
                          className="bg-black/20 border border-neutral-700 focus:border-teal-500 text-white placeholder:text-neutral-500 cursor-not-allowed"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 transition-colors cursor-pointer"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EditCategory;
