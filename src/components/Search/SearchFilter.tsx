import { downcase } from "../../utility";
import "./styles/SearchFilter.css";

function SearchFilter({
  filter,
  setFilter,
}: {
  filter: string | boolean;
  setFilter: Function;
}) {
  function handleClick(e: React.MouseEvent<HTMLElement>) {
    const elementText = downcase(e.currentTarget.textContent || "error");
    if (filter !== elementText) {
      document.querySelector(".chosen")?.classList.remove("chosen");
      e.currentTarget.classList.add("chosen");
      setFilter(elementText);
    } else {
      e.currentTarget.classList.remove("chosen");
      setFilter(false);
    }
  }

  return (
    <div className="SearchFilter">
      <div data-select="Songs" onClick={handleClick} className="filter">
        Songs
      </div>
      <div data-select="Albums" onClick={handleClick} className="filter">
        Albums
      </div>
      <div data-select="Artists" onClick={handleClick} className="filter">
        Artists
      </div>
    </div>
  );
}

export default SearchFilter;
