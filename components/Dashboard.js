import { useSession } from "next-auth/react"

const determineUser = (session) => session.user.role ? 'Instructor' : 'Student'

const Dashboard = () => {
  const { data: session, status } = useSession()


  const current = new Date();
  const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
  const time = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className='dashboard'>
      <h3>Welcome, { determineUser(session) } !</h3>
      <h3>{date}</h3>
      <h3>{time}</h3>
    </div>
  )
}

export default Dashboard
