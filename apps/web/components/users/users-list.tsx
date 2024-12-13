"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUsers } from "@/hooks/use-users";
import UsersSkeleton from "./users-skeleton";
import Pagination from "../ui/pagination";
import UsersNotFound from "./users-not-found";
import messages from "@/utils/messages/pt-br.json";

export default function UserList() {
  const { data, isLoading, pagination, setPagination } = useUsers();

  if (isLoading) {
    return <UsersSkeleton />;
  }
  if (!data || data.users.length === 0) {
    return <UsersNotFound />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{messages.users.users}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{messages.users.table.header.name}</TableHead>
              <TableHead>{messages.users.table.header.email}</TableHead>
              <TableHead>{messages.users.table.header.username}</TableHead>
              <TableHead>{messages.users.table.header.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Link
                    href={`/users/${user.id}/albums`}
                    className="text-blue-500 hover:underline"
                  >z
                    {messages.users.table.viewAlbums}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          data={data}
        />
      </CardContent>
    </Card>
  );
}
