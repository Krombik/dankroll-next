import styled from "styled-components";
import Card from "@material-ui/core/Card";
import Tab from "@material-ui/core/Tab";
import Input from "@material-ui/core/Input";

export const StyledArticlePreview = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 0;
`;

export const TagList = styled.ul`
  padding: 0 8px;
  margin: 8px 0 0;
  & > li {
    margin-bottom: 4px;
    &:not(:last-child) {
      margin-right: 4px;
    }
  }
`;

export const StyledAddNewTabButton = styled(Tab)`
  min-width: 0;
  order: 9999;
  .MuiGrid-item {
    width: 0;
    transition: 0.3s ease-in-out;
  }
`;
