import Grid from "@mui/material/Grid";
import type { FilmType } from "../interface/FilmInterface";
import Film from "./Film";

type Props = {
  films: FilmType[];
};

export default function FilmList({ films }: Props) {
  return (
    <>
      <Grid container spacing={1}>
        {films?.map((film) => (
          <Grid
            key={film.imdbID}
            size={{ sm: 6, md: 4, lg: 3 }}
            marginTop={"2rem"}
          >
            <Film film={film} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
