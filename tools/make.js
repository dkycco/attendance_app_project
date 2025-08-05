const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');

const args = process.argv.slice(2);
const [type, name] = args;

if (!type || !name) {
	console.error('Usage: node tools/make.js [migration|seeder] [name]');
	process.exit(1);
}

const timestamp = dayjs().format('YYYYMMDDHHmmss');

if (type === 'migration') {
	const filename = `${timestamp}_${name}.js`;
	const filepath = path.join(__dirname, '../database/migrations', filename);

	const content = `
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // TODO: Add migration code here
  },

  down: async (queryInterface, Sequelize) => {
    // TODO: Add rollback code here
  }
};
`;

	fs.writeFileSync(filepath, content);
	console.log(`✅ Migration created: ${filename}`);

} else if (type === 'seeder') {
	const filename = `${timestamp}_${name}.js`;
	const filepath = path.join(__dirname, '../database/seeders', filename);

	const content = `
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // TODO: Insert seed data here
  },

  down: async (queryInterface, Sequelize) => {
    // TODO: Delete seed data here
  }
};
`;

	fs.writeFileSync(filepath, content);
	console.log(`✅ Seeder created: ${filename}`);

} else {
	console.error('Invalid type. Use either "migration" or "seeder".');
	process.exit(1);
}