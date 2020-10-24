import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export default class AlertUtils {
	public static async showSuccessPopUp(title: string, message?: string, callback?: any) {
		return Swal.fire({
			icon: 'success',
			html: message,
			title: title,
			confirmButtonText: 'Ok',
		}).then((res) => {
			if (res.isConfirmed && callback) {
				callback();
			}
		});
	}

	public static async showErrorMessege(title: string, message: string) {
		return Swal.fire({
			icon: 'error',
			title: title,
			text: message,
		});
	}

	public static async showQuestionMessage(callback: any) {
		return Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				callback();
				Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
			}
		});
	}
}
