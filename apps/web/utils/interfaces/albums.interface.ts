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
  user: {
    username: string;
    email: string;
    id: number;
  };
}


export interface IEditAlbumResponse {
  status: boolean;
  message: string;
  data: IAlbum;
}

export interface IDeleteAlbumResponse {
  status: boolean;
  message: string;
}

export interface IAddAlbumResponse {
  status: boolean;
  message: string;
  data: IAlbum;
}
