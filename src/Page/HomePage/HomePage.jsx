import { Link } from "react-router-dom";
import "./HomePage.css";
import welcomeImage from "../../assets/welcome-image.png";

export const HomePage = () => {
  return (
    <div className="first-page-container">
      <h1>Embark on a flavorful quiz journey</h1>
      <Link to={`/questionnaire`}>
        <button type="button">Let's go!</button>
      </Link>
      <img src={welcomeImage} alt="fruits and vegetables" />
    </div>
  );
};
