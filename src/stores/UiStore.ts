import {action, observable, computed} from 'mobx';

export default class UiStore {
	@observable
	private blockRootUi = false;

	@action
	public blockUiSite = () => {
		this.blockRootUi = true;
	};

	@action
	public unblockUiSite = () => {
		this.blockRootUi = false;
	};

	@computed
	public get shouldBlockUiSite() {
		return this.blockRootUi;
	}
}
