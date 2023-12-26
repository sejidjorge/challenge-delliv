import { styled } from "styled-components";

const Typography = {
  Display: styled.h1`
    font-family: var(--exo);
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.25px;
    ${({ theme }) => theme.breakpoints.up("md")} {
      font-size: 57pt;
      line-height: 64pt;
    }
    ${({ theme }) => theme.breakpoints.between("sm", "md")} {
      font-size: 45pt;
      line-height: 52pt;
    }
    ${({ theme }) => theme.breakpoints.down("sm")} {
      font-size: 36pt;
      line-height: 44pt;
    }
  `,

  Headline: styled.h4`
    font-family: var(--exo);
    font-style: normal;
    font-weight: 500;
    ${({ theme }) => theme.breakpoints.down("sm")} {
      font-size: 24pt;
      line-height: 32pt;
    }
    ${({ theme }) => theme.breakpoints.between("sm", "md")} {
      font-size: 28pt;
      line-height: 36pt;
    }
    ${({ theme }) => theme.breakpoints.up("md")} {
      font-size: 32pt;
      line-height: 40pt;
    }
  `,

  Title: styled.p`
    font-family: var(--exo);
    font-style: normal;
    font-weight: 500;
    ${({ theme }) => theme.breakpoints.up("md")} {
      font-size: 22pt;
      line-height: 28pt;
    }
    ${({ theme }) => theme.breakpoints.between("sm", "md")} {
      font-size: 16pt;
      line-height: 24pt;
    }
    ${({ theme }) => theme.breakpoints.down("sm")} {
      font-size: 14pt;
      line-height: 20pt;
    }
  `,

  Body: styled.p`
    font-family: var(--exo);
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.5px;
    ${({ theme }) => theme.breakpoints.up("md")} {
      font-size: 16pt;
      line-height: 24pt;
    }
    ${({ theme }) => theme.breakpoints.between("sm", "md")} {
      font-size: 14pt;
      line-height: 20pt;
    }
    ${({ theme }) => theme.breakpoints.down("sm")} {
      font-size: 12pt;
      line-height: 16pt;
    }
  `,

  Label: styled.p`
    font-family: var(--exo);
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.1px;
    ${({ theme }) => theme.breakpoints.up("md")} {
      font-size: 14pt;
      line-height: 20pt;
    }
    ${({ theme }) => theme.breakpoints.between("sm", "md")} {
      font-size: 12pt;
      line-height: 16pt;
    }
    ${({ theme }) => theme.breakpoints.down("sm")} {
      font-size: 11pt;
      line-height: 16pt;
    }
  `,
  Overline: styled.p`
    font-family: var(--exo);
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.1px;
    ${({ theme }) => theme.breakpoints.up("md")} {
      font-size: 11pt;
      line-height: 16pt;
    }
    ${({ theme }) => theme.breakpoints.between("sm", "md")} {
      font-size: 10pt;
      line-height: 14pt;
    }
    ${({ theme }) => theme.breakpoints.down("sm")} {
      font-size: 9pt;
      line-height: 14pt;
    }
  `,
};

export default Typography;
