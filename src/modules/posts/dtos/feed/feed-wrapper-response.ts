import { ViewFeedDto } from "./view-feed.dto";


export interface ViewFeedWrapperResponse {
  data: ViewFeedDto[];
  next_offset: number;
  has_more: boolean;
  seed: string;
}
