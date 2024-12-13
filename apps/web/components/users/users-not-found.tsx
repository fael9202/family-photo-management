"use client";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import messages from "@/utils/messages/pt-br.json";
export default function UsersNotFound() {
  return (
    <Card className="p-6 text-center">
      <CardTitle className="mb-2">
        {messages.users.noUsers}
      </CardTitle>
      <CardDescription>
        {messages.albums.noAlbumsDescription}
      </CardDescription>
    </Card>
  );
}
