interface DiscordUser {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	public_flags?: number;
	bot?: boolean;
	banner: string | null;
	banner_color: string | null;
	accent_color: number | null;
}