import AuthStore from './AuthStore';
import CurrentUserStore from './CurrentUserStore';
import UiStore from './UiStore';

class Stores {
	public authStore: AuthStore;
	public currentUserStore: CurrentUserStore;
	public uiStore = new UiStore();

	constructor() {
		this.authStore = new AuthStore();
		this.currentUserStore = new CurrentUserStore();
		this.uiStore = new UiStore();
	}

	public getSotres() {
		return {
			authStore: this.authStore,
			currentUserStore: this.currentUserStore,
			uiStore: this.uiStore,
		};
	}
}

const rootStores = new Stores();

export default rootStores.getSotres();
