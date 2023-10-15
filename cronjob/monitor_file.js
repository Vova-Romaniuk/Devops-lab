const fs = require("fs");
const redis = require("redis");

const client = redis.createClient();

const filePath = "/Users/vovaromanyuck/Desktop/Devops_lab/cronjob/info.txt";
const redisKey = "key";

function checkFileSize() {
	fs.stat(filePath, (err, stats) => {
		if (err) {
			console.error(err);
			return;
		}

		const fileSize = stats.size;
		client.get(redisKey, (redisErr, redisValue) => {
			if (redisErr) {
				console.error(redisErr);
				return;
			}

			if (parseInt(redisValue) !== fileSize) {
				console.log("Розмір файлу змінився.");
				client.set(redisKey, fileSize);
			} else {
				console.log("Розмір файлу залишається незмінним.");
			}
		});
	});
}

checkFileSize();
