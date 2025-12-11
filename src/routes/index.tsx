import { DynamicSVG } from "../components/dynamic-svg";
import {
  AMPERSAND_SVG_DATA_KEY,
  CHESS_COM_SVG_DATA_KEY,
  DASH_SVG_DATA_KEY,
  DESIGNER_SVG_DATA_KEY,
  DEVELOPER_SVG_DATA_KEY,
  EMAIL_SVG_DATA_KEY,
  ENTREPRENEUR_COMMA_SVG_DATA_KEY,
  ENTREPRENEUR_SVG_DATA_KEY,
  GITHUB_SVG_DATA_KEY,
  LANDON_SVG_DATA_KEY,
  LINKED_IN_SVG_DATA_KEY,
  NAME,
  NOT_FOUND_SVG_DATA_KEY,
  NOTES_SVG_DATA_KEY,
  SCHROPP_SVG_DATA_KEY,
  TIL_SVG_DATA_KEY,
  WRITING_SVG_DATA_KEY,
} from "../constants";
import { fetchSvgData } from "../data/svg";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: async () => {
    return {
      [AMPERSAND_SVG_DATA_KEY]: await fetchSvgData({ data: { key: AMPERSAND_SVG_DATA_KEY } }),
      [CHESS_COM_SVG_DATA_KEY]: await fetchSvgData({ data: { key: CHESS_COM_SVG_DATA_KEY } }),
      [DASH_SVG_DATA_KEY]: await fetchSvgData({ data: { key: DASH_SVG_DATA_KEY } }),
      [DESIGNER_SVG_DATA_KEY]: await fetchSvgData({ data: { key: DESIGNER_SVG_DATA_KEY } }),
      [DEVELOPER_SVG_DATA_KEY]: await fetchSvgData({ data: { key: DEVELOPER_SVG_DATA_KEY } }),
      [EMAIL_SVG_DATA_KEY]: await fetchSvgData({ data: { key: EMAIL_SVG_DATA_KEY } }),
      [ENTREPRENEUR_COMMA_SVG_DATA_KEY]: await fetchSvgData({
        data: { key: ENTREPRENEUR_COMMA_SVG_DATA_KEY },
      }),
      [ENTREPRENEUR_SVG_DATA_KEY]: await fetchSvgData({ data: { key: ENTREPRENEUR_SVG_DATA_KEY } }),
      [GITHUB_SVG_DATA_KEY]: await fetchSvgData({ data: { key: GITHUB_SVG_DATA_KEY } }),
      [LANDON_SVG_DATA_KEY]: await fetchSvgData({ data: { key: LANDON_SVG_DATA_KEY } }),
      [LINKED_IN_SVG_DATA_KEY]: await fetchSvgData({ data: { key: LINKED_IN_SVG_DATA_KEY } }),
      [NOT_FOUND_SVG_DATA_KEY]: await fetchSvgData({ data: { key: NOT_FOUND_SVG_DATA_KEY } }),
      [NOTES_SVG_DATA_KEY]: await fetchSvgData({ data: { key: NOTES_SVG_DATA_KEY } }),
      [SCHROPP_SVG_DATA_KEY]: await fetchSvgData({ data: { key: SCHROPP_SVG_DATA_KEY } }),
      [TIL_SVG_DATA_KEY]: await fetchSvgData({ data: { key: TIL_SVG_DATA_KEY } }),
      [WRITING_SVG_DATA_KEY]: await fetchSvgData({ data: { key: WRITING_SVG_DATA_KEY } }),
    };
  },
  component: IndexPage,
});

const NARROW_SPACING = 0.3;
const MEDIUM_SPACING = 0.4;
const WIDE_SPACING = 0.5;
const EXTRA_WIDE_SPACING = 1.0;

