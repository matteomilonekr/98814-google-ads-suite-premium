import { z } from "zod";

// ── Core API types ──────────────────────────────────────────────────────────

export interface DataForSEOCredentials {
  login: string;
  password: string;
}

export interface DataForSEOResponse<T = any> {
  version: string;
  status_code: number;
  status_message: string;
  time: string;
  cost: number;
  tasks_count: number;
  tasks_error: number;
  tasks: DataForSEOTask<T>[];
}

export interface DataForSEOTask<T = any> {
  id: string;
  status_code: number;
  status_message: string;
  time: string;
  cost: number;
  result_count: number;
  path: string[];
  data: Record<string, any>;
  result: T[] | null;
}

// ── SERP types ──────────────────────────────────────────────────────────────

export interface SerpOrganicItem {
  type: string;
  rank_group: number;
  rank_absolute: number;
  domain: string;
  title: string;
  url: string;
  description: string;
  breadcrumb: string;
  is_featured_snippet: boolean;
  timestamp: string;
  etv: number;
  estimated_paid_traffic_cost: number;
}

export interface SerpResult {
  keyword: string;
  type: string;
  se_domain: string;
  location_code: number;
  language_code: string;
  check_url: string;
  datetime: string;
  spell: any;
  refinement_chips: any;
  item_types: string[];
  se_results_count: number;
  items_count: number;
  items: SerpOrganicItem[];
}

export interface SerpTaskResult {
  id: string;
  status_code: number;
  status_message: string;
}

// ── Keywords types ──────────────────────────────────────────────────────────

export interface KeywordData {
  keyword: string;
  location_code: number;
  language_code: string;
  search_partners: boolean;
  competition: string;
  competition_index: number;
  search_volume: number;
  low_top_of_page_bid: number;
  high_top_of_page_bid: number;
  cpc: number;
  monthly_searches: MonthlySearch[];
  keyword_annotations: any;
}

export interface MonthlySearch {
  year: number;
  month: number;
  search_volume: number;
}

export interface KeywordSuggestion {
  keyword: string;
  search_volume: number;
  competition: string;
  competition_index: number;
  cpc: number;
  keyword_properties: {
    se_type: string;
    core_keyword: string;
    synonym_clustering_algorithm: string;
    keyword_difficulty: number;
  };
}

export interface KeywordForSite {
  keyword: string;
  search_volume: number;
  cpc: number;
  competition: string;
  position: number;
  url: string;
}

// ── Backlinks types ─────────────────────────────────────────────────────────

export interface BacklinksSummary {
  target: string;
  total_backlinks: number;
  total_referring_domains: number;
  total_referring_pages: number;
  total_referring_ips: number;
  total_referring_subnets: number;
  nofollow_backlinks: number;
  dofollow_backlinks: number;
  external_backlinks: number;
  internal_backlinks: number;
  referring_domains_nofollow: number;
  referring_domains_dofollow: number;
  rank: number;
  main_domain_rank: number;
  broken_backlinks: number;
  broken_pages: number;
  backlinks_spam_score: number;
}

export interface BacklinkItem {
  type: string;
  domain_from: string;
  url_from: string;
  url_to: string;
  domain_to: string;
  tld_from: string;
  is_new: boolean;
  is_lost: boolean;
  rank: number;
  page_from_rank: number;
  domain_from_rank: number;
  anchor: string;
  text_pre: string;
  text_post: string;
  dofollow: boolean;
  is_broken: boolean;
  first_seen: string;
  last_seen: string;
}

export interface BacklinkAnchor {
  anchor: string;
  backlinks: number;
  referring_domains: number;
  referring_pages: number;
  first_seen: string;
  last_seen: string;
  rank: number;
}

export interface ReferringDomain {
  type: string;
  domain: string;
  rank: number;
  backlinks: number;
  first_seen: string;
  last_seen: string;
  broken_backlinks: number;
  broken_pages: number;
  referring_domains: number;
  referring_pages: number;
  referring_ips: number;
}

export interface BacklinkCompetitor {
  domain: string;
  avg_position: number;
  sum_position: number;
  intersections: number;
  full_domain_rank: number;
}

// ── OnPage types ────────────────────────────────────────────────────────────

export interface OnPageTaskResult {
  id: string;
  status_code: number;
  status_message: string;
}

export interface OnPageSummary {
  target: string;
  crawl_progress: string;
  crawl_status: {
    max_crawl_pages: number;
    pages_in_queue: number;
    pages_crawled: number;
  };
  domain_info: {
    name: string;
    cms: string;
    ip: string;
    server: string;
    crawl_start: string;
    crawl_end: string;
  };
  page_metrics: {
    links_external: number;
    links_internal: number;
    duplicate_title: number;
    duplicate_description: number;
    duplicate_content: number;
    broken_links: number;
    broken_resources: number;
    onpage_score: number;
    non_indexable: number;
  };
}

