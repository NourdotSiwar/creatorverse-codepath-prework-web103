import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "~/client";
import "../app.css";

type Creator = {
    id: string;
    name: string;
    url: string;
    description: string;
    imageURL?: string;
};

export default function ViewCreator() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState<Creator | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchCreator();
    }, [id]);

    async function fetchCreator() {
        const { data, error } = await supabase
            .from("creators")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error(error);
        } else {
            setCreator(data);
        }

        setLoading(false);
    }

    if (loading) return <p>Loading creator...</p>;
    if (!creator) return <p>Creator not found.</p>;

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this content creator?"
        );

        if (!confirmed) return;

        const { error } = await supabase
            .from("creators")
            .delete()
            .eq("id", creator?.id);

        if (error) {
            console.error(error);
            alert("Failed to delete creator.");
        } else {
            navigate("/");
        }
    }


    return (
        <main className="container">
            <Link className="backbutton" to="/">← Back to creators</Link>

            <article className="creator-detail">
                <div>
                    {creator.imageURL && (
                        <img
                            src={creator.imageURL}
                            alt={creator.name}
                            style={{ borderRadius: "0.75rem" }}
                        />
                    )}
                </div>

                <div>
                    <h1>{creator.name}</h1>
                    <p>{creator.description}</p>

                    <a href={creator.url} target="_blank" rel="noreferrer">
                        Visit Channel
                    </a>

                    <footer className="actions">
                        <Link to={`/creators/${id}/edit`} role="button">
                            Edit
                        </Link>

                        <button className="secondary" onClick={handleDelete}>Delete</button>
                    </footer>

                </div>
            </article>
        </main>
    );
}
