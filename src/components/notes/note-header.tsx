import {
  LIVE_TALK_MEDIA,
  PODCAST_MEDIA,
  ARTICLE_MEDIA,
  BOOK_MEDIA,
  COURSE_MEDIA,
  RECORDED_TALK_MEDIA,
  VIDEO_MEDIA,
  APP_MEDIA,
  VIDEO_PLAYLIST_MEDIA,
} from "../../constants";
import {
  AppNote,
  ArticleNote,
  BookNote,
  CourseNote,
  LiveTalkNote,
  Note,
  PodcastNote,
  RecordedTalkNote,
  VideoNote,
  VideoPlaylistNote,
} from "../../types";
import { baseURL } from "../../utilities/url";
import { Listify } from "../base/listify";
import { Header } from "../content/header";
import { Tag } from "../content/tag";
import { ReactElement } from "react";

// NOTE: It turns out it's _really_ hard to represent all of the possible nuances of a byline in a
// readable way. This approach is more verbose, but the goal is that the code is more readable and
// easy to extend.

type NoteProps = {
  note: Note;
};

function shouldSkipAuthors(note: Note & { source?: string }) {
  return (
    note.authors.length === 0 ||
    (note.authors.length === 1 && "source" in note && note.authors[0] === note.source)
  );
}

function NoteAuthors({ note }: NoteProps) {
  return <Listify items={note.authors} />;
}

function NoteSource({ note }: { note: Note & { source: string } }) {
  return <a href={baseURL(note.url)}>{note.source}</a>;
}

type ArticleNoteSubheadProps = { note: ArticleNote };

function ArticleNoteSubheadText({ note }: ArticleNoteSubheadProps) {
  if (shouldSkipAuthors(note)) {
    // prettier-ignore
    return <>An article from <NoteSource note={note} /></>;
  }

  // prettier-ignore
  return <>An article by <NoteAuthors note={note} /> from <NoteSource note={note} /></>;
}

type AppNoteSubheadProps = { note: AppNote };

function AppNoteSubheadText({ note }: AppNoteSubheadProps) {
  if (shouldSkipAuthors(note)) {
    // prettier-ignore
    return <>From the app <NoteSource note={note} /></>;
  }

  // prettier-ignore
  return <>By <NoteAuthors note={note} /> from the app <NoteSource note={note} /></>;
}

type BookNoteSubheadProps = { note: BookNote };

function BookNoteSubheadText({ note }: BookNoteSubheadProps) {
  if (note.authors.length === 0) {
    return null;
  }

  // prettier-ignore
  return <>A book by <NoteAuthors note={note} /></>;
}

type CourseNoteSubheadProps = { note: CourseNote };

function CourseNoteSubheadText({ note }: CourseNoteSubheadProps) {
  if (shouldSkipAuthors(note)) {
    // prettier-ignore
    return <>A course from <NoteSource note={note} /></>;
  }

  // prettier-ignore
  return <>A course by <NoteAuthors note={note} /> from <NoteSource note={note} /></>;
}

type LiveTalkNoteSubheadProps = { note: LiveTalkNote };

function LiveTalkNoteSubheadText({ note }: LiveTalkNoteSubheadProps) {
  if (note.authors.length === 0) {
    return <>A talk I attended at {note.event}</>;
  }

  // prettier-ignore
  return <>A talk by <NoteAuthors note={note} /> I attended at {note.event}</>;
}

type PodcastNoteSubheadProps = { note: PodcastNote };

function PodcastNoteSubheadText({ note }: PodcastNoteSubheadProps) {
  if (shouldSkipAuthors(note)) {
    // prettier-ignore
    return <>From the podcast <NoteSource note={note} /></>;
  }

  // prettier-ignore
  return <>From <NoteSource note={note} />, a podcast by <NoteAuthors note={note} /></>;
}

type RecordedTalkNoteSubheadProps = { note: RecordedTalkNote };

function RecordedTalkNoteSubheadText({ note }: RecordedTalkNoteSubheadProps) {
  if (shouldSkipAuthors(note)) {
    // prettier-ignore
    return <>A talk from <NoteSource note={note} /></>;
  }

  // prettier-ignore
  return <>A talk by <NoteAuthors note={note} /> from {note.source}</>;
}

type VideoNoteSubheadProps = { note: VideoNote };

function VideoNoteSubheadText({ note }: VideoNoteSubheadProps) {
  if (shouldSkipAuthors(note)) {
    // prettier-ignore
    return <>A video by <NoteSource note={note} /></>;
  }

  // prettier-ignore
  return <>A video by <NoteAuthors note={note} /> from <NoteSource note={note} /></>;
}

type VideoPlaylistNoteSubheadProps = {
  note: VideoPlaylistNote;
};

function VideoPlaylistNoteSubheadText({ note }: VideoPlaylistNoteSubheadProps) {
  if (shouldSkipAuthors(note)) {
    // prettier-ignore
    return <>A series of videos from <NoteSource note={note} /></>;
  }

  // prettier-ignore
  return <>A series of videos by <NoteAuthors note={note} /> from <NoteSource note={note} /></>;
}

function NoteSubheadText({ note }: NoteProps): ReactElement | null {
  // If the note's title is the same as the source (indicating they're one and the same), then don't
  // return a subhead. Only check for notes that have a source property.
  if ("source" in note && note.title === note.source) {
    return null;
  }

  switch (note.media) {
    case ARTICLE_MEDIA:
      return <ArticleNoteSubheadText note={note} />;
    case APP_MEDIA:
      return <AppNoteSubheadText note={note} />;
    case BOOK_MEDIA:
      return <BookNoteSubheadText note={note} />;
    case COURSE_MEDIA:
      return <CourseNoteSubheadText note={note} />;
    case LIVE_TALK_MEDIA:
      return <LiveTalkNoteSubheadText note={note} />;
    case PODCAST_MEDIA:
      return <PodcastNoteSubheadText note={note} />;
    case RECORDED_TALK_MEDIA:
      return <RecordedTalkNoteSubheadText note={note} />;
    case VIDEO_MEDIA:
      return <VideoNoteSubheadText note={note} />;
    case VIDEO_PLAYLIST_MEDIA:
      return <VideoPlaylistNoteSubheadText note={note} />;
  }
}

export function NoteHeader({ note }: NoteProps) {
  return (
    <Header
      kicker="My personal notes for"
      title={note.title}
      titleHref={note.url}
      subtitle={<NoteSubheadText note={note} />}
      tags={note.tags.map((tag) => (
        <Tag key={tag} name={tag} href={`/notes?tag=${tag}`} />
      ))}
    />
  );
}
