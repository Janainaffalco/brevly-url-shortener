import { useEffect, useState } from "react";
import LinkForm from "../../components/LinkForm";
import LinkList from "../../components/LinkList";
import { getLinks } from "../../services/api";
import "../../styles/home.css";

function Home() {

  const [links, setLinks] = useState([]);

  useEffect(() => {
    async function loadLinks() {
      const data = await getLinks();
      setLinks(data);
    }

    loadLinks();
  }, []);

  return (
    <div className="container">

      <div className="logo">
        brev.ly
      </div>

      <div className="content">

        <div className="card">
          <LinkForm setLinks={setLinks} />
        </div>

        <div className="card">
          <LinkList links={links} setLinks={setLinks} />
        </div>

      </div>

    </div>
  );
}

export default Home;