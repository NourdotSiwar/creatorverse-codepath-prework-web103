import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "~/client";
import "../app.css";

export default function AddCreator() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!name || !url || !description) {
            setError("Please fill out all required fields.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.from("creators").insert([
            {
                name,
                url,
                description,
                imageURL,
            },
        ]);

        if (error) {
            console.error(error);
            setError("Failed to add creator.");
        } else {
            navigate("/");
        }

        setLoading(false);
    }

    return (
        <main className="container">
            <Link className="backbutton" to="/">← Back</Link>

            <h1>Add Content Creator</h1>

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

                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Creator"}
                </button>
            </form>
        </main>
    );
}
