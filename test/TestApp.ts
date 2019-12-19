import { createApp } from '~/express';

class TestApp {
  static instance: any;

  static initiate = (): void => {
    TestApp.instance = createApp();
  };
}

export default TestApp;
