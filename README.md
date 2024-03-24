# acme_talent_agency

# Block 35: Join Tables Part 2

## Overview

In Block 35, we delve deeper into the complexities of join tables, focusing on unique constraints and the secure handling of sensitive information. This session is designed to further our understanding of backend fundamentals in a Node.js environment, specifically around designing schemas with unique constraints, building a data layer, creating RESTFUL APIs, and hashing sensitive information.

## Learning Objectives

1. Design schemas for join tables with unique constraints.
2. Build a data layer that supports business logic.
3. Create a RESTFUL API utilizing the data layer.
4. Hash sensitive information in the database to enhance security.

## Discussion Prompt

Join tables, often containing two or more foreign keys, present unique opportunities and challenges in database design. Consider scenarios where constraining these keys to unique combinations is beneficial, such as preventing a student from joining the same club multiple times. Additionally, discuss the widespread issue of password reuse across different sites and the potential security implications.

## Lesson Overview

The Acme Talent Agency seeks an application to manage its users effectively. Our task is to develop a data layer and a corresponding RESTFUL API that can handle user and skill management securely, incorporating password hashing and unique constraints in join tables.

## Project Setup

1. **Initialize the Project**:
   - Create the project directory: `mkdir acme_talent_agency && cd acme_talent_agency`.
   - Initialize a new npm project: `npm init -y`.
   - Initialize a Git repository: `git init`.
   - Install required packages: `npm i pg bcrypt`.
   - Add development dependency for nodemon: `npm i nodemon -D`.
   - Create a `.gitignore` file to exclude `node_modules` and `.env`.
   - Set up the server folder structure and add `index.js` and `db.js` files.

2. **Create Tables**:
   - Implement `createTables` in `db.js` to define users, skills, and user_skills tables with appropriate relationships and unique constraints.

3. **Seed Initial Data**:
   - Develop `createUser` and `createSkill` functions to seed the database with initial user and skill records.

4. **Fetching Data**:
   - Implement `fetchUsers` and `fetchSkills` to retrieve records from the database.

5. **Password Hashing**:
   - Integrate bcrypt to hash user passwords securely when creating new users.

6. **Managing User Skills**:
   - Create functions for adding (`createUserSkill`) and removing (`destroyUserSkill`) skills associated with users, ensuring unique combinations of user and skill relationships.

7. **Building the API**:
   - Set up Express routes to manage users, skills, and user_skills, including creating and deleting user_skills.

8. **Securely Handling Sensitive Information**:
   - Ensure that passwords are hashed and sensitive information is not exposed through API responses.

## Implementation Hints

- Utilize UUIDs for primary keys to ensure uniqueness.
- Use the `UNIQUE` constraint to enforce unique combinations of foreign keys in the user_skills table.
- Hash passwords using bcrypt before storing them in the database.
- Selectively query data to avoid exposing sensitive information like hashed passwords.
- Test API functionality with tools such as curl or Postman to ensure expected behavior.

## Evaluation Criteria

The successful completion of this workshop will be evaluated based on the ability to design and implement a secure, functional backend system that adheres to the specified requirements, including unique constraints on join tables and secure handling of passwords.

## Next Steps

After mastering join tables and secure data handling, consider exploring additional security measures, such as JWT authentication, to further protect access to your API.