export interface OnPagePage {
  url: string;
  status_code: number;
  location: string;
  size: number;
  encoded_size: number;
  total_transfer_size: number;
  fetch_time: string;
  content_encoding: string;
  media_type: string;
  meta: {
    title: string;
    description: string;
    canonical: string;
    robots_text: string;
    htags: Record<string, string[]>;
  };
  onpage_score: number;
  total_dom_size: number;
  checks: Record<string, boolean>;
  page_timing: {
    time_to_interactive: number;
    dom_complete: number;
    largest_contentful_paint: number;
    first_input_delay: number;
    connection_time: number;
    time_to_secure_connection: number;
    request_sent_time: number;
    waiting_time: number;
    download_time: number;
    duration_time: number;
  };
}

// ── Labs types ──────────────────────────────────────────────────────────────

export interface LabsDomainRanking {
  domain: string;
  organic_traffic: number;
  organic_cost: number;
  paid_traffic: number;
  paid_cost: number;
  organic_keywords_count: number;
  paid_keywords_count: number;
  etv: number;
  is_new: number;
  is_up: number;
  is_down: number;
  is_lost: number;
}

export interface LabsCompetitor {
  domain: string;
  avg_position: number;
  sum_position: number;
  intersections: number;
  full_domain_rank: number;
  organic_traffic: number;
  organic_cost: number;
}

export interface LabsKeywordSuggestion {
  keyword: string;
  search_volume: number;
  competition: number;
  cpc: number;
  keyword_difficulty: number;
  keyword_properties: {
    se_type: string;
    core_keyword: string;
  };
}

// ── Domain Analytics types ──────────────────────────────────────────────────

export interface TechnologyItem {
  technology: string;
  category: string;
  domain: string;
  first_found: string;
  last_found: string;
}

export interface WhoisRecord {
  domain: string;
  registrar: string;
  creation_date: string;
  expiration_date: string;
  updated_date: string;
  registrant: {
    name: string;
    organization: string;
    email: string;
    country: string;
  };
  name_servers: string[];
}

// ── Content Analysis types ──────────────────────────────────────────────────

export interface ContentAnalysisResult {
  type: string;
  url: string;
  domain: string;
  title: string;
  date_published: string;
  content_quality_score: number;
  sentiment_connotations: {
    anger: number;
    happiness: number;
    love: number;
    sadness: number;
    share: number;
    fun: number;
  };
  connotation_types: {
    positive: number;
    negative: number;
    neutral: number;
  };
  text_category: string[];
  page_category: string[];
  page_types: string[];
  social_metrics: SocialMetrics[];
}

export interface SocialMetrics {
  type: string;
  count: number;
}

// ── Content Generation types ────────────────────────────────────────────────

export interface GeneratedContent {
  input_text: string;
  output_text: string;
  supplement_token: string;
}

export interface ParaphrasedContent {
  input_text: string;
  output_text: string;
}

// ── Merchant types ──────────────────────────────────────────────────────────

export interface MerchantProduct {
  type: string;
  title: string;
  url: string;
  description: string;
  price: number;
  currency: string;
  seller: string;
  rating: {
    rating_type: string;
    value: number;
    votes_count: number;
    rating_max: number;
  };
  marketplace_identifier: string;
}

// ── App Data types ──────────────────────────────────────────────────────────

export interface AppInfo {
  app_id: string;
  title: string;
  url: string;
  icon: string;
  description: string;
  developer: string;
  developer_url: string;
  rating: number;
  reviews_count: number;
  installs_count: number;
  price: number;
  is_free: boolean;
  last_update_date: string;
  category: string;
}

export interface AppReview {
  review_id: string;
  title: string;
  body: string;
  rating: number;
  author: string;
  timestamp: string;
  helpful_count: number;
}

// ── Business Data types ─────────────────────────────────────────────────────

export interface BusinessListing {
  title: string;
  url: string;
  domain: string;
  description: string;
  category: string;
  address: string;
  phone: string;
  rating: {
    value: number;
    votes_count: number;
    rating_max: number;
  };
  is_claimed: boolean;
  latitude: number;
  longitude: number;
  business_id?: string;
}

export interface BusinessReview {
  title: string;
  body: string;
  rating: number;
  author: string;
  timestamp: string;
  url: string;
}

// ── AI Optimization types ───────────────────────────────────────────────────

export interface AIOSearchResult {
  se_type: string;
  keyword: string;
  items: AIOResultItem[];
}

