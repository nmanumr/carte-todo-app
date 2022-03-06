export enum Priority {
  HI = 'High',
  MD = 'Medium',
  LO = 'Low',
}

export interface RemoteTaskLabel {
  publicId: string;
  title: string;
}

export interface RemoteUserTask {
  publicId: string;
  title: string;
  priority: Priority;
  labels: RemoteTaskLabel[];
}

export interface RemoteResponse<T> {
  count: number;
  next: number | undefined;
  previous: number | undefined;
  results: T[];
}

export interface LocalUserTask {
  publicId?: string;
  title: string;
  priority: Priority;
  labels: string[];
}
