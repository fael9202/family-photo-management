import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AlbumList({ albums, userId }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {albums.map((album) => (
        <Card key={album.id}>
          <CardHeader>
            <CardTitle>{album.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              href={`/users/${userId}/albums/${album.id}`}
              className="text-blue-500 hover:underline"
            >
              View Photos
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
