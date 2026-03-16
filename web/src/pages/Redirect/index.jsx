import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function Redirect() {

  const { shortUrl } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {

    async function redirect() {
      try {

        const response = await fetch(
          `http://localhost:3333/${shortUrl}`
        )

        if (!response.ok) {
          setError(true)
          setLoading(false)
          return
        }

        window.location.href = response.url

      } catch (err) {
        setError(true)
        setLoading(false)
      }
    }

    redirect()

  }, [shortUrl])

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Redirecionando...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Link não encontrado</h2>
      </div>
    )
  }

}

export default Redirect