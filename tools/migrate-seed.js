const fs = require('fs');
const path = require('path');
const {Sequelize} = require('sequelize');
const sequelize = require('../config/database');

async function dropAllTables() {
    console.log('🧨 Dropping all tables...');
    await sequelize.getQueryInterface().dropAllTables();
    console.log('✅ All tables dropped');
}

async function runMigrations() {
    const migrationPath = path.join(__dirname, '../database/migrations');
    const files = fs.readdirSync(migrationPath).sort();

    for (const file of files) {
        const migration = require(path.join(migrationPath, file));
        console.log(`🔄 Migrating: ${file}`);
        await migration.up(sequelize.getQueryInterface(), Sequelize);
    }

    console.log('✅ All migrations executed');
}

async function runSeeders() {
    const seedPath = path.join(__dirname, '../database/seeders');
    const files = fs.readdirSync(seedPath).sort();

    for (const file of files) {
        const seeder = require(path.join(seedPath, file));
        console.log(`🌱 Seeding: ${file}`);
        await seeder.up(sequelize.getQueryInterface(), Sequelize);
    }

    console.log('✅ All seeders executed');
}

(async () => {
    try {
        await dropAllTables();
        await runMigrations();
        await runSeeders();
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    } finally {
        await sequelize.close();
    }
})();