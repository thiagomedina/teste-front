import styled from 'styled-components';


export const Container = styled.div``;

export const Header = styled.header`

padding: 32px 0;
background: #28262E;

`;

export const HeaderContent = styled.div`
   max-width: 1120px;
   margin: 0 auto;
   display: flex;
   align-items: center;

   > img {
     height: 40px;
   }

   button{
     margin-left: auto;
     background: transparent;
     border:0;
   }

   svg{
     color: #999591;
     width:20px;
     height: 20px;
   }
`;



export const Content = styled.main`

   max-width: 1220px;
   margin: 64px auto;
   display: flex;
`;

export const Grid = styled.div`
flex: 1;
margin-right: 120px;

h1{
  font-size: 36px;
}

p{
  margin-top: 8px;
  color: #ff9000;

  
  span + span{
    margin-left: 8px;
    padding-left: 8px;
    border-left: 0.5px solid #ff9000
  }

}

`;


export const UserCard = styled.div`

margin-top:64px;


> strong{
  color: #999591;
  font-size:20px;
  font-weight:400;
  
}

div{
  background: #3e3b47;
  display:flex;
  align-items: center;
  padding: 16px 24px;
  border-radius: 10px;
  margin-top: 24px;
  position: relative;

  img{
    width:80px;
    height:80px;
    border-radius: 50%;
  }

  strong{
    margin-left:24px;

  }
  span{
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #999591;

    svg{
      color: #ff9000;
      margin-right: 8px;
    }
  }
}


`;




