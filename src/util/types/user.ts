interface UserType {
	username: string;
	createAt: Date | string;
	email: string;
	avatar?: string;
	banner?: string;
	id: string | number;
	dev: boolean;
	team?: string;
	team_id?: string;
	team_icon?: string;
}

export default UserType;