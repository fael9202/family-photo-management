export interface IAlbumsResponse {
  albums: IAlbum[];
  totalPages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  userName?: string;
  email?: string;
}

export interface IAlbum {
  id: number;
  title: string;
  userId: number;
}
