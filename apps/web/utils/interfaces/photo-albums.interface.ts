export interface IPhotoAlbum {
  photos: IPhoto[];
  totalPages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  album: IAlbum;
}

export interface IPhoto {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface IAlbum {
  id: number;
  title: string;
  user: User;
}

export interface User {
  username: string;
  email: string;
}

export interface IEditPhotoResponse {
  status: boolean;
  message: string;
  data: IPhoto;
}

export interface IDeletePhotoResponse {
  status: boolean;
  message: string;
}