// NOTE: Unfortunately, there's not really a good way to break up this component into separate
// files. The `DynamicSVG`'s parsing algorithm is dependent on having all the SVG elements in its
// children, so nested components don't work. I _could_ use nested function calls instead, but I
// don't think that adds any clarity to the source.
export function IndexPage() {
  const svgData = Route.useLoaderData();

  const landon = <DynamicSVG.Shape key="landon" {...svgData.landon} />;
  const schropp = <DynamicSVG.Shape key="schropp" {...svgData.schropp} />;

  const entrepreneur = <DynamicSVG.Shape key="entrepreneur" {...svgData.entrepreneur} />;
  const entrepreneurComma = <DynamicSVG.Shape key="entrepreneur" {...svgData.entrepreneurComma} />;
  const dashLeft = <DynamicSVG.Shape key="dash-left" {...svgData.dash} />;
  const dashRight = <DynamicSVG.Shape key="dash-right" {...svgData.dash} />;
  const developer = <DynamicSVG.Shape key="developer" {...svgData.developer} />;
  const ampersand = <DynamicSVG.Shape key="ampersand" {...svgData.ampersand} />;
  const designer = <DynamicSVG.Shape key="designer" {...svgData.designer} />;

  const writing = (
    <DynamicSVG.Link href="/articles" title="Writing" key="writing">
      <DynamicSVG.Shape key="writing" {...svgData.writing} />
    </DynamicSVG.Link>
  );

  const notes = (
    <DynamicSVG.Link href="/notes" title="Notes" key="notes">
      <DynamicSVG.Shape key="notes" {...svgData.notes} />
    </DynamicSVG.Link>
  );

  const til = (
    <DynamicSVG.Link href="/today-i-learned" title="Today I Learned" key="til">
      <DynamicSVG.Shape key="til" {...svgData.til} />
    </DynamicSVG.Link>
  );

  const gitHub = (
    <DynamicSVG.Link href="https://github.com/LandonSchropp" title="GitHub" key="github">
      <DynamicSVG.Shape key="github" {...svgData.github} />
    </DynamicSVG.Link>
  );

  const chessCom = (
    <DynamicSVG.Link href="https://www.chess.com/member/landon" title="Chess.com" key="chess-com">
      <DynamicSVG.Shape key="chess-com" {...svgData.chessCom} />
    </DynamicSVG.Link>
  );

  const linkedIn = (
    <DynamicSVG.Link href="https://linkedin.com/in/landonschropp" title="LinkedIn" key="linked-in">
      <DynamicSVG.Shape key="linked-in" {...svgData.linkedIn} />
    </DynamicSVG.Link>
  );

  const email = (
    <DynamicSVG.Link href="mailto:schroppl@gmail.com" title="Email" key="email">
      <DynamicSVG.Shape key="email" {...svgData.email} />
    </DynamicSVG.Link>
  );

  const landscape = (
    <DynamicSVG.Aspect key="landscape" minSpacing={0.02} maxSpacing={0.04}>
      <DynamicSVG.Group title={NAME} key="heading" role="heading">
        <DynamicSVG.Row key="name" align="top" spacing={NARROW_SPACING}>
          {landon}
          {schropp}
        </DynamicSVG.Row>
      </DynamicSVG.Group>

      <DynamicSVG.Group
        title="Entrepreneur, Designer & Developer"
        key="subheading"
        role="doc-subititle"
      >
        <DynamicSVG.Row key="description" align="top" spacing={NARROW_SPACING}>
          {entrepreneurComma}
          {developer}
          {ampersand}
          {designer}
        </DynamicSVG.Row>
      </DynamicSVG.Group>

      <DynamicSVG.Group key="navigation" role="navigation">
        <DynamicSVG.Row key="navigation" align="middle" spacing={WIDE_SPACING}>
          {writing}
          {notes}
          {til}
          {gitHub}
          {chessCom}
          {linkedIn}
          {email}
        </DynamicSVG.Row>
      </DynamicSVG.Group>
    </DynamicSVG.Aspect>
  );

  const narrowLandscape = (
    <DynamicSVG.Aspect key="narrow-landscape" minSpacing={0.04} maxSpacing={0.07}>
      <DynamicSVG.Group title={NAME} key="heading" role="heading">
        <DynamicSVG.Row key="name" align="top" spacing={NARROW_SPACING}>
          {landon}
          {schropp}
        </DynamicSVG.Row>
      </DynamicSVG.Group>

      <DynamicSVG.Group
        title="Entrepreneur, Designer & Developer"
        key="subheading"
        role="doc-subititle"
      >
        <DynamicSVG.Row key="entrepreneur" align="top" spacing={MEDIUM_SPACING}>
          {dashLeft}
          {entrepreneur}
          {dashRight}
        </DynamicSVG.Row>
        <DynamicSVG.Row key="developer-and-designer" align="top" spacing={NARROW_SPACING}>
          {developer}
          {ampersand}
          {designer}
        </DynamicSVG.Row>
      </DynamicSVG.Group>

      <DynamicSVG.Group key="navigation" role="navigation">
        <DynamicSVG.Row key="navigation" align="middle" spacing={WIDE_SPACING}>
          {writing}
          {notes}
          {til}
          {gitHub}
          {chessCom}
          {linkedIn}
          {email}
        </DynamicSVG.Row>
      </DynamicSVG.Group>
    </DynamicSVG.Aspect>
  );

  const square = (
    <DynamicSVG.Aspect key="square" minSpacing={0.04} maxSpacing={0.1}>
      <DynamicSVG.Group title={NAME} key="heading" role="heading">
        <DynamicSVG.Row key="name" align="top" spacing={NARROW_SPACING}>
          {landon}
        </DynamicSVG.Row>
        <DynamicSVG.Row key="last-name" align="top" spacing={NARROW_SPACING}>
          {schropp}
        </DynamicSVG.Row>
      </DynamicSVG.Group>

      <DynamicSVG.Group
        title="Entrepreneur, Designer & Developer"
        key="subheading"
        role="doc-subititle"
      >
        <DynamicSVG.Row key="entrepreneur" align="top" spacing={WIDE_SPACING}>
          {entrepreneur}
        </DynamicSVG.Row>
        <DynamicSVG.Row key="develoer-and-designer" align="top" spacing={WIDE_SPACING}>
          {developer}
          {ampersand}
          {designer}
        </DynamicSVG.Row>
      </DynamicSVG.Group>

      <DynamicSVG.Group key="navigation" role="navigation">
        <DynamicSVG.Row key="navigation" align="middle" spacing={WIDE_SPACING}>
          {writing}
          {notes}
          {til}
          {gitHub}
          {chessCom}
          {linkedIn}
          {email}
        </DynamicSVG.Row>
      </DynamicSVG.Group>
    </DynamicSVG.Aspect>
  );

  const portrait = (
    <DynamicSVG.Aspect key="portrait" minSpacing={0.04} maxSpacing={0.1}>
      <DynamicSVG.Group title={NAME} key="heading" role="heading">
        <DynamicSVG.Row key="name" align="top" spacing={NARROW_SPACING}>
          {landon}
        </DynamicSVG.Row>
        <DynamicSVG.Row key="last-name" align="top" spacing={NARROW_SPACING}>
          {schropp}
        </DynamicSVG.Row>
      </DynamicSVG.Group>

      <DynamicSVG.Group
        title="Entrepreneur, Designer & Developer"
        key="subheading"
        role="doc-subititle"
      >
        <DynamicSVG.Row key="description" align="top" spacing={WIDE_SPACING}>
          {entrepreneurComma}
          {developer}
          {ampersand}
          {designer}
        </DynamicSVG.Row>
      </DynamicSVG.Group>

      <DynamicSVG.Group key="navigation" role="navigation">
        <DynamicSVG.Row key="navigation" align="middle" spacing={WIDE_SPACING}>
          {writing}
          {notes}
          {til}
          {gitHub}
          {chessCom}
          {linkedIn}
          {email}
        </DynamicSVG.Row>
      </DynamicSVG.Group>
    </DynamicSVG.Aspect>
  );

  const tallPortrait = (
    <DynamicSVG.Aspect key="tall-portrait" minSpacing={0.05} maxSpacing={0.12}>
      <DynamicSVG.Group title={NAME} key="heading" role="heading">
        <DynamicSVG.Row key="first-name" align="top" spacing={NARROW_SPACING}>
          {landon}
        </DynamicSVG.Row>
        <DynamicSVG.Row key="last-name" align="top" spacing={NARROW_SPACING}>
          {schropp}
        </DynamicSVG.Row>
      </DynamicSVG.Group>

      <DynamicSVG.Group
        title="Entrepreneur, Designer & Developer"
        key="subheading"
        role="doc-subititle"
      >
        <DynamicSVG.Row key="entrepreneur" align="top" spacing={NARROW_SPACING}>
          {entrepreneur}
        </DynamicSVG.Row>
        <DynamicSVG.Row key="developer-and-designer" align="top" spacing={NARROW_SPACING}>
          {developer}
          {ampersand}
          {designer}
        </DynamicSVG.Row>
      </DynamicSVG.Group>

      <DynamicSVG.Group key="navigation" role="navigation">
        <DynamicSVG.Row key="internal-navigation" align="top" spacing={WIDE_SPACING}>
          {writing}
          {notes}
          {til}
        </DynamicSVG.Row>
        <DynamicSVG.Row key="external-navigation" align="top" spacing={EXTRA_WIDE_SPACING}>
          {gitHub}
          {chessCom}
          {linkedIn}
          {email}
        </DynamicSVG.Row>
      </DynamicSVG.Group>
    </DynamicSVG.Aspect>
  );

  return (
    <DynamicSVG>
      {landscape}
      {narrowLandscape}
      {square}
      {portrait}
      {tallPortrait}
    </DynamicSVG>
  );
}
