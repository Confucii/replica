import "./styles/FoundItem.css";

function FoundItem({ data, type }: { data: any; type: string }) {
  console.log(data.name);

  return <div className="FoundItem"></div>;
}

export default FoundItem;
