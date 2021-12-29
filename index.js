import { readFile } from "fs/promises";
import mariadb from "mariadb";

const { days } = JSON.parse(await readFile("./wakatime.json"));

const conn = await mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA
});

await conn.query("CREATE TABLE editors (date double, editor text, time int)");
await conn.query("CREATE TABLE languages (date double, language text, time int)");
await conn.query("CREATE TABLE machines (date double, machine text, time int)");
await conn.query("CREATE TABLE os (date double, os text, time int)");
await conn.query("CREATE TABLE projects (date double, project text, time int)");

let n = 1;
for (const day of days) {
    console.log(`${n} / ${days.length}`);
    n++;
    const date = Math.floor((new Date(day.date)).getTime() / 1000);
    for (const editor of day.editors) {
        await conn.query(
            `INSERT INTO editors VALUES (?, ?, ?)`,
            [date, editor.name, Math.round(editor.total_seconds)]
        );
    }
    for (const language of day.languages) {
        await conn.query(
            `INSERT INTO languages VALUES (?, ?, ?)`,
            [date, language.name, Math.round(language.total_seconds)]
        );
    }
    for (const machine of day.machines) {
        await conn.query(
            `INSERT INTO machines VALUES (?, ?, ?)`,
            [date, machine.name, Math.round(machine.total_seconds)]
        );
    }
    for (const os of day.operating_systems) {
        await conn.query(
            `INSERT INTO os VALUES (?, ?, ?)`,
            [date, os.name, Math.round(os.total_seconds)]
        );
    }
    for (const project of day.projects) {
        await conn.query(
            `INSERT INTO projects VALUES (?, ?, ?)`,
            [date, project.name, Math.round(project.grand_total.total_seconds)]
        );
    }
}

await conn.end();

console.log("Datat exported!");
