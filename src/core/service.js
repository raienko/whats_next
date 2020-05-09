import localization from 'src/utils/localization';
import * as actions from './actions';

export default new (class CoreService {
  _dispatch;

  async init({dispatch}) {
    this._dispatch = dispatch;

    // start services
    await localization.init();

    // disable loading screen
    await this.run(actions.setReady(true));
  }

  run(action) {
    return action(this._dispatch);
  }

  async changeLanguage(language) {
    await localization.changeLanguage(language);
    return this.run(actions.setLanguage(language));
  }

  async auth(phoneNumber, code) {
    return this.run(actions.setToken(`${phoneNumber}/${code}`));
  }
})();
