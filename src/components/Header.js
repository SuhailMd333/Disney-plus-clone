import React from "react";
import styled from "styled-components";
import {auth,provider} from '../firebase'
import { onAuthStateChanged, signInWithPopup,signOut } from "firebase/auth";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState
} from '../features/users/userSlice'
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName)
  const userPhoto = useSelector(  selectUserPhoto)


useEffect(() =>{
   
   onAuthStateChanged( auth, (user) => {
if(user) {
  setUser(user)
  navigate("/home")
}
   })


},[userName])


  const handleAuth = () => {
   if(!userName){
    
    signInWithPopup(auth,provider)
    .then((result) =>{
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;
    //   const user = result.user;
    console.log(result)
    setUser(result.user)
    })
    .catch((error) => {
      alert(error.message)
    })
   } else if(userName){
    
    signOut(auth)
    .then(() => {
      dispatch(setSignOutState());
      navigate("/");
    })
    .catch((err) => alert(err.message));
   }
  }

  const setUser = (user) =>{
      
    dispatch(
      setUserLoginDetails({
        name:user.displayName,
        email:user.email,
        photo:user.photoURL,
      })
    )
  }
  return (
    <Nav>
      <Logo href="/">
        <img src="/images/logo.svg" alt="disney+" />
      </Logo>

{/* if else part longin and logout */}


{ !userName ? ( <Login onClick={handleAuth}> Login </Login>) :( <>



{/* if else part longin and logout */}


      <NavMenu>
        <a href="/home">
          <img src="\images\home-icon.svg" alt="  home Icon" />
          <span>HOME</span>
        </a>
        <a href="/home">
          <img src="\images\search-icon.svg" alt="  home Icon" />
          <span>SEARCH</span>
        </a>
        <a href="/home">
          <img src="\images\watchlist-icon.svg" alt="  home Icon" />
          <span>WATCHLIST</span>
        </a>
        <a href="/home">
          <img src="\images\origInal-icon.svg" alt="  home Icon" />
          <span>ORIGNAL</span>
        </a>
        <a href="/home">
          <img src="\images\movie-icon.svg" alt="  home Icon" />
          <span>MOVIE</span>
        </a>
        <a href="/home">
          <img src="\images\series-icon.svg" alt="  home Icon" />
          <span>SERIES</span>
        </a>
      </NavMenu>
      <SignOut>
<UserImg src={userPhoto} alt={userName} />
<DropDown>
  <span onClick={handleAuth}>Sign Out</span>
</DropDown>
</SignOut>
      </>)}
      {/* <Login onClick={handleAuth}> Login </Login> */}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 36px;
  letter-spacing: 3px;
  z-index: 3;
`;
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display-inline: block;
  img {
    display: block;
    width: 100%;
  }
`;
const NavMenu = styled.div`
    display:flex; align-items:center; justify-content:flex-end;
    flex-flow:row nowrap;
    height:100%;
    margin:0 auto 0 25px; padding:0;
    position:relative;

    a{
        display:flex; align-items:center;
        padding:0 12px;

        img{
            height:20px;
            min-width:20px;
            width:20px;
            z-index:auto;
        }
        span{
            color:rgb(249,249,249);
            font-size:13px;
            letter-spacing:1px;
            white-space:nowrap;
            position:relative;
            margin:2px 0 0 7px;

            &:before{
                content:'';
                height:2px;
                opacity:0;
                background-color:rgb(249,249,249);
                border-radius:0px 0px 4px 4px ;
                bottom:-6px;
                position:absolute; right:0; left:0;
                transform-origin:left center;
                transform:scaleX(0);
                transition:all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                width:auto;
                visibility:hidden;
            }
        }
        &:hover{
            span:before{
                transform:scaleX(1);
                visibility:visible;
                opacity:1 !important;
            }
        }
    }
    @media (max-width:768px){
        display:none;
        font-size:9px;
    }
`;
const Login = styled.a`
background-color:rgb(0,0,0,0.6);
padding:8px 16px;
text-transform:uppercase;
letter-spacing;1.5px;
border: 1px solid #f9f9f9;
border-radius:4px;
transition: all 0.3s ease 0s;

&:hover{
  background-color:#f9f9f9;
  color:#000;
  border-color:transparent;
}
`
const UserImg = styled.img`
  height: 100%;
`;
const DropDown = styled.div`
position: absolute;
top: 48px;
right: 0px;
background: rgb(19, 19, 19);
border: 1px solid rgba(151, 151, 151, 0.34);
border-radius: 4px;
box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
padding: 10px;
font-size: 14px;
letter-spacing: 3px;
width: 100px;
opacity: 0;
`;

const SignOut = styled.div`
position: relative;
height: 48px;
width: 48px;
display: flex;
cursor: pointer;
align-items: center;
justify-content: center;

${UserImg} {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

&:hover {
  ${DropDown} {
    opacity: 1;
    transition-duration: 1s;
  }
}
`;
export default Header;
