import { Link } from "react-router-dom";

export const HomePage = () => {

    return (
        <>
            <h1>Embark on a flavorful quiz journey</h1>
            <Link to={`/questionnaire`}>
                <button type="button" >Let's go!</button>
            </Link>
        </>
    )
}