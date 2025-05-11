import "../styles/NavStyle.css";

export default function Navigation() {
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
        <input id="search" type="text" />
      </div>
    </nav>
  );
}
