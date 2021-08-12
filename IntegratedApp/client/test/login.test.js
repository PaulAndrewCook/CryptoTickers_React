import testLogin from './login.testmodule';

test('Returns Login Link Click', () => {
	expect(testLogin()).toBe(1);
});
