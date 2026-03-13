---
name: seo:youtube-serp
description: YouTube SERP analysis - video rankings, metadata, channel info, comments
argument-hint: <keyword> [--type search|video-info|comments] [--location <code>]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Analyze YouTube search results and video metadata for a keyword.

## What to do

1. Read `src/modules/serp.ts` to understand YouTube SERP functions
2. Use `serp.youtubeSearchLive` for search results, `serp.youtubeVideoInfoLive` for video details
3. Parse the keyword from $ARGUMENTS (first argument)
4. Optional flags: `--type` (default search), `--location` (default 2840)

## Execution

```typescript
import { createClient, serp } from "./src/index";
const client = createClient();

// YouTube search
const results = await serp.youtubeSearchLive(client, {
  keyword: "<keyword>",
  location_code: 2840,
});

// Video info (if video URL provided)
const videoInfo = await serp.youtubeVideoInfoLive(client, {
  video_id: "<video_id>",
});

// Comments (if video URL provided)
const comments = await serp.youtubeVideoCommentsLive(client, {
  video_id: "<video_id>",
});
```

## Output

Present results as:
1. **Search Results**: rank, title, channel, views, publish date, duration
2. **Top Channels**: which channels dominate for this keyword
3. **Video Metadata** (if video specified): title, description, tags, views, likes, comments count
4. **Comment Analysis** (if requested): top comments, sentiment overview, engagement patterns
5. **Content Opportunities**: gaps in existing content, suggested video topics
