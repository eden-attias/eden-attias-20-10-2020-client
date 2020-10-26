import AuthStore from './AuthStore';
import UiStore from './UiStore';

class Stores {
	public authStore: AuthStore;
	public uiStore = new UiStore();

	constructor() {
		this.authStore = new AuthStore();
		this.uiStore = new UiStore();
	}

	public getSotres() {
		return {
			authStore: this.authStore,
			uiStore: this.uiStore,
		};
	}
}

const rootStores = new Stores();

export default rootStores.getSotres();
