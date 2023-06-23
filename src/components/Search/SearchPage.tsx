import FoundSection from "./FoundSection";
import "./styles/SearchPage.css";

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
  const regex = new RegExp(search, "i");

  const filteredSongs = allSongs
    .filter((song: any) => {
      return regex.test(song.name);
    })
    .slice(0, 3);

  return (
    <div className="SearchPage">
      <FoundSection type="song" name="Songs" data={filteredSongs} />
    </div>
  );
}

export default SearchPage;
