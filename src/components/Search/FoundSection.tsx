import FoundItem from "./FoundItem";
import "./styles/FoundSection.css";

function FoundSection({
  name,
  data,
  type,
}: {
  name: string;
  data: any;
  type: string;
}) {
  return (
    <div className="FoundSection">
      <div className="found-name">{name}</div>
      {data.map((item: any) => {
        return <FoundItem key={item.name} type={type} data={item} />;
      })}
    </div>
  );
}

export default FoundSection;
