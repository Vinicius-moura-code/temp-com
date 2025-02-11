declare global {
  interface Window {
    OneTrust?: {
      NoticeApi: {
        Initialized: Promise<void>;
        LoadNotices: (urls: string[], flag: boolean) => void;
      };
    };
  }
}
