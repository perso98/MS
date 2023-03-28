
import './style.css'
import InfoCard from '../components/InfoCard'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
export default function Main() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'maciej',
      surname: 'karek',
      date: '2min ago',
    },
    {
      id: 2,
      name: 'macsdaiej',
      surname: 'ksarek',
      date: '4min ago',
    },
    {
      id: 3,
      name: 'madaciej',
      surname: 'kardsek',
      date: '5min ago',
    },
    {
      id: 4,
      name: 'maciejssss',
      surname: 'kareksss',
      date: '10min ago',
    },
  ]);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    const offset = users.length;
    setTimeout(() => {
      const newUsers = [
        ...users,
        {
          id: offset + 1,
          name: 'Jan',
          surname: 'Kowalski',
          date: '15min ago',
        },
        {
          id: offset + 2,
          name: 'Anna',
          surname: 'Nowak',
          date: '20min ago',
        },
        {
          id: offset + 3,
          name: 'Paweł',
          surname: 'Sowa',
          date: '25min ago',
        },
        {
          id: offset + 4,
          name: 'Karolina',
          surname: 'Jankowska',
          date: '30min ago',
        },
        {
          id: offset + 5,
          name: 'Adam',
          surname: 'Zając',
          date: '35min ago',
        },
      ];
      setUsers(newUsers);
      setHasMore(false)
    }, 2000);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={users.length} 
        next={loadMore} 
        hasMore={hasMore} 
        loader={<div style={{marginTop:'2rem',textAlign:'center'}}><LinearProgress color="inherit"/></div>}
      >
    {users.map(val=><div className='main-element' key={val.id}><InfoCard name={val.name} surname={val.surname} date={val.date}/></div>)}
    </InfiniteScroll>
    </>
  )
}
