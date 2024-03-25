// server/db.js

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_talent_agency_db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

// Create Tables
const createTables = async () => {
    const SQL = `
    DROP TABLE IF EXISTS User_Skills;
    DROP TABLE IF EXISTS Users;
    DROP TABLE IF EXISTS Skills;
    CREATE TABLE Users(
        id UUID PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    CREATE TABLE Skills(
        id UUID PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
    );
    CREATE TABLE User_Skills(
        id UUID PRIMARY KEY,
        "userId" UUID REFERENCES Users(id) NOT NULL,
        "skillId" UUID REFERENCES Skills(id) NOT NULL,
        CONSTRAINT unique_user_id_skill_id UNIQUE("user_id", "skill_id")
    );
    `;
    await client.query(SQL);



};


// Create User
const createUser = async ({ username, password }) => {
    const SQL = 'INSERT INTO Users(id, username, password) values($1, $2, $3) returning *';
    const response = await client.query(SQL, [uuid(), username, await bcrypt.hash(password, 5)]);
    return response.rows[0];
} 
// Create Skill
const createSkill = async ({ name }) => {
    const SQL = 'INSERT INTO Skills(id, name) values($1, $2) returning *';
    const response = await client.query(SQL, [uuid.v4(), name]);
    return response.rows[0];
}
// Create UserSkill
const createUserSkill = async ({ userId, skillId }) => {
    const SQL = 'INSERT INTO User_Skills(id, "user_id", "skill_id") values($1, $2, $3) returning *';
    const response = await client.query(SQL, [uuid.v4(), user_id, skill_id]);
    return response.rows[0];
}


// Fetch Users
const fetchUsers = async () => {
    const SQL = 'SELECT id, username FROM Users';
    const response = await client.query(SQL);
    return response.rows;
}


// Fetch Skills
const fetchSkills = async () => {
    const SQL = 'SELECT * FROM Skills';
    const response = await client.query(SQL);
    return response.rows;
}

// Fetch UserSkills
const fetchUserSkills = async (user_id) => {
    const SQL = 'SELECT * FROM User_Skills WHERE "user_id" = $1';
    const response = await client.query(SQL, [user_id]);
    return response.rows;
}

// Delete UserSkills
const deleteUserSkill = async ({ user_id, id }) => {
    const SQL = 'DELETE FROM User_Skills WHERE user_id = $1 AND id = $2';
    await client.query(SQL, [user_id, id]);
}


module.exports = {
    client,
    createTables,
    createUser,
    createSkill,
    fetchUsers,
    fetchSkills,
    createUserSkill,
    fetchUserSkills,
    destroyUserSkill
};