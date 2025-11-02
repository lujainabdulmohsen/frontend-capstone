import "./styles.css";
import { useEffect, useState } from "react";
import sendRequest from "../../utilities/sendRequest";
import AgencyCard from "../../components/AgencyCard";

export default function GovernmentAgencyIndexPage() {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAgencies() {
      const data = await sendRequest("/agencies/");
      setAgencies(data || []);
      setLoading(false);
    }
    getAgencies();
  }, []);

  if (loading) return <h3>Loading...</h3>;
  if (!agencies.length) return <h3>No agencies found.</h3>;

  const displayAgencies = agencies.map((a, i) => (
    <AgencyCard key={i} agency={a} />
  ));

  return (
    <>
      <section className="page-header">
        <h1>Government Agencies</h1>
      </section>
      <section className="agency-card-container">
        {displayAgencies}
      </section>
    </>
  );
}
