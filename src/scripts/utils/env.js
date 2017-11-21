import 'matchmedia-polyfill';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class Env {
  /**
   * Constructor
   * @param {Symbol} enforcer
   */
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw 'Cannot construct Env';
    }

    this.init();
  }

  init() {
    this.deviceMediaQuery = window.matchMedia('all and (min-width: 769px)');
    this.deviceMediaQuery.addListener(this.setDesktop);
    this.setDesktop();

    this.orientationMediaQuery = window.matchMedia(
      'all and (orientation: landscape)'
    );
    this.orientationMediaQuery.addListener(this.setOrientation);
    this.setOrientation();
  }

  setDesktop = () => {
    if (this.deviceMediaQuery.matches) {
      this._isDesktop = true;
    } else {
      this._isDesktop = false;
    }
  };

  isDesktop() {
    return this._isDesktop;
  }

  setOrientation = () => {
    if (this.orientationMediaQuery.matches) {
      this._isLandscape = true;
    } else {
      this._isLandscape = false;
    }
  };

  isLandscape() {
    return this._isLandscape;
  }

  /**
   * Singleton
   * @returns {Object}
   */
  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Env(singletonEnforcer);
    }
    return this[singleton];
  }
}

export default Env.instance;
