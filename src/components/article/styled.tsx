import styled from "styled-components";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import ContentInfo from "../common/ContentInfo";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import { SvgIconProps } from "@material-ui/core";

export const StyledArticlePreview = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 0;
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

interface StyledFavoriteTwoToneIconProps extends SvgIconProps {
  liked: boolean;
}

export const StyledFavoriteTwoToneIcon = styled(
  ({ liked, ...props }: StyledFavoriteTwoToneIconProps) => (
    <FavoriteTwoToneIcon {...props} />
  )
)`
  path:first-child {
    transition: 0.3s;
    opacity: ${({ liked }) => (liked ? 1 : 0)};
  }
`;
