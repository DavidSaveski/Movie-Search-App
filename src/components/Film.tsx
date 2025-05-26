import { Link } from "react-router-dom";
import { getImageUrl, type FilmType } from "../interface/FilmInterface";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type Props = {
  film: FilmType;
};

export default function Film({ film }: Props) {
  return (
    <Card sx={{ maxWidth: 345, width: "100%" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={getImageUrl(film.poster_path)}
        title={film.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {film.title} - {film.release_date}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/details/${film.id}`}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
