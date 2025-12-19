import {
  isValidYouTubeUrl,
  isYouTubePlaylistUrl,
  isYouTubeUrl,
  isYouTubeVideoUrl,
} from "./youtube-urls";

describe("isYouTubeUrl", () => {
  describe("when the URL is a YouTube URL", () => {
    it("returns true", () => {
      expect(isYouTubeUrl("https://www.youtube.com/watch?v=abc123")).toBe(true);
    });
  });

  describe("when the URL is a youtu.be URL", () => {
    it("returns true", () => {
      expect(isYouTubeUrl("https://youtu.be/abc123")).toBe(true);
    });
  });

  describe("when the URL is not a YouTube URL", () => {
    it("returns false", () => {
      expect(isYouTubeUrl("https://example.com/video")).toBe(false);
    });
  });
});

describe("isYouTubeVideoUrl", () => {
  describe("when the URL is a standard watch URL", () => {
    it("returns true", () => {
      expect(isYouTubeVideoUrl("https://www.youtube.com/watch?v=abc123")).toBe(true);
    });
  });

  describe("when the URL is a watch URL without www", () => {
    it("returns true", () => {
      expect(isYouTubeVideoUrl("https://youtube.com/watch?v=xyz789")).toBe(true);
    });
  });

  describe("when the URL is a watch URL with additional parameters", () => {
    it("returns true", () => {
      expect(isYouTubeVideoUrl("https://www.youtube.com/watch?v=def456&t=123")).toBe(true);
    });
  });

  describe("when the v parameter is not the first parameter", () => {
    it("returns true", () => {
      expect(isYouTubeVideoUrl("https://www.youtube.com/watch?t=123&v=ghi789")).toBe(true);
    });
  });

  describe("when the URL is a youtu.be short URL", () => {
    it("returns true", () => {
      expect(isYouTubeVideoUrl("https://youtu.be/jkl012")).toBe(true);
    });
  });

  describe("when the URL is a youtu.be URL with query parameters", () => {
    it("returns true", () => {
      expect(isYouTubeVideoUrl("https://youtu.be/mno345?si=abc123def456")).toBe(true);
    });
  });

  describe("when the URL is a playlist URL", () => {
    it("returns false", () => {
      expect(isYouTubeVideoUrl("https://www.youtube.com/playlist?list=PLabc123")).toBe(false);
    });
  });

  describe("when the URL is an embed URL", () => {
    it("returns false", () => {
      expect(isYouTubeVideoUrl("https://www.youtube.com/embed/stu901")).toBe(false);
    });
  });

  describe("when the URL is an embed videoseries URL", () => {
    it("returns false", () => {
      expect(isYouTubeVideoUrl("https://www.youtube.com/embed/videoseries?list=PLghi789")).toBe(
        false,
      );
    });
  });

  describe("when the URL is a channel URL", () => {
    it("returns false", () => {
      expect(isYouTubeVideoUrl("https://www.youtube.com/@example-channel")).toBe(false);
    });
  });

  describe("when the URL is not a YouTube URL", () => {
    it("returns false", () => {
      expect(isYouTubeVideoUrl("https://example.com/video")).toBe(false);
    });
  });
});

describe("isYouTubePlaylistUrl", () => {
  describe("when the URL is a playlist URL", () => {
    it("returns true", () => {
      expect(isYouTubePlaylistUrl("https://www.youtube.com/playlist?list=PLabc123")).toBe(true);
    });
  });

  describe("when the URL is a playlist URL without www", () => {
    it("returns true", () => {
      expect(isYouTubePlaylistUrl("https://youtube.com/playlist?list=PLdef456")).toBe(true);
    });
  });

  describe("when the URL is a playlist URL with additional parameters", () => {
    it("returns true", () => {
      expect(isYouTubePlaylistUrl("https://youtube.com/playlist?list=PLghi789&si=abc123")).toBe(
        true,
      );
    });
  });

  describe("when the URL is a watch URL", () => {
    it("returns false", () => {
      expect(isYouTubePlaylistUrl("https://www.youtube.com/watch?v=jkl012")).toBe(false);
    });
  });

  describe("when the URL is a watch URL with a list parameter", () => {
    it("returns false", () => {
      expect(
        isYouTubePlaylistUrl("https://www.youtube.com/watch?v=mno345&list=PLpqr678&index=21"),
      ).toBe(false);
    });
  });

  describe("when the URL is a youtu.be URL", () => {
    it("returns false", () => {
      expect(isYouTubePlaylistUrl("https://youtu.be/stu901")).toBe(false);
    });
  });

  describe("when the URL is an embed videoseries URL", () => {
    it("returns false", () => {
      expect(isYouTubePlaylistUrl("https://www.youtube.com/embed/videoseries?list=PLvwx234")).toBe(
        false,
      );
    });
  });

  describe("when the URL is a channel URL", () => {
    it("returns false", () => {
      expect(isYouTubePlaylistUrl("https://www.youtube.com/@example-channel")).toBe(false);
    });
  });

  describe("when the URL is not a YouTube URL", () => {
    it("returns false", () => {
      expect(isYouTubePlaylistUrl("https://example.com/video")).toBe(false);
    });
  });
});

describe("isValidYouTubeUrl", () => {
  describe("when the URL is a video URL", () => {
    it("returns true", () => {
      expect(isValidYouTubeUrl("https://www.youtube.com/watch?v=abc123")).toBe(true);
    });
  });

  describe("when the URL is a playlist URL", () => {
    it("returns true", () => {
      expect(isValidYouTubeUrl("https://www.youtube.com/playlist?list=PLdef456")).toBe(true);
    });
  });

  describe("when the URL is a youtu.be URL", () => {
    it("returns true", () => {
      expect(isValidYouTubeUrl("https://youtu.be/ghi789")).toBe(true);
    });
  });

  describe("when the URL is an embed URL", () => {
    it("returns false", () => {
      expect(isValidYouTubeUrl("https://www.youtube.com/embed/jkl012")).toBe(false);
    });
  });

  describe("when the URL is a channel URL", () => {
    it("returns false", () => {
      expect(isValidYouTubeUrl("https://www.youtube.com/@example-channel")).toBe(false);
    });
  });

  describe("when the URL is not a YouTube URL", () => {
    it("returns false", () => {
      expect(isValidYouTubeUrl("https://example.com/video")).toBe(false);
    });
  });
});
