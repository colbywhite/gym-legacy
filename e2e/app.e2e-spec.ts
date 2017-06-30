import { GymLegacyPage } from './app.po';

describe('gym-legacy App', () => {
  let page: GymLegacyPage;

  beforeEach(() => {
    page = new GymLegacyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