export interface AIOResultItem {
  type: string;
  text: string;
  references: AIOReference[];
}

export interface AIOReference {
  domain: string;
  url: string;
  title: string;
}

// ── Local Falcon types ──────────────────────────────────────────────────────

export interface LocalFalconGridResult {
  keyword: string;
  latitude: number;
  longitude: number;
  grid_size: number;
  points: LocalFalconPoint[];
}

export interface LocalFalconPoint {
  latitude: number;
  longitude: number;
  rank: number | null;
  distance_from_center: number;
}

// ── Zod schemas for input validation ────────────────────────────────────────

export const LocationSchema = z.object({
  location_code: z.number().optional(),
  location_name: z.string().optional(),
  location_coordinate: z.string().optional(),
}).refine(d => d.location_code || d.location_name || d.location_coordinate, {
  message: "At least one location parameter is required",
});

export const SerpLiveSchema = z.object({
  keyword: z.string().min(1),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  device: z.enum(["desktop", "mobile"]).optional().default("desktop"),
  os: z.enum(["windows", "macos"]).optional(),
  depth: z.number().optional().default(100),
  se_domain: z.string().optional(),
});

export const KeywordSearchVolumeSchema = z.object({
  keywords: z.array(z.string().min(1)).min(1).max(1000),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  search_partners: z.boolean().optional().default(false),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
});

export const KeywordSuggestionsSchema = z.object({
  keywords: z.array(z.string().min(1)).min(1),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  include_seed_keyword: z.boolean().optional().default(true),
  limit: z.number().optional().default(100),
});

export const BacklinksSchema = z.object({
  target: z.string().min(1),
  limit: z.number().optional().default(100),
  offset: z.number().optional().default(0),
  mode: z.enum(["as_is", "one_per_domain", "one_per_anchor"]).optional().default("as_is"),
  filters: z.array(z.any()).optional(),
  order_by: z.array(z.string()).optional(),
});

export const OnPageTaskSchema = z.object({
  target: z.string().min(1),
  max_crawl_pages: z.number().optional().default(100),
  start_url: z.string().optional(),
  max_crawl_depth: z.number().optional(),
  enable_javascript: z.boolean().optional().default(false),
  enable_browser_rendering: z.boolean().optional().default(false),
  custom_js: z.string().optional(),
});

export const LabsDomainSchema = z.object({
  target: z.string().min(1),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  limit: z.number().optional().default(100),
  offset: z.number().optional().default(0),
  filters: z.array(z.any()).optional(),
  order_by: z.array(z.string()).optional(),
});

export const ContentAnalysisSchema = z.object({
  keyword: z.string().min(1),
  page_type: z.array(z.string()).optional(),
  search_mode: z.enum(["as_is", "broad_match", "exact_match"]).optional().default("as_is"),
  limit: z.number().optional().default(10),
  internal_list_limit: z.number().optional().default(10),
});

export const ContentGenerationSchema = z.object({
  text: z.string().min(1),
  creativity_index: z.number().min(0).max(1).optional().default(0.5),
  word_count: z.number().optional(),
  supplement_token: z.string().optional(),
});

export const MerchantSchema = z.object({
  keyword: z.string().min(1),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  limit: z.number().optional().default(100),
  price_min: z.number().optional(),
  price_max: z.number().optional(),
});

export const AppDataSchema = z.object({
  app_id: z.string().min(1),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
});

export const BusinessDataSchema = z.object({
  keyword: z.string().min(1),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  limit: z.number().optional().default(20),
});

export const AIOSchema = z.object({
  keyword: z.string().min(1),
  se_type: z.enum(["chatgpt", "claude", "gemini", "perplexity", "copilot"]).optional().default("chatgpt"),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
});

export const LocalFalconSchema = z.object({
  keyword: z.string().min(1),
  lat: z.number(),
  lng: z.number(),
  grid_size: z.enum(["3x3", "5x5", "7x7", "9x9", "11x11", "13x13"]).optional().default("5x5"),
  radius: z.number().optional().default(5),
  place_id: z.string().optional(),
});

// ── Skill definition type ───────────────────────────────────────────────────

export interface SkillDefinition {
  name: string;
  description: string;
  parameters: z.ZodType<any>;
  execute: (params: any) => Promise<any>;
}

// ── Agent types ─────────────────────────────────────────────────────────────

export interface AgentProgress {
  step: string;
  status: "pending" | "running" | "complete" | "error";
  data?: any;
  error?: string;
}

export interface AgentResult<T = any> {
  success: boolean;
  steps: AgentProgress[];
  result: T | null;
  error?: string;
  duration_ms: number;
}

export type ProgressCallback = (progress: AgentProgress) => void;
