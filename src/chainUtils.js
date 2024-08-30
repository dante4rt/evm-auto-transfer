const colors = require('colors');
const fs = require('fs');
const readlineSync = require('readline-sync');

function loadChains(networkType) {
  const filePath = `./chains/${networkType}.json`;

  if (!fs.existsSync(filePath)) {
    console.log(colors.red(`🚨 Error: The file ${filePath} does not exist.`));
    process.exit(1);
  }

  const chains = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (chains.length === 0) {
    console.log(colors.red(`🚨 Error: No chains found in ${filePath}.`));
    process.exit(1);
  }

  return chains;
}

function selectNetworkType() {
  const networkTypes = ['Testnet 🌐', 'Mainnet 🔗'];

  const selectedIndex = readlineSync.keyInSelect(
    networkTypes,
    'Select the network type:'
  );

  if (selectedIndex === -1) {
    console.log(colors.red('🚨 No network type selected. Exiting...'));
    process.exit(1);
  }

  return selectedIndex === 0 ? 'testnet' : 'mainnet';
}

function selectChain(chains) {
  console.log('');
  console.log(colors.cyan('🌐 Select a blockchain network:'));

  const chainNames = chains.map((chain) => {
    return `${chain.name}`;
  });

  const selectedIndex = readlineSync.keyInSelect(
    chainNames,
    'Which chain do you want to use?'
  );

  if (selectedIndex === -1) {
    console.log(colors.red('🚨 No chain selected. Exiting...'));
    process.exit(1);
  }

  return chains[selectedIndex];
}

module.exports = { loadChains, selectChain, selectNetworkType };
