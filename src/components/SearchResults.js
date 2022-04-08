export default function SearchResults({ track, chooseTrack }) {
  const handlePlayTrack = () => {
    chooseTrack(track);
  };

  return (
    <div className="resultsContainer">
      <button onClick={handlePlayTrack}>Play song!</button>
      <img src={track.albumUrl} alt="" />
      <div className="songContainer">
        <p>{track.title}</p>
        <p>{track.artist}</p>
      </div>
    </div>
  );
}
