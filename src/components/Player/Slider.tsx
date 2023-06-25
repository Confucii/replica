import "./styles/Slider.css";

function Slider({ sliderRef, trackRef }: { sliderRef: any; trackRef: any }) {
  function handleChange() {
    trackRef.current.currentTime = sliderRef.current.value / 100;
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
