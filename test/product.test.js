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
        const result = await contract.mint('Palay');
        const totalSupply = await contract.totalSupply();
        assert.equal(totalSupply, 1);
        const event = result.logs[0].args;
        assert.equal(event.tokenId.toNumber(), 0, 'id is correct')
        assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
        assert.equal(event.to, accounts[0], 'to is correct');
    })

    it('list products', async () => {
        await contract.mint('Ampalaya');
        await contract.mint('Saging');
        await contract.mint('Kamote');
        const totalSupply = await contract.totalSupply();

        let product
        let results = []
        for (let index = 1; index < totalSupply; index++) {
            product = await contract.products(index - 1)
            results.push(product)
        }

        let expected = ['Palay', 'Ampalaya', 'Saging'];
        assert.equal(results.join(','), expected.join(','))
    })

});