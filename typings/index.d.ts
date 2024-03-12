import {
  Client,
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
  Snowflake,
  CollectorFilter,
  Collection,
  Awaited,
  BitFieldResolvable,
  MessageMentionOptions,
  StringResolvable,
  SplitOptions,
  MessageEmbed,
  MessageAttachment,
  APIMessageContentResolvable,
} from 'discord.js';

declare module 'discord.js' {
  export interface ClientEvents {
    interactionCreate: [MessageComponentInteraction];
  }

  export interface MessageOptions {
    component?: MessageButton | MessageMenu | MessageActionRow;
    components?: MessageActionRow[];
    button?: MessageButton | MessageButton[];
    buttons?: MessageButton | MessageButton[];
    menu?: MessageMenu | MessageMenu[];
    menus?: MessageMenu | MessageMenu[];
  }

  export interface Message {
    components: MessageActionRow[];
    createButtonCollector(filter: CollectorFilter<MessageComponentInteraction>, options?: AwaitMessageButtonOptions): ButtonCollector;
    awaitButtons(filter: CollectorFilter<MessageComponentInteraction>, options?: AwaitMessageButtonOptions): Promise<Collection<Snowflake, MessageComponentInteraction>>;
  }

  export interface WebhookClient {
    editMessage(message: string, content: APIMessageContentResolvable, options?: {}): Promise<any>;
    deleteMessage(message: string): Promise<void>;
    fetchMessage(message: string, cache?: boolean): Promise<any>;
  }

