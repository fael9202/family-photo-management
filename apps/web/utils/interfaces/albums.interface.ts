export interface IAlbumsResponse {
  albums: IAlbum[];
  totalPages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
}

export interface IAlbum {
  id: number;
  title: string;
  userId: number;
}
