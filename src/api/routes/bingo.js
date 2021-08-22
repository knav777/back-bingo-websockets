const { Router } = require( 'express' );
const API = require( '../api' );
const router = new Router();

router.post( '/', API.requestPlay );
router.get( '/', API.requestPlay );

module.exports = router;