import "../styles/NavStyle.css";

type Props = {
  onHandleQueryChange: (e: string) => void;
};

export default function Navigation({ onHandleQueryChange }: Props) {
  return (
    <nav>
      <img src="/public/Images/logo.png" alt="Logo" />
      <ul>
        <li>Home</li>
        <li>Post</li>
        <li>About</li>
      </ul>
      <div>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          onChange={(e) => onHandleQueryChange(e.target.value)}
        />
      </div>
    </nav>
  );
}