  export interface PartialTextBasedChannelFields {
    send(content: APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
    send(options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
    send(options: MessageOptions | APIMessage): Promise<Message | Message[]>;
    send(content: StringResolvable, options: (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
    send(content: StringResolvable, options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
    send(content: StringResolvable, options: MessageOptions): Promise<Message | Message[]>;
    send(content: StringResolvable, options: MessageButton | MessageActionRow | MessageMenu): Promise<Message | Message[]>;
  }

  export interface MessageComponent {
    customId: string;
    type: MessageComponentTypes;
    isButton(): this is MessageButtonInteraction;
    isMenu(): this is MessageMenuInteraction;
  }

  export interface MessageEditOptions {
    content?: StringResolvable;
    embeds?: MessageEmbed | MessageEmbedOptions | null;
    code?: string | boolean;
    flags?: BitFieldResolvable<MessageFlagsString>;
    allowedMentions?: MessageMentionOptions;
    component?: MessageButton | MessageActionRow | MessageMenu;
    components?: MessageActionRow[] | MessageMenu[];
    button?: MessageButton | MessageButton[];
    buttons?: MessageButton | MessageButton[];
    menu?: MessageMenu;
    menus?: MessageMenu[];
  }

  export interface ReplyOptions extends MessageOptions {
    ephemeral?: boolean;
    flags?: number;
  }

  export class MessageComponentInteraction {
    customId: string;
    componentType: MessageComponentTypes;
    isButton(): this is MessageButtonInteraction;
    isMenu(): this is MessageMenuInteraction;
  }

  export class MessageButtonInteraction extends MessageComponentInteraction {
    values?: string[];
  }

  export class MessageMenuInteraction extends MessageComponentInteraction {
    values: string[];
  }
}

export enum MessageComponentTypes {
  ACTION_ROW = 1,
  BUTTON = 2,
  SELECT_MENU = 3,
}

export enum MessageButtonStyles {
  blurple = 1,
  grey = 2,
  green = 3,
  red = 4,
  url = 5,

  //Aliases
  gray = 2,
  PRIMARY = 1,
  SECONDARY = 2,
  SUCCESS = 3,
  DESTRUCTIVE = 4,
  LINK = 5,
}

export type MessageButtonStyle = keyof typeof MessageButtonStyles;

export type MessageButtonStyleResolvable = MessageButtonStyle | MessageButtonStyles;

export interface GuildButtonEmoji {
  name?: string;
  id?: Snowflake;
  animated?: boolean;
}

export interface MessageButtonOptions {
  type: MessageComponentTypes.BUTTON;
  style: MessageButtonStyleResolvable;
  label?: string;
  disabled?: boolean;
  emoji?: string | GuildButtonEmoji;
  url?: string;
  id?: string;
  custom_id?: string;
}

export interface MessageMenuOptions {
  type: MessageComponentTypes.SELECT_MENU;
  label?: string;
  emoji?: string | GuildButtonEmoji;
  description?: string;
  value?: string;
}

export interface MessageButtonData {
  type?: MessageComponentTypes.BUTTON;
  style: MessageButtonStyles | number;
  label?: string;
  disabled?: boolean;
  emoji?: GuildButtonEmoji;
  url?: string;
  custom_id?: string;
}

export interface MessageActionRowData {
  type: number | string;
  components: MessageButton[];
}

export interface MessageMenuData {
  type?: MessageComponentTypes.SELECT_MENU;
  placeholder?: string;
  custom_id?: string;
  max_values?: number;
  min_values?: number;
  options?: Array<MessageMenuOptions>;
}

export interface MessageMenuOptionsData {
  label?: string;
  emoji?: string | GuildButtonEmoji;
  description?: string;
  value?: string;
}

export class InteractionReply {
  constructor(client: Client, component: MessageComponentInteraction, webhook: WebhookClient);
  client: Client;
  component: MessageComponentInteraction;
  webhook: WebhookClient;
  has: boolean;
  isEphemeral: boolean;
  send(content: APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions): Promise<this>;
  edit(content: APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions): Promise<this>;
  defer(ephemeral: boolean): Promise<this>;
  think(ephemeral: boolean): Promise<this>;
  fetch(): Promise<any>;
  delete(): Promise<void>;
}

export class APIMessage extends discord.APIMessage {
  public components: MessageActionRow[];
}

export class sendAPICallback extends discord.APIMessage {
  public components: MessageActionRow[];
  public flags: number;
}

export class MessageComponent {
  constructor(client: Client, data: any, menu: boolean);
  client: Client;
  id: Snowflake;
  version: any;
  token: string;
  discordID: Snowflake;
  applicationID: Snowflake;
  guild: Guild;
  channel: Channel;
  values?: string[];
  clicker: {
    id: Snowflake;
    user: User;
    member: GuildMember;
    fetch: () => Promise<boolean>;
  };
  message: Message;
  webhook: WebhookClient;
  reply: InteractionReply;
}

export class BaseMessageComponent {
  constructor(data: MessageActionRow | MessageButton);
  private static create(data: MessageActionRow | MessageButton): MessageActionRow | MessageButton;
}

export class MessageActionRow extends BaseMessageComponent {
  constructor(data?: {});
  setup(data: any): MessageActionRow;
  component: MessageButton | MessageMenu;
  components: MessageButton[] | MessageMenu[];
  addComponents(...components: MessageButton[] | MessageMenu[]): MessageActionRow;
  addComponent(component: MessageButton | MessageMenu): MessageActionRow;
  toJSON(): {
    components: MessageButton[];
    type: string | number;
  };
}

export class MessageButton extends BaseMessageComponent {
  constructor(data?: MessageButton | MessageButtonData | MessageButtonOptions);
  public setup(data: any): MessageButton;
  public style: MessageButtonStyles;
  public label: string;
  public disabled: boolean;
  public emoji: GuildButtonEmoji;
  public url: string;
  public custom_id: string;
  public setStyle(style: MessageButtonStyleResolvable): MessageButton;
  public setLabel(label: string): MessageButton;
  public setDisabled(disabled?: boolean): MessageButton;
  public setURL(url: string): MessageButton;
  public setID(id: string): MessageButton;
  public setEmoji(emoji: any): MessageButton;
  public toJSON(): MessageButtonData;
}

export class MessageMenu extends BaseMessageComponent {
  constructor(data?: any);
  public placeholder: string;
  public max_values: number;
  public min_values: number;
  public options: MessageMenuOption[];
  public custom_id: string;
  public type: string;
  public setup(data: any): MessageMenu;
  public setPlaceholder(label: string): MessageMenu;
  public setID(id: string): MessageMenu;
  public setMaxValues(number: number): MessageMenu;
  public setMinValues(number: number): MessageMenu;
  public addOption(option: MessageMenuOption): MessageMenu;
  public addOptions(...options: MessageMenuOption[]): MessageMenu;
  public removeOptions(index: number, deleteCount: number, ...options: MessageMenuOption[]): MessageMenu;
  public toJSON(): MessageMenuData;
}

export class MessageMenuOption extends BaseMessageComponent {
  constructor(data?: MessageMenuOptionsData);
  public default: boolean;
  public description: string;
  public emoji: string | GuildButtonEmoji;
  public label: string;
  public value: string;
  public type: string;
  public setup(data: MessageMenuOptions): MessageMenuOption;
  public setLabel(label: string): MessageMenuOption;
  public setValue(value: string): MessageMenuOption;
  public setDescription(value: string): MessageMenuOption;
  public setDefault(def?: boolean): MessageMenuOption;
  public setEmoji(emoji: string | GuildButtonEmoji, animted?: boolean): MessageMenuOption;
  public toJSON(): MessageMenuOptionsData;
}

export interface MessageOptions extends discord.MessageOptions {
  component?: MessageButton | MessageMenu | MessageActionRow;
  components?: MessageActionRow[];
  button?: MessageButton | MessageButton[];
  buttons?: MessageButton | MessageButton[];
  menu?: MessageMenu | MessageMenu[];
  menus?: MessageMenu | MessageMenu[];
}

export interface AwaitMessageButtonOptions extends MessageButtonCollectorOptions {
  errors?: string[];
}

export class ButtonCollector extends Collector<Snowflake, MessageComponentInteraction> {
  constructor(message: Message, filter: CollectorFilter<MessageComponentInteraction>, options?: MessageButtonCollectorOptions);
  message: Message;
  users: Collection<Snowflake, User>;
  total: number;
  empty(): void;
  endReason(): string | null;
  _handleChannelDeletion(channel: Channel): void;
  _handleGuildDeletion(guild: Guild): void;
  _handleMessageDeletion(message: Message): void;

  collect(button: MessageButtonInteraction): Snowflake;
  dispose(button: MessageButtonInteraction): Snowflake;
  on(event: 'collect' | 'dispose', listener: (interaction: MessageComponentInteraction) => Awaited<void>): this;
  on(event: 'end', listener: (collected: Collection<Snowflake, MessageComponentInteraction>, reason: string) => Awaited<void>): this;
  on(event: string, listener: (...data: any[]) => Awaited<void>): this;

  once(event: 'collect' | 'dispose', listener: (interaction: MessageComponentInteraction) => Awaited<void>): this;
  once(event: 'end', listener: (collected: Collection<Snowflake, MessageComponentInteraction>, reason: string) => Awaited<void>): this;
  once(event: string, listener: (...data: any[]) => Awaited<void>): this;
}

export interface MessageButtonCollectorOptions extends CollectorOptions {
  max?: number;
  maxButtons?: number;
  maxUsers?: number;
}

export class MenuCollector extends Collector<Snowflake, MessageComponentInteraction> {
  constructor(data: any, filter: CollectorFilter<MessageComponentInteraction>, options?: MessageMenuCollectorOptions);
  public message: Message;
  public users: Collection<Snowflake, User>;
  public total: number;
  public _handleChannelDeletion(channel: Channel): void;
  public _handleGuildDeletion(guild: Guild): void;
  public _handleMessageDeletion(message: Message): void;

  public collect(menu: MessageMenuInteraction): Snowflake;
  public dispose(menu: MessageMenuInteraction): Snowflake;
  public empty(): void;
  public endReason(): string | null;

  on(event: 'collect' | 'dispose', listener: (interaction: MessageComponentInteraction) => Awaited<void>): this;
  on(event: 'end', listener: (collected: Collection<Snowflake, MessageComponentInteraction>, reason: string) => Awaited<void>): this;
  on(event: string, listener: (...data: any[]) => Awaited<void>): this;

  once(event: 'collect' | 'dispose', listener: (interaction: MessageComponentInteraction) => Awaited<void>): this;
  once(event: 'end', listener: (collected: Collection<Snowflake, MessageComponentInteraction>, reason: string) => Awaited<void>): this;
  once(event: string, listener: (...data: any[]) => Awaited<void>): this;
}

export interface MessageMenuCollectorOptions extends CollectorOptions {
  max?: number;
  maxMenus?: number;
  maxUsers?: number;
}

export type MessageAdditions =
  | MessageEmbed
  | MessageAttachment
  | MessageButton
  | MessageActionRow
  | (MessageEmbed | MessageAttachment | MessageButton | MessageActionRow | MessageMenu)[];

export type Awaited<T> = T | Promise<T>;

export interface ExtendedTextChannel extends discord.TextChannel {
  send(content: APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
  send(options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
  send(options: MessageOptions | APIMessage): Promise<Message | Message[]>;
  send(content: StringResolvable, options: (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
  send(content: StringResolvable, options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
  send(content: StringResolvable, options: MessageOptions): Promise<Message | Message[]>;
  send(content: StringResolvable, options: MessageButton | MessageActionRow | MessageMenu): Promise<Message | Message[]>;
}

export interface ExtendedDMChannel extends discord.DMChannel {
  send(content: APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
  send(options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
  send(options: MessageOptions | APIMessage): Promise<Message | Message[]>;
  send(content: StringResolvable, options: (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
  send(content: StringResolvable, options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
  send(content: StringResolvable, options: MessageOptions): Promise<Message | Message[]>;
  send(content: StringResolvable, options: MessageButton | MessageActionRow | MessageMenu): Promise<Message | Message[]>;
}

export interface ExtendedNewsChannel extends discord.NewsChannel {
  send(content: APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
  send(options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
  send(options: MessageOptions | APIMessage): Promise<Message | Message[]>;
  send(content: StringResolvable, options: (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
  send(content: StringResolvable, options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
  send(content: StringResolvable, options: MessageOptions): Promise<Message | Message[]>;
  send(content: StringResolvable, options: MessageButton | MessageActionRow | MessageMenu): Promise<Message | Message[]>;
}

declare module 'discord-buttons' {
  export default function (client: discord.Client): void;
  export function multipleImport(...clients: discord.Client[]): void;
}
