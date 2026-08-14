/**
 * Cấu hình thông tin cơ bản của website như title, description và default metadata.
 * Được sử dụng tập trung cho việc hiển thị page title và hỗ trợ SEO.
 */
export const SITE_CONFIG = {
	metadata: {
		title: "Khanh Linh Furniture",
		description:
			"High-quality furniture store for your home. Tables, chairs, wardrobes and more.",
		keywords: [
			"Khanh Linh",
			"furniture",
			"interior",
			"nội thất",
			"bàn ghế",
			"tủ quần áo",
		],
	},
	app: {
		title: "Khanh Linh Furniture",
		slogan: "Beautiful furniture for every home.",
	},
} as const;

export type TSiteConfig = typeof SITE_CONFIG;
