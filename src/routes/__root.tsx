import { DynamicSVG } from "../components/dynamic-svg";
import { NAME, NOT_FOUND_SVG_DATA_KEY } from "../constants";
import { fetchSvgData } from "../data/svg";
import flannel from "../images/flannel.png";
import stylesheetsIndex from "../styles/index.css?url";
import gentiumBookPlusLatin400Italic from "@fontsource/gentium-book-plus/files/gentium-book-plus-latin-400-italic.woff2?url";
import gentiumBookPlusLatin400 from "@fontsource/gentium-book-plus/files/gentium-book-plus-latin-400-normal.woff2?url";
import gentiumBookPlusLatin700 from "@fontsource/gentium-book-plus/files/gentium-book-plus-latin-700-normal.woff2?url";
import openSansLatin400 from "@fontsource/open-sans/files/open-sans-latin-400-normal.woff2?url";
import openSansLatin800 from "@fontsource/open-sans/files/open-sans-latin-800-normal.woff2?url";
import sourceCodeProLatin400 from "@fontsource/source-code-pro/files/source-code-pro-latin-400-normal.woff2?url";
import sourceCodeProLatin700 from "@fontsource/source-code-pro/files/source-code-pro-latin-700-normal.woff2?url";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  loader: async () => ({
    notFoundShape: await fetchSvgData({ data: { key: NOT_FOUND_SVG_DATA_KEY } }),
  }),
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: NAME,
      },
      {
        name: "description",
        content: `${NAME} is a developer, designer and entrepreneur based in Portland, OR.`,
      },
    ],
    links: [
      {
        rel: "shortcut icon",
        type: "image/png",
        href: flannel,
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: openSansLatin400,
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: gentiumBookPlusLatin400,
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: gentiumBookPlusLatin700,
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: openSansLatin800,
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: gentiumBookPlusLatin400Italic,
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: sourceCodeProLatin400,
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: sourceCodeProLatin700,
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: stylesheetsIndex,
      },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

function RootLayout() {
  return (
    <html lang="en-us" className="h-full text-[19px] md:text-[21px] lg:text-[22px]">
      <head>
        <HeadContent />
      </head>
      <body
        className={
          "bg-theme-background flex h-full flex-col font-serif font-normal " +
          "text-theme-text *:flex-[0_0_auto]"
        }
      >
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}

export function NotFoundPage() {
  const { notFoundShape } = Route.useLoaderData();

  return (
    <DynamicSVG>
      <DynamicSVG.Aspect key="not-found" minSpacing={0} maxSpacing={0}>
        <DynamicSVG.Group title="404: Not Found" key="heading" role="heading">
          <DynamicSVG.Row key="heading" align="top" spacing={0}>
            <DynamicSVG.Shape key="not-found" {...notFoundShape} />
          </DynamicSVG.Row>
        </DynamicSVG.Group>
      </DynamicSVG.Aspect>
    </DynamicSVG>
  );
}
