const express = require('express');
const router = express.Router();
const { Pool } = require('pg'); 
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: 'postgres',       
  host: 'localhost',       
  database: 'postgres',  
  password: '123', 
  port: 5432, 
  searchPath: ['public'],            
});


module.exports = pool;