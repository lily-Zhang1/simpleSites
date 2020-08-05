"use strict";
const fs = require("fs");
const sqlite = require("aa-sqlite");

async function createData() {

    await sqlite.open('./test.db')

    // Adds a table

    let sql = 'CREATE TABLE Country (id INTEGER PRIMARY KEY,' +
        'name VARCHAR(100) NOT NULL,mortality INTEGER NOT NULL,' +
        'recovery INTEGER NOT NULL,confirmed INTEGER NOT NULL, time date NOT NULL)';
    await sqlite.run(sql);

    sql = "CREATE TABLE User (" +
        "id INTEGER PRIMARY KEY," +
        "username VARCHAR(100) NOT NULL," +
        "email INTEGER NOT NULL," +
        "password INTEGER NOT NULL )";
    await sqlite.run(sql);

    // Fills the table
    let mortality = {"UK": 36757, "FRANCE": 28218, "USA": 98683};
    let recovery = {"UK": 1142, "FRANCE": 63988, "USA": 446914};
    let confirmed = {"UK": 258511, "FRANCE": 182036, "USA": 1666828};
    let id = 1;
    for(let x in mortality) {
        let entry = `'${id}','${x}','${mortality[x]}','${recovery[x]}','${confirmed[x]}','2020-05-24'`;
        let sql = "INSERT INTO Country(id, name, mortality, recovery, confirmed, time) VALUES (" + entry + ")";
        await sqlite.run(sql);
        id++;
    }

    mortality = {"UK": 36875, "FRANCE": 28370, "USA": 99300};
    recovery = {"UK": 1151, "FRANCE": 64735, "USA": 451702};
    confirmed = {"UK": 260916, "FRANCE": 182709, "USA": 1686436};
    for(let x in mortality) {
        let entry = `'${id}','${x}','${mortality[x]}','${recovery[x]}','${confirmed[x]}','2020-05-25'`;
        let sql = "INSERT INTO Country(id, name, mortality, recovery, confirmed, time) VALUES (" + entry + ")";
        await sqlite.run(sql);
        id++;
    }

    mortality = {"UK": 37130, "FRANCE": 28460, "USA": 99805};
    recovery = {"UK": 1161, "FRANCE": 65317, "USA": 464670};
    confirmed = {"UK": 266590, "FRANCE": 183067, "USA": 1706226};
    for(let x in mortality) {
        let entry = `'${id}','${x}','${mortality[x]}','${recovery[x]}','${confirmed[x]}','2020-05-26'`;
        let sql = "INSERT INTO Country(id, name, mortality, recovery, confirmed, time) VALUES (" + entry + ")";
        await sqlite.run(sql);
        id++;
    }

    mortality = {"UK": 37542, "FRANCE": 28533, "USA": 100572};
    recovery = {"UK": 1162, "FRANCE": 65997, "USA": 479969};
    confirmed = {"UK": 268615, "FRANCE": 182847, "USA": 1725275};
    for(let x in mortality) {
        let entry = `'${id}','${x}','${mortality[x]}','${recovery[x]}','${confirmed[x]}','2020-05-27'`;
        let sql = "INSERT INTO Country(id, name, mortality, recovery, confirmed, time) VALUES (" + entry + ")";
        await sqlite.run(sql);
        id++;
    }

    mortality = {"UK": 37542, "FRANCE": 28599, "USA": 102107};
    recovery = {"UK": 1166, "FRANCE": 66702, "USA": 490130};
    confirmed = {"UK": 268620, "FRANCE": 183038, "USA": 1745803};
    for(let x in mortality) {
        let entry = `'${id}','${x}','${mortality[x]}','${recovery[x]}','${confirmed[x]}','2020-05-28'`;
        let sql = "INSERT INTO Country(id, name, mortality, recovery, confirmed, time) VALUES (" + entry + ")";
        await sqlite.run(sql);
        id++;
    }

    mortality = {"UK": 37919, "FRANCE": 28665, "USA": 103330};
    recovery = {"UK": 1171, "FRANCE": 67309, "USA": 510713};
    confirmed = {"UK": 270511, "FRANCE": 186364, "USA": 1768461};
    for(let x in mortality) {
        let entry = `'${id}','${x}','${mortality[x]}','${recovery[x]}','${confirmed[x]}','2020-05-29'`;
        let sql = "INSERT INTO Country(id, name, mortality, recovery, confirmed, time) VALUES (" + entry + ")";
        await sqlite.run(sql);
        id++;
    }

    mortality = {"UK": 38243, "FRANCE": 28717, "USA": 104542};
    recovery = {"UK": 1173, "FRANCE": 67921, "USA": 519569};
    confirmed = {"UK": 272615, "FRANCE": 186924, "USA": 1793530};
    for(let x in mortality) {
        let entry = `'${id}','${x}','${mortality[x]}','${recovery[x]}','${confirmed[x]}','2020-05-30'`;
        let sql = "INSERT INTO Country(id, name, mortality, recovery, confirmed, time) VALUES (" + entry + ")";
        await sqlite.run(sql);
        id++;
    }
    await sqlite.close();

}

async function insertUser(username, email, password) {
    await sqlite.open('./test.db');
    let sql = 'SELECT count(1) AS c FROM User';
    let r = await sqlite.get(sql);
    let id = r.c + 1;
    let insert = `'${id}','${username}','${email}','${password}'`;
    sql = 'INSERT INTO User(id, username, email, password) VALUES ('+ insert + ')'
    await sqlite.run(sql);
    await sqlite.close();
}

async function searchUser(email, password) {
    await sqlite.open('./test.db');
    let sql = 'SELECT * FROM User';
    let result = await sqlite.all(sql, [])
    for (const r of result) {
        if (r.email == email && r.password == password) {
            await sqlite.close();
            return r.username;
        }
    }
    await sqlite.close();
    return 'null';
}

async function searchCountry(countryName, selectdata) {
    await sqlite.open('./test.db');
    let sql = "SELECT * FROM Country WHERE name="+`'${countryName}'`+" AND time="+`'${selectdata}'`;
    let r = await sqlite.get(sql);
    let data = {};
    data["mortality"] = r.mortality;
    data["recovery"] = r.recovery;
    data["confirmed"] = r.confirmed;
    return data;
}

try {
    fs.unlinkSync("./test.db")
}
catch(e) {
}

module.exports.createData = createData;
module.exports.insertUser = insertUser;
module.exports.searchUser = searchUser;
module.exports.searchCountry = searchCountry;