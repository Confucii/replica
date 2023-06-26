export interface PureData {
  imageURL: string;
  name: string;
}

export interface SongData extends PureData {
  audioURL: string;
}

export interface SongDataTransmute extends SongData {
  album: string;
}

export interface SongFullData extends SongData {
  album: string;
  artist: string;
}

export interface AlbumData extends PureData {
  songs: SongData[];
  description: string;
}

export interface ArtistData extends PureData {
  description: string;
  albums: AlbumData[];
  singles: SongData[];
}

export interface AlbumDataTransmute extends PureData {
  artist: string;
}

export interface UserData {
  name: string | null;
  email: string | null;
  img: string | null;
}

export interface SearchHandler {
  searchTerm: string;
  searchStatus: boolean;
}

interface DropdownContext {
  dropdown: boolean;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SearchContext {
  search: SearchHandler;
  setSearch: React.Dispatch<React.SetStateAction<SearchHandler>>;
}

export interface ContextInterface {
  user: UserData;
  dropdownHandler: DropdownContext;
  searchHandler: SearchContext;
}

export interface CarouselData {
  artist: string;
  items: SongFullData[] | AlbumData[] | SongData[];
}

export interface ArtistFullSongList {
  artistFullSongsStatus: boolean;
  artistSongsList: SongDataTransmute[];
}
