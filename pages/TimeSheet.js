/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const moment = require('moment');

export default function TimeSheet() {
  const { data: session } = useSession()
  const userEmail = session?.user?.email;
  const userName = session?.user?.name;
  const [allEntries, setAllEntries] = useState([])
  const [date, setDate] = useState(new Date());
  const [totalTime, setTotalTime] = useState(0);
  const [dataFound, setdataFound] = useState(false);

  useEffect(() => {
    const formatedDate = moment(date).format('YYYY-MM-DD')
    
    const getData = async () => {
      if (!userEmail)
        return
      await fetch(`api/day/${userEmail}/${formatedDate}`, { method: 'GET' })
        .then(response => {
          if (!response.ok) {
            throw Error('Entries not found');
            }
            return response.json();
          }).then(timesheetData => {
            setdataFound(true)
            setAllEntries(timesheetData.allEntries)
            setTotalTime(timesheetData.totalTime)
          }
        ).catch(error => {
          setdataFound(false)
          console.log(error)
        })
      }
    getData();
  }, [date, userEmail, totalTime, dataFound]);
  
  const NoData = () => {
    console.log('No Data')
    return(
      <>
        <p className='noData'> No records found for this Date </p>
      </>
    );
  };

  const ShowData = () => {
    console.log('Show Data')
    return(
      <>
      <section className="timesheet-table-all">
        <div className='total-time'>
          Total Time: {new Date(totalTime * 1000).toISOString().slice(11, 19)}
        </div>
        <table className="timesheet-table_table">
          <thead className="timesheet-table_head">
            <tr>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
            </tr>
          </thead>
          {
            allEntries?.map(entry => {
            return (
              <tr key={entry._id}>
                <td>{moment(entry.startTime).format('HH:mm:ss')}</td>
                <td>{moment(entry.endTime).format('HH:mm:ss')}</td>
                <td>{new Date(entry.duration * 1000).toISOString().slice(11, 19)}</td>
              </tr>          
            )})
          }
        </table>
      </section>        
      </>
    );
  };

  return (
      <><Header />
      <section className="timesheet-container">
      <h2>Timesheet</h2>
      <div className="info-container">
        Name: {userName}<br></br>
        Email: {userEmail}
      </div><br></br>
      Filter By Date:
      <DatePicker
        value={date}
        selected={date}
        onChange={date => setDate(date)} />
      </section>
      { dataFound ? <ShowData /> : <NoData /> }
      <Footer /></>
  )
}
