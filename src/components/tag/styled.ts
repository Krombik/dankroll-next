import styled from "styled-components";

export const StyledTagList = styled.div`
  padding: 0 8px;
  margin: 0 0 15px;
  position: relative;
  list-style: none;
  &:last-child {
    margin: 8px 0 0;
  }
  & > * {
    margin-bottom: 4px;
    &:not(:last-child) {
      margin-right: 4px;
    }
  }
`;

export const StyledTag = styled.div`
  position: relative;
  display: inline-flex;
  z-index: 9999;
  .MuiInputBase-input {
    padding: 0 4px;
    text-transform: lowercase;
  }
  .MuiChip-label {
    display: flex;
  }
  .drag-area {
    padding-left: 2px;
    font-size: 0.7rem;
    display: inline-flex;
    align-self: center;
    height: 100%;
  }
`;
