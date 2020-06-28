import styled from "styled-components";

type StyledBannerProps = { backgroundColor: string };

export const StyledBanner = styled.div`
  padding: 25px 0;
  position: relative;
  width: 100%;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    width: 100vw;
    transform: translateX(-50%);
    left: 50%;
    height: 100%;
    background: ${(props: StyledBannerProps) => props.backgroundColor};
    box-shadow: inset 0px 0px 25px 20px rgba(0, 0, 0, 0.1);
  }
`;
