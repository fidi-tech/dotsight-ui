import Database from './database.svg';
import Discord from './discord.svg';
import FlatStack from './flatStack.svg';
import Github from './github.svg';
import Google from './google.svg';
import LinkedIn from './linkedin.svg';
import Reddit from './reddit.svg';
import Telegram from './telegram.svg';
import X from './x.svg';

export const IconNames = {
  Database: 'Database',
  Discord: 'Discord',
  FlatStack: 'FlatStack',
  Github: 'Github',
  Google: 'Google',
  LinkedIn: 'LinkedIn',
  Reddit: 'Reddit',
  Telegram: 'Telegram',
  X: 'X',
}

export type IconName = typeof IconNames[keyof typeof IconNames];

export const Icons: Record<IconName, any> = {
  [IconNames.Database]: Database,
  [IconNames.Discord]: Discord,
  [IconNames.FlatStack]: FlatStack,
  [IconNames.Github]: Github,
  [IconNames.Google]: Google,
  [IconNames.LinkedIn]: LinkedIn,
  [IconNames.Reddit]: Reddit,
  [IconNames.Telegram]: Telegram,
  [IconNames.X]: X,
} as const;
