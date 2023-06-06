import React from 'react'
import styled from 'styled-components'
import Imgslider from './Imgslider'
import Veiwers from './Veiwers.'
import Recommend from './Recommend'
import NewDisney from './NewDisney'
import Trending from './Trending'
import Orignals from './Orignals'
import { useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs } from "firebase/firestore";
import { useDispatch,useSelector } from 'react-redux'
import {setMovies} from '../features/movies/movieSlice'
import {selectUserName} from  '../features/users/userSlice' ;

// import { doc, onSnapshot, collection, query, where, onSnapshot } from "firebase/firestore";

const Home = () => {

  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let originals = [];
  let newDisneys = [];
  let trending = [];
  useEffect( () => {
    const fetchMovies = async()=>{
      const querySnapshot = await getDocs(collection(db, "movies"));
      querySnapshot.forEach((doc) => {
        console.log(recommends);
        switch (doc.data().type) {
              case "recommend":
                recommends = [...recommends, { id: doc.id, ...doc.data() }];
                break;
              case "new":
                newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
                break;
              case "original":
                originals = [...originals, { id: doc.id, ...doc.data() }];
                break;
              case "trending":
                trending =  [...trending, { id: doc.id, ...doc.data() }];
                break;
            }
            dispatch(setMovies({
              recommend:recommends,
              newDisney:newDisneys,
              original:originals,
              trending:trending,
            }));
        });
    }
        fetchMovies();
  }, [userName]);
  return (
  <Container>
  <Imgslider/> 
   <Veiwers/>
   <Recommend/>
   <NewDisney/>
   <Orignals/>
   <Trending/>
  </Container>
  )
}

const Container = styled.main`
position:relative;
min-height: calc(100vh - 250px);
overflow-x:hidden;
display:block;
top:72px;
padding: 0 calc(3.5vw + 5px);


&:after{
  background:url("./images/home-background.png") center center / cover 
  no-repeat  fixed;
  content:"";
  position:absolute;
  inset:0px;
  opacity:1;
  z-index:-1;

}
`
export default Home
