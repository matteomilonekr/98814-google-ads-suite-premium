---
description: Generate SEO content including text, meta tags, and subtopics
argument-hint: <topic_or_text> [--creativity <0-1>]
---

Generate SEO-optimized content for a topic.

## What to do

1. Parse topic/text from $ARGUMENTS
2. Use `src/modules/content-generation.ts` functions
3. Optional: `--creativity` (0-1, default 0.5)

## Execution Steps

1. `contentGeneration.generateSubTopics(client, { topic })` -> outline
2. `contentGeneration.generateMeta(client, { text: topic })` -> meta title + description
3. `contentGeneration.generate(client, { text: topic, creativity_index })` -> body content

## Output

1. **Meta Tags**: generated title and description
2. **Subtopics/Outline**: suggested sections for the content
3. **Generated Content**: body text
4. **Next Steps**: recommendations for optimization
