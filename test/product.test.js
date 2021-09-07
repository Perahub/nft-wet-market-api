const Product = artifacts.require("Product");

contract('Product', (accounts) => {
    let contract

    before(async () => {
        contract = await Product.deployed();
    });

    it('deploys successfully', async () => {
        const address = contract.address;
        assert.notStrictEqual(address, '');
        assert.notStrictEqual(address, null);
        assert.notStrictEqual(address, undefined);
        assert.notStrictEqual(address, 0x0);
    })

    it('has a name', async () => {
        const name = await contract.name();
        assert.equal(name, 'Product');
    })

    it('has a symbol', async () => {
        const symbol = await contract.symbol();
        assert.equal(symbol, 'PRDCT');
    })

    it('creates a new token', async () => {
        const result = await contract.addItem('0x77bC50f556cAe94a603722992aA2BF688b66c65F', 'http://google.com');
        const totalSupply = await contract.totalSupply();
        assert.equal(totalSupply, 1);
        const event = result.logs[0].args;
        assert.equal(event.tokenId.toNumber(), 0, 'id is correct')
        assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
        assert.equal(event.to, accounts[0], 'to is correct');
    })

});