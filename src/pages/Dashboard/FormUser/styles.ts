import styled from 'styled-components';

export const Container = styled.div`
  h2 {
    font-size: 1.8rem;
    font-weight: normal;
    text-align: center;
    margin: 55px 60px;
  }

  fieldset {
    padding: 0 60px;
    width: 100%;
    text-align: start;
    border: 0;

    & > legend {
      letter-spacing: 0.02em;
      font-variant: small-caps;
      font-weight: 600;
      font-size: 2rem;
      margin-bottom: 8px;
    }

    & > p {
      margin-bottom: 24px;
    }
  }

  form {
    margin: 24px auto;
    max-width: 715px;
  }
`;
export const Header = styled.header`

padding: 32px 0;
background: #28262E;

`;

export const Links = styled.a`
margin-left: 20px;
a{
text-decoration: none;
color: #ff9000;
font-weight:500;


}
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




