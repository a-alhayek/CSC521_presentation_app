import axios from 'axios';
import { useState, useEffect } from 'react';
import { host } from '../components/host';

const useFetchTimeslots = () => {
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);

  const presUrl = `${host}presentations/confirm`;
  const stuUrl = `${host}students`;
  const advUrl = `${host}advisors`;
  const timeUrl = `${host}timeslots`;

  const fetchApi = async (presUrl, stuUrl, advUrl, timeUrl) => {
    setLoad(true);

    try {
      const presResponse = await axios.get(presUrl);
      const timeResponse = await axios.get(timeUrl);
      const stuResponse = await axios.get(stuUrl);
      const advResponse = await axios.get(advUrl);
      const pres = presResponse.data.presentation;
      const stus = stuResponse.data.students;
      const times = timeResponse.data.timeslots;
      const advs = advResponse.data.advisors;
      let arr = [];

      for (let i = 0; i < pres.length; i++) {
        let title, dcrip, advisor, day, start, end;
        let students = [];
        title = pres[i].projectTitle;
        dcrip = pres[i].projectDescription;
        //look for the timeslot
        for (let j = 0; j < times.length; j++) {
          if (pres[i].timeslotId === times[j]._id) {
            day = times[j].day;
            start = times[j].start;
            end = times[j].end;
            break;
          }
        }
        // look for the advisor
        for (let j = 0; j < advs.length; j++) {
          if (pres[i].advisorId === advs[j].advisorid) {
            advisor = `${advs[j].firstName} ${advs[j].lastName}`;
            break;
          }
        }
        //look for the students
        for (let j = 0; j < pres[i].studentsId.length; j++) {
          for (let k = 0; k < stus.length; k++) {
            if (pres[i].studentsId[j] === stus[k].studentid) {
              students.push(`${stus[k].firstName} ${stus[k].lastName} `);
              break;
            }
          }
        }
        let p = { title, dcrip, students, advisor, day, start, end };
        arr.push(p);
      }

      arr.sort((a, b) => {
        return new Date(a.day + a.start.substring(4)) - new Date(b.day + b.start.substring(4));
      });

      setData(arr);
      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchApi(presUrl, stuUrl, advUrl, timeUrl);
  }, []);
  return { data, load };
};

export default useFetchTimeslots;
