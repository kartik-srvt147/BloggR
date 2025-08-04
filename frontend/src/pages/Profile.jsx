import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { motion } from "framer-motion";
import Dropzone from "react-dropzone";
import { IoCameraOutline } from "react-icons/io5";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import { useFetch } from "@/hooks/useFetch";
import { axiosInstance } from "@/lib/axios";
import defaultProfilePic from "@/assets/images/defaultUserAvatar.png";
import { setUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";
import Loader from "@/components/Loader";

const formSchema = z.object({
  name: z.string(),
  email: z.email(),
  bio: z.string(),
});

const Profile = () => {
  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    data: userData,
    loading,
    error,
  } = useFetch(`/user/getUser/${user.user._id}`, { method: "GET" });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", bio: "" },
  });

  useEffect(() => {
    if (userData?.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
      });
    }
  }, [userData]);

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  };

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(values));

      const response = await axiosInstance.put(
        `/user/updateUser/${userData.user._id}`,
        formData
      );

      dispatch(setUser(response.data.user));
      showToast("success", response.data.message);
    } catch (error) {
      console.error("Profile update error:", error);
      const message = error.response?.data?.message || "Something went wrong!";
      showToast("error", message);
    }
  }

  if (loading) return <Loader text="Fetching profile..." />;

  return (
    <motion.div
      className="flex justify-center items-center h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="w-full max-w-2xl bg-gray-900 border border-teal-700 shadow-xl rounded-xl">
        <CardContent className="p-8">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          >
            <Dropzone
              onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="relative group cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <Avatar className="w-28 h-28">
                    <AvatarImage
                      src={
                        filePreview ||
                        userData?.user?.profilePic ||
                        defaultProfilePic
                      }
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <IoCameraOutline size={22} className="text-teal-400" />
                    </div>
                  </Avatar>
                </div>
              )}
            </Dropzone>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your name"
                        className="bg-gray-800 text-gray-100 border border-teal-600 focus:ring-2 focus:ring-teal-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your email address"
                        className="bg-gray-800 text-gray-100 border border-teal-600 focus:ring-2 focus:ring-teal-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us about yourself"
                        className="bg-gray-800 text-gray-100 border border-teal-600 focus:ring-2 focus:ring-teal-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-500 transition-colors"
                >
                  Save Changes
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Profile;
