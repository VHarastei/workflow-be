// Define the main message type
export interface TelegramMessage {
  id: number;
  type: 'message';
  date: string;
  date_unixtime: string;
  from: string;
  from_id: string;
  // text: TextContent | TextContent[]; // Can be a string, an array of strings, or TextLink objects
  text_entities: TelegramTextEntity[]; // Array of text entities with link or plain types
  edited?: string; // Optional edited date
  edited_unixtime?: string; // Optional edited unix time
  file?: string; // Optional file path
  file_name?: string; // Optional file name
  mime_type?: string; // Optional MIME type for files
  photo?: string; // Optional photo path
  width?: number; // Optional photo width
  height?: number; // Optional photo height
}

export interface TelegramTextEntity {
  type: 'link' | 'plain';
  text: string;
}

export interface TelegramMessagesData {
  type: string;
  id: number;
  messages: TelegramMessage[];
}

export interface WhatsAppMessage {
  firstName: string; // First name of the sender
  lastName: string; // Last name of the sender (empty string if not available)
  date: string; // ISO-formatted date string
  text: string; // Message text content (empty if the message is only a file)
  file?: string; // Optional file path for attachments (e.g., images, videos, documents)
  mime_type?: string; // Optional MIME type for attached files
}