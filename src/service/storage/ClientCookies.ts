import Cookies from 'universal-cookie';
import User from '../../models/UserModel';

class ClientCookies {
	public addLoginCookie(user: any) {
		const cookies = new Cookies();

		var expirationTime = new Date();
		expirationTime.setHours(expirationTime.getHours() + 1);

		var loginCookie = cookies.get('Login');
		if (!loginCookie || (!!loginCookie && new Date().getTime() > new Date(loginCookie.expirationTime).getTime())) {
			cookies.set(
				'Login',
				{
					...user,
					expirationTime,
				},
				{path: '/', expires: expirationTime}
			);
		}
	}

	public getLoginCookieData(): User | null {
		const cookies = new Cookies();
		var cookie = cookies.get('Login');
		if (!cookie || (!!cookie && new Date().getTime() > new Date(cookie.expirationTime).getTime())) {
			return null;
		} else {
			return {
				user_name: cookie.user_name,
				token: cookie.token,
				name: cookie.name,
				email: cookie.email,
				id: cookie.id,
			} as User;
		}
	}

	public deleteLoginCookie() {
		const cookies = new Cookies();
		cookies.remove('Login');
		window.location.reload();
	}
}

export default new ClientCookies();
