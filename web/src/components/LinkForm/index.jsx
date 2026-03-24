import { useState } from "react";
import { createLink } from "../../services/api";

function LinkForm ({ setLinks }) {

  
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await createLink({
      originalUrl,
      shortUrl,
    });

    //  valida erro
    if (data.error) {
      alert(data.error);
      return;
    }

    setLinks((prevLinks) => [data, ...prevLinks]);

    setOriginalUrl("");
    setShortUrl("");
  }

    return (
      <div>
        <h2>Novo link</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>LINK ORIGINAL</label>
            <input
              placeholder="www.exemplo.com.br"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>LINK ENCURTADO</label>
            <input
              placeholder="brev.ly/"
              value={shortUrl}
              onChange={(e) => setShortUrl(e.target.value)}
            />
          </div>

          <button type="submit" className="primary-button">
            Salvar link
          </button>
        </form>
      </div>
  );
}

export default LinkForm;