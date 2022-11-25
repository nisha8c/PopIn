import Header from '../components/Header'
import Footer from '../components/Footer'
import { useSession } from "next-auth/react"

export default function TimeSheet() {
  const { data: session } = useSession()
  const userId = session.user.id;

  fetch(`api/entries/${userId}`, { 
    method: 'GET',
  })
    .then(response => response.json())
    .then(allEntries => console.log(allEntries));
  
  return (
    <>
      <Header />
      <section className="timesheet-container">
      <h2>Timesheet</h2>
        This is Timesheet....
      </section>
      <Footer />
    </>
  )
}
