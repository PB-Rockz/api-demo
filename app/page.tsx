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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { userSearchSchema } from "@/schemas/userSearch";
import { useRouter } from "next/navigation";

export default function Home() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<User[]>([]);
  const [searchedData, setSearchedData] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const form = useForm<z.infer<typeof userSearchSchema>>({
    resolver: zodResolver(userSearchSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof userSearchSchema>) {
    // setIsLoading(true); // Set loading to true during search
    // const searchResults = await fetch(
    //   `/api/getUsers?username=${values.username}`
    // );
    // const userData = (await searchResults.json()) as User[];
    // console.log(userData);

    // setData(userData);
    // setIsLoading(false); // Set loading to false after search
    // router.push(`/search?username=${values.username}`);
    setSearchQuery(values.username);
    console.log(searchQuery);
    // setPage(1);
    await fetchSearchData();
  }

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/getUsers?limit=${limit}&page=${page}`);
    const userData = await response.json();
    setData(userData.users);
    setTotalPages(Math.ceil(userData.total / limit));
    setIsLoading(false);
  };

  const fetchSearchData = async () => {
    setIsLoading(true);
    const response = await fetch(`  /api/getUsers?&username=${searchQuery}`);
    const userData = await response.json();
    console.log(userData.users);
    setSearchedData(userData.users);
    setTotalPages(Math.ceil(userData.total / limit));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [limit, page]);

  useEffect(() => {
    fetchSearchData();
  }, [searchQuery]);

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
      <div className="w-full ">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:max-w-3xl max-w-2xl mx-auto flex items-center justify-center z-20 my-4 gap-x-4 px-4 md:my-10"
        >
          <Input
            {...form.register("username")}
            placeholder="Search Users ..."
            className="md:max-w-3xl max-w-2xl"
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
              <MobileDataTable
                data={searchQuery ? searchedData : data}
                columns={mobileColumns}
              />
            )}
          </div>
          <div className="hidden md:inline w-full">
            {isLoading ? (
              <LoadingTable columns={columns} data={[]} />
            ) : (
              <DataTable
                columns={columns}
                data={searchQuery ? searchedData : data}
              />
            )}
          </div>
        </div>
      </div>
      <div className="xl:mt-16 mt-4 flex flex-col md:flex-row gap-y-5 justify-evenly w-full">
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
