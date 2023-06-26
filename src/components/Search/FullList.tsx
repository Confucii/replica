import { AlbumDataTransmute, PureData, SongFullData } from "../../interfaces";
import FoundItem from "./FoundItem";
import "./styles/FullList.css";

function FullList({
  data,
  type,
  name,
}: {
  data: SongFullData[] | PureData[] | AlbumDataTransmute[];
  type: string;
  name: string;
}) {
  return (
    <div className="FullList">
      <div className="found-name">{name}</div>
      {data.map((item: SongFullData | PureData | AlbumDataTransmute) => {
        return <FoundItem key={item.name} type={type} data={item} />;
      })}
    </div>
  );
}

export default FullList;
