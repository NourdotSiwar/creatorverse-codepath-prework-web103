import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "~/client";
import "../app.css";

export default function EditCreator() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            setError("Failed to load creator.");
        } else if (data) {
            setName(data.name);
            setUrl(data.url);
            setDescription(data.description);
            setImageURL(data.imageURL || "");
        }

        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!name || !url || !description) {
            setError("All fields except image are required.");
            return;
        }

        const { error } = await supabase
            .from("creators")
            .update({
                name,
                url,
                description,
                imageURL,
            })
            .eq("id", id);

        if (error) {
            console.error(error);
            setError("Failed to update creator.");
        } else {
            navigate(`/creators/${id}`);
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <main className="container">
            <Link className="backbutton" to={`/creators/${id}`}>← Back</Link>

            <h1>Edit Creator</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Channel URL
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Description
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Image URL (optional)
                    <input
                        type="url"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                    />
                </label>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">Save Changes</button>
            </form>
        </main>
    );
}
