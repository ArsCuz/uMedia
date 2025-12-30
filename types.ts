
export interface VideoItem {
  id: string;
  url: string;
  prompt: string;
  description: string;
  timestamp: number;
  tags?: string[];
}

export interface GenerationStatus {
  status: 'idle' | 'generating' | 'polling' | 'success' | 'error';
  message: string;
}
