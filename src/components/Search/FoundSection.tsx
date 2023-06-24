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
  function handleFilter() {
    const elem = document.querySelector(
      `.filter[data-select="${name}"]`
    ) as HTMLElement;
    elem.click();
  }

  return (
    <div className="FoundSection">
      <div className="found-name">{name}</div>
      {data.map((item: any) => {
        return <FoundItem key={item.name} type={type} data={item} />;
      })}
      <button className="found-more" onClick={handleFilter}>
        Show all
      </button>
    </div>
  );
}

export default FoundSection;
