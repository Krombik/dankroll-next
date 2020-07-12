import styled from "styled-components";
import Modal, { ModalProps } from "@material-ui/core/Modal";

type StyledBannerProps = { backgroundColor: string };
export interface StyledModalProps extends ModalProps {
  article?: boolean;
  authorization?: boolean;
}

export const StyledBanner = styled.div<StyledBannerProps>`
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
    background: ${(props) => props.backgroundColor};
    box-shadow: inset 0px 0px 25px 20px rgba(0, 0, 0, 0.1);
  }
`;

export const StyledModal = styled(
  ({ article, authorization, ...props }: StyledModalProps) => (
    <Modal {...props} />
  )
)`
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: ${({ article, authorization }) =>
    authorization ? "600px" : !article ? "1200px" : "auto"};
  margin: auto;
  justify-content: space-between;
  overflow-y: auto;
`;
