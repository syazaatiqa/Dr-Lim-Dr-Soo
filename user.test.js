const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

describe("User Account", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.igzzp.mongodb.net/LibrarySystem?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.register("test", "test")
		expect(res).toBe("user created")
	})

	test("Duplicate username", async () => {
		const res = await User.register("test", "test")
		expect(res).toBe("user existed")
	})

	test("User login invalid username", async () => {
		const res = await User.login("melor", "test")
		expect(res).toBe("invalid username")
	})

	test("User login invalid password", async () => {
		const res = await User.login("test", "1234")
		expect(res).toBe("invalid password")
	})

	test("User login successfully", async () => {
		const res = await User.login("test", "test")
		expect(res).toBe("Welcome to the library portal")
	})
});