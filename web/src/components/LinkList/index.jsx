import { Copy, Trash2, Download } from "lucide-react";
import { deleteLink, exportLinks } from "../../services/api";

function LinkList({ links, setLinks }) {

  async function handleDelete(id) {
    await deleteLink(id);

    setLinks((prev) => prev.filter((link) => link.id !== id));
  }

  function handleCopy(shortUrl) {
    const url = `http://localhost:3333/${shortUrl}`;

    navigator.clipboard.writeText(url);

    alert("Link copiado!");
  }

  async function handleDownload() {
    const url = await exportLinks();

    window.open(url, "_blank");
  }

  return (
    <div>

      <div className="list-header">
        <h2>Meus links</h2>

        <button
            className="download-button"
            onClick={handleDownload}
        >
            <Download size={16} />
        </button>
      </div>

      {links.map((link) => (
        <div key={link.id} className="link-item">

          <div className="link-info">
            <a
              className="short-link"
              href={`http://localhost:3333/${link.short_url}`}
              target="_blank"
              rel="noreferrer"
            >
              brev.ly/{link.short_url}
            </a>

            <p className="original-link">
              {link.original_url}
            </p>
          </div>

          <div className="link-actions">
            <span>{link.access_count} acessos</span>

            <button onClick={() => handleCopy(link.short_url)}>
                <Copy size={16} />
            </button>

            <button onClick={() => handleDelete(link.id)}>
                <Trash2 size={16} />
            </button>
          </div>

        </div>
      ))}

    </div>
  );
}

export default LinkList;