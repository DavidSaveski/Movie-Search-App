import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <section className="wrap">
        <div>
          <h3>Movie Search App</h3>
          <p>&copy; 2025</p>
        </div>
        <div className="links">
          <ul>
            <Link
              to={"https://www.linkedin.com/in/davidsaveski/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin-in fa-xl"></i>
            </Link>
            <Link
              to={"https://git.brainster.co/David.Saveski-FE19"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="fa-brands fa-gitlab fa-xl"
                style={{ color: " #FFD43B" }}
              ></i>
            </Link>
          </ul>
        </div>
      </section>
    </footer>
  );
}
