export enum CategoryId {
  network = 'network',
  wallet = 'wallet',
  token = 'token',
}

export type Category = {
  id: CategoryId,
  name: string,
  icon: string | null,
}