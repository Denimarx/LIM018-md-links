const fetch = jest.fn(() => Promise.resolve({
    status: 200,
    ok: 'Ok',
}));
module.exports = {
    fetch,
};
