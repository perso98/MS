import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LinearProgress from "@mui/material/LinearProgress";

function SearchData(props) {
  return (
    <>
      {props.array.data.length && !props.array.loading ? (
        <InfiniteScroll
          dataLength={props.array.data.length}
          next={props.loadMore}
          hasMore={props.array.hasMore}
          loader={
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <LinearProgress color="inherit" />
            </div>
          }
        >
          {props.array.data.map((val) => {
            return (
              <props.component
                key={val._id}
                val={val}
                setArray={props.setArray}
                array={props.array}
              />
            );
          })}
        </InfiniteScroll>
      ) : (
        <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
          {props.array.loading ? null : "Nothing found"}
        </div>
      )}
      {!props.array.hasMore && props.array.data.length !== 0 ? (
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          There is nothing more
        </div>
      ) : null}{" "}
    </>
  );
}

export default SearchData;
