"use client";
import { columns } from "@/components/Columns";
import { DataTable } from "@/components/DataTable";
import { mobileColumns } from "@/components/MobileColumns";
import { MobileDataTable } from "@/components/MobileDataTable";
import { MobileLoadongTable } from "@/components/MobileLoadingTable";
import { LoadingTable } from "@/components/LoadingTable";
import { User } from "@/types";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userSearchSchema } from "@/schemas/userSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const form = useForm<z.infer<typeof userSearchSchema>>({
    resolver: zodResolver(userSearchSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof userSearchSchema>) {
    // setIsLoading(true); // Set loading to true during search
    // setSearchQuery(values.username);
    // fetchData();
    // Redirect to new page "/search" with search parameter in the URL
    redirect(`/search?username=${values.username}`);
    // setIsLoading(false); // Set loading to false after search
  }

  const fetchData = async () => {
    setIsLoading(true);
    // if (searchQuery) {
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getUsers?username=${searchQuery}`
    //   );
    //   const userData = await response.json();
    //   console.log(userData);

    //   setData(userData);
    //   setIsLoading(false);
    //   return;
    // }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getUsers?limit=${limit}&page=${page}`
    );
    const userData = await response.json();
    setData(userData.users);
    setTotalPages(Math.ceil(userData.total / limit));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [limit, page]);

  const handleLimitChange = (value: string) => {
    setLimit(parseInt(value));
    setPage(1);
  };

  const increasePage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const decreasePage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center md:max-w-5xl mx-auto">
      <div className="w-full flex items-center justify-center z-20 my-4 gap-x-4 px-4 md:my-10">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Input
            {...form.register("username")}
            placeholder="Search Users ..."
            className="w-full max-w-2xl"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <div className=" w-full relative px-4 ">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.9] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-2 py-4 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="md:hidden w-full">
            {isLoading ? (
              <MobileLoadongTable columns={mobileColumns} data={[]} />
            ) : (
              <MobileDataTable data={data} columns={mobileColumns} />
            )}
          </div>
          <div className="hidden md:inline w-full">
            {isLoading ? (
              <LoadingTable columns={columns} data={[]} />
            ) : (
              <DataTable columns={columns} data={data} />
            )}
          </div>
        </div>
      </div>
      <div className="md:mt-16 mt-4 flex flex-col md:flex-row gap-y-5 justify-evenly w-full">
        <Pagination className="text-white">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={decreasePage} />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={increasePage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="bg-black text-white flex justify-evenly items-center gap-x-4">
          <p>Number of rows: </p>
          <Select value={limit.toString()} onValueChange={handleLimitChange}>
            <SelectTrigger className="w-[180px] bg-black">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white">
              {[1, 2, 3].map((index) => (
                <SelectItem key={index} value={String(index * 10)}>
                  {index * 10}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
