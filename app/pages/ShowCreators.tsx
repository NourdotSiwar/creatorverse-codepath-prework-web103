import { useEffect, useState } from "react";
import { supabase } from "~/client";
import ContentCreatorCard from "../components/ContentCreatorCard";
import {Link} from "react-router-dom";
import "../app.css";

export default function ShowCreators() {
    const [creators, setCreators] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCreators();
    }, []);

    async function fetchCreators() {
        const { data, error } = await supabase
            .from("creators")
            .select("*");

        if (error) {
            console.error(error);
        } else {
            setCreators(data || []);
        }

        setLoading(false);
    }

    if (loading) return <p>Loading...</p>;

    return (
        <main className="container">
            <h1 className="page-title">Content Creators</h1>

            {creators.length === 0 ? (
                <p>
                    No content creators yet. Click <strong>“Add Creator”</strong> to get
                    started!
                </p>
            ) : (
                <section className="grid">
                    {creators.map((creator) => (
                        <ContentCreatorCard key={creator.id} creator={creator} />
                    ))}
                </section>

            )}

            <Link to="/creators/new" role="button">
                + Add Creator
            </Link>
        </main>
    );

}