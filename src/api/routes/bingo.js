const { Router } = require( 'express' );
const API = require( '../api' );
const router = new Router();

router.post( '/', API.requestPlay );

module.exports = router;