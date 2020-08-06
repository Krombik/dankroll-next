import { wrapper } from "@/redux/store";
import { ServerSideContext } from "@/types";
import { NextPage } from "next";
import { parseCookies } from "nookies";
import { serverSetOffset } from "@/redux/articleTabs/actions";
import Editor from "@/containers/modal/Editor";
import { serverSetAuthorized } from "@/redux/authentication/actions";

const NewArticlePage: NextPage = () => <Editor />;

export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx: ServerSideContext) => {
    const { token, offset = 20 } = parseCookies(ctx);
    if (!token) {
      ctx.res.writeHead(301, { Location: "/" }).end();
      return null;
    }
    await ctx.store.dispatch(serverSetAuthorized(token));
    ctx.store.dispatch(serverSetOffset(+offset));
  }
);

export default NewArticlePage;
