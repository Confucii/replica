import FoundItem from "./FoundItem";
import "./styles/FullList.css";

function FullList({
  data,
  type,
  name,
}: {
  data: any;
  type: string;
  name: string;
}) {
  return (
    <div className="FullList">
      <div className="found-name">{name}</div>
      {data.map((item: any) => {
        return <FoundItem key={item.name} type={type} data={item} />;
      })}
    </div>
  );
}

export default FullList;
