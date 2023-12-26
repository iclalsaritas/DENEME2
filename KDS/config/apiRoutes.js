const router = require('express').Router();

// api routes
const loginRoutes = require('../routes/api/login');
const threatRoutes = require('../routes/api/threats');
const policyRoutes = require('../routes/api/policies');
const vm1Routes = require('../routes/api/vm1');
const vm1PatchRoutes = require('../routes/api/vm1-patch');
const vm1Recom = require('../routes/api/vm1-recommendation');
const vm2Routes = require('../routes/api/vm2');
const vm2PoliciesRoutes = require('../routes/api/vm2-policies');

router.use(loginRoutes);
router.use(threatRoutes);
router.use(policyRoutes);
router.use(vm1Routes);
router.use(vm1PatchRoutes);
router.use(vm1Recom);
router.use(vm2Routes);
router.use(vm2PoliciesRoutes);

module.exports = router;