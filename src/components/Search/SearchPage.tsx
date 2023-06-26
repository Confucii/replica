import { useState } from "react";
import FoundSection from "./FoundSection";
import "./styles/SearchPage.css";
import NoResults from "./NoResults";
import FullList from "./FullList";
import SearchFilter from "./SearchFilter";
import ExactMatch from "./ExactMatch";
import { capitalize } from "../../utility";
import { AlbumDataTransmute, PureData, SongFullData } from "../../interfaces";

function SearchPage({
  allSongs,
  artistsData,
  albumsData,
  search,
}: {
  allSongs: SongFullData[];
  artistsData: PureData[];
  albumsData: AlbumDataTransmute[];
  search: string;
}) {
  const [filter, setFilter] = useState<boolean | string>(false);

  const regex = new RegExp(search, "i");
  let children: (JSX.Element | boolean)[] = [];
  let filteredSongs: SongFullData[];
  let filteredAlbums: AlbumDataTransmute[];
  let filteredArtists: PureData[];
  let allData: (SongFullData | PureData | AlbumDataTransmute)[];

  if (!filter) {
    allData = [...allSongs, ...albumsData, ...artistsData];

    allData.forEach((item: SongFullData | PureData | AlbumDataTransmute) => {
      if (capitalize(item.name) === capitalize(search)) {
        children.push(<ExactMatch key={item.name} data={item} />);
      }
    });

    if (children.length === 0) {
      filteredSongs = allSongs
        .filter((song: SongFullData) => {
          return regex.test(song.name);
        })
        .slice(0, 3);

      filteredAlbums = albumsData
        .filter((album: AlbumDataTransmute) => {
          return regex.test(album.name);
        })
        .slice(0, 3);

      filteredArtists = artistsData
        .filter((artist: PureData) => {
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
    }
  } else {
    switch (filter) {
      case "songs":
        filteredSongs = allSongs.filter((song: SongFullData) => {
          return regex.test(song.name);
        });
        children.push(
          filteredSongs.length > 0 && (
            <FullList
              key="Songs"
              type="song"
              name="Songs"
              data={filteredSongs}
            />
          )
        );
        break;
      case "albums":
        filteredAlbums = albumsData.filter((album: AlbumDataTransmute) => {
          return regex.test(album.name);
        });
        children.push(
          filteredAlbums.length > 0 && (
            <FullList
              key="Albums"
              type="album"
              name="Albums"
              data={filteredAlbums}
            />
          )
        );
        break;
      default:
        filteredArtists = artistsData.filter((artist: PureData) => {
          return regex.test(artist.name);
        });
        children.push(
          filteredArtists.length > 0 && (
            <FullList
              key="Artists"
              type="artist"
              name="Artists"
              data={filteredArtists}
            />
          )
        );
    }
  }
  children = children.filter((child) => child);

  return (
    <div className="SearchPage">
      <SearchFilter filter={filter} setFilter={setFilter} />
      {children.length > 0 ? children : <NoResults search={search} />}
    </div>
  );
}

export default SearchPage;
