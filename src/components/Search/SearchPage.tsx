import { useState } from "react";
import FoundSection from "./FoundSection";
import "./styles/SearchPage.css";
import NoResults from "./NoResults";
import FullList from "./FullList";

function SearchPage({
  allSongs,
  artistsData,
  albumsData,
  search,
}: {
  allSongs: any;
  artistsData: any;
  albumsData: any;
  search: string;
}) {
  const [filter, setFilter] = useState<boolean | string>(false);

  const regex = new RegExp(search, "i");
  let children: any[] = [];
  let filteredSongs, filteredAlbums, filteredArtists;

  if (!filter) {
    filteredSongs = allSongs
      .filter((song: any) => {
        return regex.test(song.name);
      })
      .slice(0, 3);

    filteredAlbums = albumsData
      .filter((album: any) => {
        return regex.test(album.name);
      })
      .slice(0, 3);

    filteredArtists = artistsData
      .filter((artist: any) => {
        return regex.test(artist.name);
      })
      .slice(0, 3);

    children.push(
      filteredSongs.length > 0 && (
        <FoundSection
          key="song"
          type="song"
          name="Songs"
          data={filteredSongs}
        />
      ),
      filteredAlbums.length > 0 && (
        <FoundSection
          key="album"
          type="album"
          name="Albums"
          data={filteredAlbums}
        />
      ),
      filteredArtists.length > 0 && (
        <FoundSection
          key="artist"
          type="artist"
          name="Artists"
          data={filteredArtists}
        />
      )
    );
  } else {
    switch (filter) {
      case "songs":
        filteredSongs = allSongs.filter((song: any) => {
          return regex.test(song.name);
        });
        children.push(
          <FullList type="song" name="Songs" data={filteredSongs} />
        );
        break;
      case "albums":
        filteredAlbums = albumsData.filter((album: any) => {
          return regex.test(album.name);
        });
        children.push(
          <FullList type="album" name="Albums" data={filteredAlbums} />
        );
        break;
      default:
        filteredArtists = artistsData.filter((artist: any) => {
          return regex.test(artist.name);
        });
        children.push(
          <FullList type="artist" name="Artists" data={filteredArtists} />
        );
    }
  }
  children = children.filter((child) => child);

  return (
    <div className="SearchPage">
      {children.length > 0 ? children : <NoResults search={search} />}
    </div>
  );
}

export default SearchPage;
