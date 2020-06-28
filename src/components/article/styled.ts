import styled from "styled-components";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import ContentInfo from "../common/ContentInfo";

export const StyledArticlePreview = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 0;
`;

export const TagListComponent = styled.ul`
  padding: 0 8px;
  margin: 0 0 15px;
  position: relative;
  &:last-child {
    margin: 8px 0 0;
  }
  & > li {
    margin-bottom: 4px;
    &:not(:last-child) {
      margin-right: 4px;
    }
  }
`;

export const StyledIconButton = styled(IconButton)`
  font-size: inherit;
  color: inherit;
  padding: 5px;
  margin-left: 5px;
  transform: scale(0.9);
`;

export const StyledCardHeader = styled(ContentInfo)`
  padding: 0;
  margin-bottom: 20px;
  position: relative;
`;
