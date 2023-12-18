import Database from './database.svg';
import Disconnect from './disconnect.svg';
import Discord from './discord.svg';
import EmptyPipe from './emptyPipe.svg';
import FlatStack from './flatStack.svg';
import Github from './github.svg';
import Google from './google.svg';
import LinkedIn from './linkedin.svg';
import Plus from './plus.svg';
import Reddit from './reddit.svg';
import Telegram from './telegram.svg';
import Trash from './trash.svg';
import X from './x.svg';

export const IconNames = {
  Database: 'Database',
  Disconnect: 'Disconnect',
  Discord: 'Discord',
  EmptyPipe: 'EmptyPipe',
  FlatStack: 'FlatStack',
  Github: 'Github',
  Google: 'Google',
  LinkedIn: 'LinkedIn',
  Plus: 'Plus',
  Reddit: 'Reddit',
  Telegram: 'Telegram',
  Trash: 'Trash',
  X: 'X',
}

export type IconName = typeof IconNames[keyof typeof IconNames];

export const Icons: Record<IconName, any> = {
  [IconNames.Database]: Database,
  [IconNames.Disconnect]: Disconnect,
  [IconNames.Discord]: Discord,
  [IconNames.EmptyPipe]: EmptyPipe,
  [IconNames.FlatStack]: FlatStack,
  [IconNames.Github]: Github,
  [IconNames.Google]: Google,
  [IconNames.LinkedIn]: LinkedIn,
  [IconNames.Plus]: Plus,
  [IconNames.Reddit]: Reddit,
  [IconNames.Telegram]: Telegram,
  [IconNames.Trash]: Trash,
  [IconNames.X]: X,
} as const;
