"use client";

import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export const mobileColumns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Dialog>
          {/* 🔴 The dialog provider outside of the DropdownMenuContent */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <DialogTrigger>Show Details</DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* 🔴 DialogContent ouside of DropdownMenuContent */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User Info</DialogTitle>
              <DialogDescription>
                This is the detailed information of the user.
              </DialogDescription>
            </DialogHeader>
            <p>
              <strong>IP:</strong> {user.ip}
            </p>
            <p>
              <strong>DOB:</strong> {user.birthDate}
            </p>
            <p>
              <strong>Address:</strong> {user.address.address}
            </p>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
