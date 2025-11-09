// ============================================
// USER TYPES
// ============================================

export type RegisterUserRequest = {
  userName: string; // unique id / username
  name: string; // display name
};

export type User = {
  userName: string;
  name: string;
  connectedAt: number;
};

export type RegisterUserResponse = {
  success: boolean;
  user?: User;
  message?: string;
};

export type GetUsersResponse = User[];

// ============================================
// MESSAGE TYPES
// ============================================

export type Message = {
  from: string; // userName of sender
  to: string; // userName of receiver
  text: string; // message content
  ts: number; // timestamp in milliseconds
};

export type SendMessageRequest = {
  from: string;
  to: string;
  text: string;
};

export type SendMessageResponse = {
  success: boolean;
  message?: Message;
};

export type GetMessagesRequest = {
  from: string;
  to: string;
};

export type GetMessagesResponse = {
  messages: Message[];
  user: User;
};

// ============================================
// CONVERSATION TYPES
// ============================================

export type Conversation = {
  userName: string; // the other user in the conversation
  lastMessage: Message | null; // last message in the conversation
};

export type GetConversationsRequest = {
  userName: string;
};

export type GetConversationsResponse = Conversation[];

// ============================================
// SOCKET EVENT TYPES
// ============================================

// Server -> Client events
export type ServerToClientEvents = {
  // Emitted when user list updates
  users: (users: User[]) => void;

  // Emitted when a new message arrives
  message: (message: Message) => void;

  // Emitted when conversations list updates
  conversations: (conversations: Conversation[]) => void;
};

// Client -> Server events
export type ClientToServerEvents = {
  // Register/Login a user
  register: (
    data: RegisterUserRequest,
    callback: (response: RegisterUserResponse) => void
  ) => void;

  // Get all conversations for a user
  getConversations: (
    data: GetConversationsRequest,
    callback: (response: GetConversationsResponse) => void
  ) => void;

  // Get all messages in a conversation
  getMessages: (
    data: GetMessagesRequest,
    callback: (response: GetMessagesResponse) => void
  ) => void;

  // check if user exists
  checkUser: (data: any, callback: (response: any) => void) => void;

  // Send a message
  sendMessage: (
    data: SendMessageRequest,
    callback: (response: SendMessageResponse) => void
  ) => void;
};
