import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";

function ContactPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [id, navigate]);

  if (!id) return null

  return (
    <>
      <h1>Pagina Contatti</h1>
      <span>{id}</span>
    </>
  )
}

export default ContactPage;