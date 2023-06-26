import "./styles/Slider.css";

function Slider({
  sliderRef,
  trackRef,
}: {
  sliderRef: React.MutableRefObject<HTMLInputElement>;
  trackRef: React.MutableRefObject<HTMLAudioElement>;
}) {
  function handleChange() {
    trackRef.current.currentTime = Number(sliderRef.current.value) / 100;
  }

  return (
    <div className="Slider">
      <input
        className="time-slider"
        type="range"
        defaultValue="0"
        ref={sliderRef}
        onChange={handleChange}
      />
    </div>
  );
}

export default Slider;
