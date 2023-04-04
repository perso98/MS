import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import TimeAgo from "../components/TimeAgo";
export default function InfoCard(props) {
  return (
    <Card className="card-container" variant="outlined">
      <CardContent>
        <div className="top-card">
          <Typography>xd</Typography>
          <TimeAgo createdAt={props.createdAt} />
        </div>
        <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          {props.category}
        </div>
        <div className="card-subject">{props.subject}</div>

        <div className="card-content"> {props.desc}</div>
      </CardContent>
      <CardActions className="bottom-card">
        <div>
          <IconButton>
            {" "}
            <FavoriteIcon sx={{ color: "white" }} />
            <Typography sx={{ color: "white", marginLeft: "0.5rem" }}>
              10
            </Typography>
          </IconButton>
        </div>
        <div>
          <IconButton>
            {" "}
            <Typography sx={{ color: "white", marginRight: "0.5rem" }}>
              10
            </Typography>
            <CommentIcon sx={{ color: "white" }} />{" "}
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}
