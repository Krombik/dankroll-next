import { wrapper } from "@/redux/store";
import { ServerSideContext, PropsFromServer } from "@/types";
import { NextPage } from "next";
import { parseCookies } from "nookies";
import { serverSetOffset } from "@/redux/articleTabs/actions";
import Editor from "@/containers/modal/Editor";
import { serverSetAuthorized } from "@/redux/authentication/actions";
import fetcher from "@/utils/fetcher";
import { ArticleObj } from "@/types/article";
import { getArticleUrl } from "@/api/article";
import { setCurrentEditor } from "@/redux/editor/actions";
import DefaultErrorPage from "next/error";

const EditArticlePage: NextPage<PropsFromServer<typeof getServerSideProps>> = ({
  slug,
  status,
}) =>
  status ? <DefaultErrorPage statusCode={status} /> : <Editor slug={slug} />;

export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx: ServerSideContext) => {
    const { slug }: any = ctx.query;
    const { token, offset = 20 } = parseCookies(ctx);
    const props: { slug: string; status?: number } = { slug };
    if (token) {
      await ctx.store.dispatch(serverSetAuthorized(token));
      const { article, status } = await fetcher.get<ArticleObj>(
        getArticleUrl(slug),
        token
      );
      if (
        article &&
        ctx.store.getState().authentication.currentUserName ===
          article.author.username
      )
        ctx.store.dispatch(setCurrentEditor(article.slug, article));
      else props.status = status || 403;
    } else props.status = 401;
    ctx.store.dispatch(serverSetOffset(+offset));
    return { props };
  }
);

export default EditArticlePage;
