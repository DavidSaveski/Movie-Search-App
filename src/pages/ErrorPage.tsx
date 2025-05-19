import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <div>ErrorPage</div>

      <Link to={"/"}>Go home!</Link>
    </>
  );
}
