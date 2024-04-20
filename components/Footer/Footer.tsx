import React from "react";
import styled from "styled-components";

const FooterStyle = styled.footer`
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  margin-top: 40px;

  a {
    color: inherit;
  }

  hr {
    display: none;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    gap: 14px;

    .vertical-line {
      display: none;
    }

    hr {
      display: block;
      width: 100px;
    }

    > div {
      text-align: center;
    }
  }
`;

function Footer() {
  return (
    <FooterStyle>
      <div>
        A 2023&nbsp;
        <strong>
          <a href="https://github.com/judeclark19">Code Couture</a>
        </strong>
        &nbsp;creation
      </div>
      <div className="vertical-line">|</div>
      <hr />
      <div>
        Built by
        <strong>
          &nbsp;
          <a href="https://github.com/judeclark19/home-videos-2">Jude Clark</a>
        </strong>
      </div>
      <div className="vertical-line">|</div>
      <hr />
      <div>Updated April 20, 2024</div>
    </FooterStyle>
  );
}

export default Footer;
