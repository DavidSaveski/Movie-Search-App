import { Link } from "react-router-dom";
import type { FilmType } from "../interface/FilmInterface";
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
      <CardMedia sx={{ height: 140 }} image={film.Poster} title={film.Title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {film.Title} - {film.Year}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/details/${film.imdbID}`}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
