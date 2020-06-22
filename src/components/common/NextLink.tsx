import styled from "styled-components";
import Link, { LinkProps } from "next/link";
import { FC } from "react";

const _NextLink: FC<LinkProps & { to: string; className?: string }> = ({
  to,
  children,
  className,
  ...props
}) => (
  <Link as={to} {...props}>
    <span className={className}>{children}</span>
  </Link>
);

const NextLink = styled(_NextLink)`
  > * {
    cursor: pointer;
  }
`;

export default NextLink;
