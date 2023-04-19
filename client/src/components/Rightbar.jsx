export default function Rightbar() {
  const friends = [
    "grzyb",
    "wiktor",
    "kamil",
    "nikodem",
    "grzyb",
    "wiktor",
    "kamil",
    "nikodem",
    "grzyb",
    "wiktor",
    "kamil",
    "nikodem",
    "grzyb",
    "wiktor",
    "kamil",
    "nikodem",
    "grzyb",
    "wiktor",
    "kamil",
    "nikodem",
  ];
  return (
    <div className="rightbar-container">
      <div className="friends-container">
        Follows
        <div className="friends-scroll-container">
          {friends.map((val) => (
            <div className="friend-container">
              <div className="friend-img">{val.slice(0, 1)}</div>{" "}
              <div className="friend-info"> {val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
