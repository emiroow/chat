// ====================== data types ======================
// conversation type
export type conversation = {
  peer: string;
  lastFrom: string;
  lastText: string;
  lastAt: Date;
  totalMessages: number;
};

// message type
export type Message = {
  id: Id;
  chatKey: string;
  from: string;
  to: string;
  text: string;
  sentAt: Date;
};

export type Id = {
  timestamp: number;
  machine: number;
  pid: number;
  increment: number;
  creationTime: Date;
};

export type User = {
  userName: string;
  name: string;
  connectionId: string;
  connectedAt: Date;
};

// API response for GetMessages
export interface IMessagesResponse {
  messages: Message[];
  user: User;
}
// API response for SendMessage
export interface ISendMessageResponse {
  messages: Message[];
  success: boolean;
}

// API response for CheckUser
export interface ICheckUserResponse {
  success: boolean;
  exists: boolean;
  user: User;
}

// API response for Register
export interface IRegisterResponse {
  success: boolean;
  user: User;
}
