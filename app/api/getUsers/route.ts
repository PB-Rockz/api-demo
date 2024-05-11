import { UserResult } from "@/types";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const searchQuery = searchParams.get('username');
    const skip = limit * (page - 1);

    try {
        if (isNaN(limit) || isNaN(page)) {
            throw new Error('Invalid limit or page');
        }

        if (searchQuery) {
            const res = await fetch(`https://dummyjson.com/users/search?q=${searchQuery}`, {
                next: { revalidate: 60 }, // Revalidate every 60 seconds
            });

            const data = await res.json() as UserResult;
            // console.log(searchQuery);
            // console.log(data);
            return Response.json(data);
            
        }

        if (limit >= 10 && limit <= 100 && skip >= 0) {
            const res = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`, {
                next: { revalidate: 60 }, // Revalidate every 60 seconds
            });

            const data = await res.json() as UserResult;
            return Response.json(data);
        }

        if (limit >= 10 && limit <= 100) {
            const res = await fetch(`https://dummyjson.com/users?limit=${limit}`, {
                next: { revalidate: 60 }, // Revalidate every 60 seconds
            });

            const data = await res.json() as UserResult;
            return Response.json(data);
        }

        throw new Error('Invalid parameters');
    } catch (error) {
        console.error(error);
        return Response.error();
    }
}
