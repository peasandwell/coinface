export const steps = [
	{
		title: 'Settings',
		text: 'In order to start viewing your transactions, you need to select the content that will display',
		selector: '{SETTINGS WHEEL}',
	},
	{
		title: 'Wallets',
		text: ('In order to receive Gromits you will need to have set up an electronic wallet. This is a software program that stores your coins. <a href="#">Does this work?</a>'),
		selector: '{ADDRESS INPUT}',
	},
	{
		title: 'Confirmations',
		text: 'When a transaction is sent it needs to be verified ("confirmed"). Information about each transaction is mathematically verified to confirm it is a legitimate transaction. Transactions process faster the fewer confirmations they have. You can choose to have them process faster or slower. We have set a recommended amount for you, but you can change this.',
		selector: '{CONFIRMATIONS INPUT}',
	},
	{
		title: 'Contract Address',
		text: 'We also need to know some information about the currency that Coinfce will be looking for. This is known as the <strong>Contract Address</strong>',
		selector: '{CONTRACT ADDRESS INPUT}',
	},
];
