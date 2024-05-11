"use client";

import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address.address",
    header: "Address",
  },
  {
    accessorKey: "birthDate",
    header: "D.O.B",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "ip",
    header: "IP",
  },
];
