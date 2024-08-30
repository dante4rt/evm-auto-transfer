const checkBalance = async (provider, address) => {
  const balance = await provider.getBalance(address);
  return balance;
};

module.exports = checkBalance;
