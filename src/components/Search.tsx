import { InputBase, styled } from "@mui/material";

type Props = {
  onHandleQueryChange: (e: string) => void;
};

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Search({ onHandleQueryChange }: Props) {
  return (
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ "aria-label": "search" }}
      onChange={(e) => onHandleQueryChange(e.target.value)}
    />
  );
}
