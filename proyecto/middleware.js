
module.exports = function middleware(req, res, next) {
   
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next(); 
};