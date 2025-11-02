import "./styles.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import sendRequest from "../../utilities/sendRequest";
import ServiceCard from "../../components/ServiceCard";

export default function GovernmentAgencyDetailPage() {
  const { id } = useParams();
  const [agency, setAgency] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const agencies = await sendRequest(`/agencies/`);
      const selectedAgency = agencies.find((a) => a.id === Number(id));
      setAgency(selectedAgency);

      const allServices = await sendRequest(`/services/`);
      const agencyServices = allServices.filter(
        (s) => s.agency === Number(id)
      );
      setServices(agencyServices);
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) return <h3>Loading...</h3>;
  if (!agency) return <h3>Agency not found</h3>;

  return (
    <>
      <section className="page-header">
        <h1>{agency.name}</h1>
        <p>{agency.description}</p>
      </section>
      <section className="service-card-container">
        {services.map((s, i) => (
          <ServiceCard key={i} service={s} />
        ))}
      </section>
    </>
  );
}
