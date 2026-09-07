type Position = {
  x: number;
  y: number;
};

type MapCoordinatePanelProps = {
  position: Position;
};

export default function MapCoordinatePanel({ position }: MapCoordinatePanelProps) {
  return (
    <div className="absolute left-5 top-5 z-[9999] rounded-xl bg-black/80 px-5 py-4 font-mono text-lg text-white shadow-xl backdrop-blur-md pointer-events-none">
      <div>X: {position.x}</div>
      <div>Y: {position.y}</div>
    </div>
  );
}