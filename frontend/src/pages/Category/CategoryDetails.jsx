import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import Loader from "@/components/Loader";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CategoryDetails = () => {
  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`/category/show-all-categories`, { method: "GET" });

  if (loading) return <Loader text="Fetching all categories..." />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-center items-start min-h-full"
    >
      <Card className="w-full max-w-7xl bg-gray-900 border border-neutral-800 shadow-md rounded-xl">
        <CardHeader className="flex justify-between items-center p-4 border-b border-neutral-800">
          <h2 className="text-xl font-semibold text-teal-400">
            All Categories
          </h2>
          <Link to="/category/add">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer">
              Add Category
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-4 overflow-x-auto">
          <Table>
            <TableCaption className="text-neutral-400 italic mt-4">
              List of all available categories.
            </TableCaption>

            <TableHeader>
              <TableRow className="bg-gray-800 hover:bg-gray-800">
                <TableHead className="font-bold text-md text-teal-500 tracking-wide">
                  Category Name
                </TableHead>
                <TableHead className="font-bold text-md text-teal-500 tracking-wide">
                  Slug
                </TableHead>
                <TableHead className="text-right pr-6 font-bold text-md text-teal-500 tracking-wide">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categoryData && categoryData.category.length > 0 ? (
                categoryData.category.map((category) => (
                  <TableRow
                    key={category._id}
                    className="hover:bg-gray-700/10 transition"
                  >
                    <TableCell className="text-white font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="text-neutral-400">
                      {category.slug}
                    </TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Link to={`/category/edit/${category._id}`}>
                        <Button className="bg-gray-700 hover:bg-gray-800 px-3 py-2 cursor-pointer">
                          <FaEdit className="text-teal-400 hover:text-teal-300 transition-colors" />
                        </Button>
                      </Link>

                      <Button className="bg-gray-700 hover:bg-gray-800 px-3 py-2 cursor-pointer">
                        <MdDelete className="text-red-500 hover:text-red-400 transition-colors" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-neutral-500"
                  >
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CategoryDetails;
