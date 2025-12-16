import { Link } from "react-router-dom";
import "../app.css";

// @ts-ignore
export default function ContentCreatorCard({ creator }) {
    return (
        <article>
            {creator.imageURL && (
                <img
                    src={creator.imageURL}
                    alt={creator.name}
                    style={{
                        borderRadius: "0.5rem",
                        marginBottom: "1rem",
                        maxHeight: "180px",
                        objectFit: "cover",
                    }}
                />
            )}

            <h3>{creator.name}</h3>
            <p>{creator.description}</p>

            <footer>
                <Link to={`/creators/${creator.id}`} role="button">
                    View Details
                </Link>
            </footer>
        </article>
    );
}
