
export type ModelType = 'KumruPro' | 'KumruFlash';

export interface Message {
  role: 'user' | 'model';
  content: string;
}
