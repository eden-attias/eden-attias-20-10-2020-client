export default class CurrentUserStore {
	constructor() {}

	// @action
	// public async updateUserStatistics(statisticData: GetStatisticsModel, token: string) {
	// 	const _res = await DashBoardFetcher.getStatistic(statisticData, token).then((res) => res.data);
	// 	if (_res) {
	// 		this.converStatisticsData(_res);
	// 	} else {
	// 		throw new Error('Could not get statistics ');
	// 	}
	// }

	// @action
	// userSitePathChange(currentPath: string[]) {
	// 	this.userSitePath = currentPath;
	// }

	// @action
	// converStatisticsData(res: any) {
	// 	this.user_statistics.group_name = res.group_name;
	// 	this.user_statistics.total_calls_diff = res.total_calls_diff;
	// 	this.user_statistics.total_calls = res.total_calls_diff;
	// 	this.user_statistics.positive_calls_diff = res.positive_calls_diff;
	// 	this.user_statistics.positive_calls = res.positive_calls;
	// 	this.user_statistics.avg_call_score_diff = res.avg_call_score_diff;
	// 	this.user_statistics.avg_call_score = res.avg_call_score;
	// 	this.user_statistics.avg_call_duration_diff = res.avg_call_duration_diff;
	// 	this.user_statistics.avg_call_duration = res.avg_call_duration;
	// }
}
